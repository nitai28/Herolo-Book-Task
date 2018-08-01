<template>
    <section class="todo-list">

        {{book.id}}
        <img :src="book.imgSrc" alt="">
    </section>


</template>

<script>

    export default {
        props: {book:{type: Object, required: true}},
        data() {
            return {
                // filter: 'All',
                // book: {}
            }
        },

        methods: {

        },

        components: {
        }
    }
</script>

<style>

</style>



