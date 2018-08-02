<template>
    <section class="book-edit">
        <div :class="{'is-active':isActive,'modal':isActive} ">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p v-if="!addMode" class="modal-card-title">Book Edit</p>
                    <p v-else class="modal-card-title">Add Book</p>
                    <button class="delete" aria-label="close" @click="closeModal()"></button>
                </header>
                <section class="modal-card-body">
                    <form action="" @submit.prevent="editBook">
                        <label for="Title">Title</label>
                        <input class="input" id="Title" type="text" v-model="bookEdit.bookTitle">
                        <div>
                            <date-picker lang="en" v-model="bookEdit.publishedDate"></date-picker>
                        </div>
                        <label for="Author">Author</label>
                        <input class="input" id="Author" type="text" v-model="bookEdit.authorName">
                        <!--<upload-image v-if="addMode" url="" name="" max_files="" v-model="bookEdit.imgSrc"></upload-image>-->
                        <label for="Desctiption">Desctiption</label>
                        <textarea class="textarea" id="Desctiption" type="text"
                                  v-model="bookEdit.description"></textarea>
                        <footer class="modal-card-foot">
                            <button v-if="!addMode" type="submit" class="button is-success">Save</button>
                            <button v-else type="submit" class="button is-success">Add book</button>
                            <button type="button" class="button" @click="closeModal()">Cancel</button>
                        </footer>
                    </form>
                </section>
            </div>
        </div>
    </section>


</template>


<script>
    import bookService from '../services/book.service.js'
    import DatePicker from 'vue2-datepicker'
    import UploadImage from './image-upload';

    export default {

        props: ['book', 'isActive', 'addMode'],
        created() {

        },
        data() {
            return {
                bookEdit: (this.book) ? {...this.book} : bookService.getEmptyObj(),
            }
        },
        methods: {

            editBook() {
                this.$store.dispatch({type: 'saveBook', book: this.bookEdit})
                    .then(() => {
                        this.closeModal();
                        this.$router.push('/books')
                    })
            },

            closeModal() {
                this.$parent.showModal = false;
                if (this.addMode) {
                    this.$parent.toAdd = false
                }
            }

        },

        components: {
            DatePicker,
            bookService,
            UploadImage
        },

    }

</script>
<style scoped>
    /*.modal {*/
    /*background-color: rgba(0, 0, 0, 0.65);*/
    /*width: 100vw;*/
    /*height: 100vh;*/
    /*z-index: 1;*/
    /*position: absolute;*/
    /*}*/
</style>