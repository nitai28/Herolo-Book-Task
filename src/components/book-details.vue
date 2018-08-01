<template>
    <section class="todo-list flex">
        <div>
            <img :src="book.imgSrc" alt="">

        </div>
        <div class="book-details">
            <h1>{{book.bookTitle|bookTitleToUpperCase|removeNonEnglishLetters}}</h1>
            <h3>{{book.authorName}}</h3>
            <p>{{book.description}}</p>
            <h3><span>Published At:</span>{{book.publishedDate}}</h3>
            <div>
                <div>
                    <button @click.stop="showModal=!showModal">Edit</button>
                    <button @click="deleteCurrBook(book.id) ">Delete</button>
                </div>
                <button @click="closeDetailes()">Go Back</button>
            </div>
        </div>
        <book-edit :isActive="showModal" :book="book" v-if="showModal"></book-edit>

    </section>


</template>

<script>
    import bookEdit from './book-edit.vue'

    export default {
        props: {book: {type: Object, required: true}},
        data() {
            return {
                showModal: false
            }
        },

        methods: {
            closeDetailes() {
                this.$emit('toggleSelectedBook')
            },
            // deleteCurrBook(id) {
            //     this.$store.dispatch({type: 'deleteBook', id})
            // },


        },
        filters: {
            bookTitleToUpperCase(bookName) {
                return bookName.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            },
            removeNonEnglishLetters(bookName) {
                return bookName.replace(/[^A-Za-z]/g, ' ');
            },

        },

        components: {
            bookEdit
        }
    }
</script>

<style>

</style>



