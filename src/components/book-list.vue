<template>
    <section class="todo-list">
        <div v-if="!selectedBook">
            <h1>Herolo Books</h1>
            <button  @click="toAdd=!toAdd">Add Book</button>
            <book-edit :addMode="toAdd" v-if="toAdd"></book-edit>
            <ul>
                <li v-for="(book,idx) in books" :key="book.id">
                    <img :src="book.imgSrc" alt="" @click="updateCurrentBook(book.id)">
                </li>
            </ul>

        </div>
        <book-details v-if="selectedBook" :book="currentBook" @toggleSelectedBook="selectedBook=!selectedBook"></book-details>
    </section>


</template>

<script>
    import bookDetails from './book-details.vue'
    import bookEdit from './book-edit.vue'


    export default {
        name: 'book-list',
        data() {
            return {
                selectedBook: false,
                currentBook: {},
                toAdd:false,
            }
        },
        methods: {
            updateCurrentBook(id) {
                this.$store.commit({type: 'setSelectedBook', id: id});
                this.currentBook = this.$store.state.currentBook;
                this.selectedBook = !this.selectedBook;
                // this.$router.push('/'+this.currentBook.id)
            },


        },
        created() {
            this.$store.dispatch({type: 'loadBooks'});

        },
        computed: {
            books() {
                return this.$store.getters.booksForDisplay;
            }
        },

        components: {
            bookDetails,
            bookEdit
        }
    }
</script>

<style>

</style>



