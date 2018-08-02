<template>
    <section class="card is-centered">
        <div class="card-image">
            <figure class="image ">
                <img :src="book.imgSrc" alt="">
            </figure>
        </div>
        <div class="book-details ">
            <div class="media-content">
                <h1 class="title is-4">{{book.bookTitle|bookTitleToUpperCase|removeNonEnglishLetters}}</h1>
                <h3 class="subtitle is-6">{{book.authorName}}</h3>

            </div>
            <div>
                <p>{{book.description}}</p>
                <h3><span>Published At:</span>{{book.publishedDate}}</h3>

            </div>
            <div>
                <div class="content">
                    <button class="button is-info" @click.stop="showModal=!showModal">Edit</button>
                    <button class="button is-danger" @click="alertDisplay">Delete</button>
                </div>
                <button class="button is-link" @click="closeDetailes()">Go Back</button>
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
            deleteCurrBook(id) {
                this.$store.dispatch({type: 'deletedBook', id})
            },
            alertDisplay() {
                this.$swal({
                    title: 'Are you sure?',
                    text: 'You can\'t revert your action',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes Delete it!',
                    cancelButtonText: 'No, Keep it!',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    if (result.value) {
                        this.deleteCurrBook(this.book.id)
                        this.$router.push('/')
                        this.$swal('Deleted', 'You successfully deleted this file', 'success')
                    } else {
                        this.$swal('Cancelled', 'Your file is still intact', 'info')
                    }
                })
            }


        },
        filters: {
            bookTitleToUpperCase(bookName) {
                return bookName.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }
            ,
            removeNonEnglishLetters(bookName) {
                return bookName.replace(/[^A-Za-z]/g, ' ');
            }
            ,

        }
        ,


        components: {
            bookEdit
        }
    }
</script>

<style scoped>


</style>



