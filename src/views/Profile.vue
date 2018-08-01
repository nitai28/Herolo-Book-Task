
<template>       
        <div>
            <ul>
                <h1>{{this.$store.state.user.userName}}</h1>
                <li v-for="action in actions" :key="action.at" >
                    {{action}}
                </li>

            </ul>
            <input @keyup.enter=changeName($event.target.value) type="text">
                
        </div>

</template>



<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    changeName(input) {
      this.$store.dispatch({ type: "changeUserName", name: input });
      document.querySelector('input').value = '';
    }
  },
  computed: {
    actions() {
      return this.$store.state.user.actions;
    }
  },
  components: {}
};
</script>
