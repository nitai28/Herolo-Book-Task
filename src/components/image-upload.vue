<template>
        <section class="todo-list">
            <input name="filterBtn" checked="checked" id="all" type="radio" @click="changeFilter('All')" />
            <label for="all"> All</label>
            <input name="filterBtn" id="active" @click="changeFilter('Active')" type="radio"/>
            <label for="active"> Active</label>
            <input name="filterBtn" id="done" @click="changeFilter('Done')" type="radio"/>
            <label for="done"> Done</label>
            <div>
            <input type="search" @input="SearchTodos($event.target.value)"/>
            </div>
            <ul>
                <li  v-for="(todo) in todos" :key="todo.id" class="box todo-li"  :class="{done:todo.isDone}">
                    <todo-item :currTodo="todo"></todo-item>
                </li>
            </ul>
        </section>


</template>

<script>
import todoItem from './todo-item.vue'

export default {
    data() {
        return {
            filter: 'All',
            todo: {}
        }
    },
    created() {
        this.$store.dispatch({ type: 'loadTodos' })
    },
    computed: {
        todos() {
            return this.$store.state.todos;
        }
    },
    methods: {
        changeFilter(filter) {
            this.$store.commit({ type: 'changeFilter', filter: filter });
            this.$store.dispatch({ type: 'loadTodos' })

            // this.$store.dispatch({type:'changeFilter' ,filter:filter});

        },
        SearchTodos(filter) {
            this.$store.commit({ type: 'changeFilter', filter: filter });
            this.$store.dispatch({ type: 'loadTodos' })
        }
    },
    
    components: {
        todoItem
    }
}    
</script>

<style>

</style>



