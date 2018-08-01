
<template>       
        <section class="todo-app box">
        <todo-edit></todo-edit>
        <todo-list></todo-list>
        </section>

</template>     
<script>
import todoEdit from '../components/book-edit.vue'
import todoList from '../components/todo-list.vue'

export default{
    components: {
    todoEdit,
    todoList
    }
}    
</script>
