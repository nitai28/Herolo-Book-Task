<template>
    <section class="todo-list">
        <div v-if="!selectedBook">
            <button class="button is-dark" @click="toAdd=!toAdd">Add Book</button>
            <book-edit :addMode="toAdd" v-if="toAdd"></book-edit>
            <ul class="book-container">
                <li v-for="(book,idx) in books" :key="book.id">
                    <div class="box book-box" @click="updateCurrentBook(book.id)">
                        <img class="book-img" :src="book.imgSrc" alt="">
                        <h2>{{book.bookTitle}}</h2>
                        <h5>By:{{book.authorName}}</h5>

                    </div>
                </li>
            </ul>

        </div>
        <book-details v-if="selectedBook" :book="currentBook"
                      @toggleSelectedBook="selectedBook=!selectedBook"></book-details>
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
                toAdd: false,
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

<style scoped>
    .book-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .box {
        background-color: rgb(35, 31, 31);
        color: white;
        box-shadow: 0px 2px 2px 2px #fff;
        margin: 50px 5px;
    }

    h2 {
        font-weight: bold;
        font-size: larger;
        letter-spacing: 1.3px;
    }

    .book-img {
        /*width: 300px;*/
        height: 400px;
        max-height: 100%;
        /*margin-top: 50px;*/
    }

    .button {

        margin-top: 52px;
        width: 137px;
        height: 54px;
        font-size: 25px;
    }


</style>



