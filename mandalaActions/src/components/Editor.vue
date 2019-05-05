<template>
  <div id="editor">
    <h1>エディター画面</h1>
    <h2>{{ user.displayName }}</h2>
    <button @click="googleLogout">Googleアカウントからログアウト</button>
    <div class="editorWrapper">
      <div class="memoListWrapper">
        <div
          class="memoList"
          v-for="(memo, index) in memos"
          :key="index"
          @click="selectMemo(index)"
          :data-selected="index == selectedIndex"
        >
          <p class="memoTitle">{{ displayTitle(memo.inputbox) }}</p>
        </div>
        <div>
          <button class="addMemoBtn Btn" @click="addMemo">メモの追加</button>
          <button class="deleteMemoBtn Btn" v-if="memos.length >1" @click="deleteMemo">選択中メモの削除</button>
          <button class="saveMemoBtn Btn" @click="saveMemos">メモの保存</button>
        </div>
      </div>
      <textarea class="inputbox" v-model="memos[selectedIndex].inputbox"></textarea>
      <div class="preview" v-html="preview()"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "editor",
  props: ["user"],
  data() {
    return {
      memos: [
        {
          inputbox: ""
        }
      ],
      selectedIndex: 0
    };
  },
  created: function() {
    firebase
      .database()
      .ref("memos/" + this.user.uid)
      .once("value")
      .then(result => {
        if (result.val()) {
          this.memos = result.val();
        }
      });
  },
  mounted: function() {
    document.onkeydown = e => {
      if ((e.key == "s" && e.metaKey) || e.ctrlKey) {
        this.saveMemos();
        return false;
      }
    };
  },
  beforedestory: function() {
    document.onkeydown = null;
  },
  methods: {
    googleLogout: function() {
      firebase.auth().signOut();
    },
    addMemo: function() {
      this.memos.push({
        inputbox: "無題のメモ"
      });
    },
    deleteMemo: function() {
      this.memos.splice(this.selectedIndex, 1);
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    },
    saveMemos: function() {
      firebase
        .database()
        .ref("memos/" + this.user.uid)
        .set(this.memos);
    },
    selectMemo: function(index) {
      this.selectedIndex = index;
    },
    preview: function() {
      return this.memos[this.selectedIndex].inputbox;
    },
    displayTitle: function(text) {
      return text.split(/\n/)[0];
    }
  }
};
</script>
<style lang="scss" scoped>
.editorWrapper {
  display: flex;
}
.memoListWrapper {
  width: 20%;
  border-top: 1px solid #000;
}
.memoList {
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  border-bottom: 1px solid #000;
  &:ntn-chilid(even) {
    background-color: #ccc;
  }
  &[data-selected="true"] {
    background-color: #ccf;
  }
}
.Btn {
  margin: 10px;
}
.inputbox {
  width: 50%;
  height: 500px;
}
.preview {
  width: 50%;
  text-align: left;
}
</style>
