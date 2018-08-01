<template>
      <section>
            <input class="field" :id="currTodo.id" type="checkbox"  @change="toggleIsDone(currTodo.id)" :checked="currTodo.isDone">
            <label v-if="!editable" @contextmenu.prevent="editable=!editable" :for="currTodo.id">{{currTodo.text}}</label>
            <todo-edit :currTodo="currTodo" v-else></todo-edit>
            <button class="button is-dark " @click="removeTodo(currTodo.id)"><i class="far fa-trash-alt"></i></button>
        </section>
</template>


<script>

import todoEdit from './book-edit.vue';

export default {
    props: ['currTodo'],
    data() {
        return {
            editable: false,
            
        }
    },

    methods: {

        toggleIsDone(id) {
            this.$store.commit({ type: 'toggleIsDone', id: id })
        },
        removeTodo(id){
            this.$store.dispatch({ type: 'deleteTodo', id: id });
        },
    },
    components:{
        todoEdit    
        }



}
</script>
