<template>
    <section class="book-app">
        <nav-bar></nav-bar>
        <book-list></book-list>

    </section>
</template>

<script>
    import navBar from '../components/nav/nav';
    import bookList from '../components/book-list';

    export default {
        name: "book-app",
        methods: {},
        components: {
            navBar,
            bookList

        }

    }
</script>

<style scoped>

</style>
