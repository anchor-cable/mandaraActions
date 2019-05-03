 <template>
  <div id="editor">
    <h1>エディター画面</h1>
    <h2>{{user.displayName}}</h2>
    <button @click="googleLogout">Googleアカウントからログアウト</button>
  </div>
</template>

<script>
export default {
  name: "editor",
  props: ["user"],
  data() {
    return {};
  },
  methods: {
    googleLogout: function() {
      firebase.auth().signOut();
    }
  }
};
</script>
