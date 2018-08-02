<template>
    <section class="book-details">
        <div class="image-content">
            <img class="img-book" :src="book.imgSrc" alt="">
        </div>
        <div class="details">
            <h1>{{book.bookTitle|bookTitleToUpperCase|removeNonEnglishLetters}}</h1>
            <h3><span>Author:</span>{{book.authorName}}</h3>
            <p>{{book.description}}</p>
            <h3><span>Published At:</span>{{book.publishedDate}}</h3>
            <div>
                <div class="buttons-content">
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

    .image-content {
        width: 100%;
        min-width: 50%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .img-book {
        max-height: 60%;
        width: 45%;
    }

    .book-details {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100%;
    }

    .book-details p {

        margin: 30px auto 20px;
        font-size: 20px;
        max-width: 70%;
    }

    .details {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        margin-right: 70px;
    }

    h1 {
        font-weight: bold;
        font-size: larger;
    }

    .buttons-content {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 50px;
    }

    button {
        width: 70%;
        margin: 5px;
        font-size: 28px;
        padding: 15px;
        line-height: normal;
        height: 70px;

    }

    @media (max-width: 980px ) {
        .book-details {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            width: 100%;

        }

        .image-content {
            width: 100%;
            height: 80%;
            margin: 20px 0 20px;
        }

        .details {
            width: 100%;
            margin: 0 auto;
        }

        h1 {
            font-size: 30px;
        }

        h3 {
            font-size: 26px;
            width: 100%;
        }

        .buttons-content {
            width: 100%;
            display: flex;
            justify-content: space-around;
        }

        button {
            width: 45%;
            margin: 5px;
        }

        button:last-child {
            margin-bottom: 20px;
        }
        .img-book {
            max-height: 60%;
            width: 50%;
        }

    }


</style>



