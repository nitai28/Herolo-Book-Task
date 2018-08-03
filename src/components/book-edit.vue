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
                    <form action="" @submit.prevent="validateBeforeSubmit">
                        <label for="Title">Title</label>
                        <input class="input" id="Title" name="Title" type="text" v-validate.immediate="'required'"
                               v-model="bookEdit.bookTitle" placeholder="Book Title">
                        <p class="error-message">{{ errors.first('Title') }}</p>

                        <div>
                            <date-picker lang="en" v-model="bookEdit.publishedDate" input-name="date"
                                         format="YYYY-MM-DD" :not-after="new Date()"></date-picker>
                        </div>
                        <label for="Author">Author</label>
                        <input class="input" id="Author" name="Author" type="text" v-model="bookEdit.authorName"
                               v-validate.immediate="'required'" placeholder="Book Author Name">
                        <p v-show="errors.first('Title')" class="error-message">{{ errors.first('Author') }}</p>


                        <label for="Book Cover">Book Cover Image</label>
                        <input class="input" id="Book Cover" type="text" v-model="bookEdit.imgSrc">

                        <label for="Desctiption">Desctiption</label>
                        <textarea class="textarea" id="Desctiption" type="text"
                                  v-model="bookEdit.description" placeholder="Book Description"></textarea>
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
    import {Validator} from 'vee-validate';

    export default {
        props: ['book', 'isActive', 'addMode'],
        created() {

        },
        data() {
            return {
                bookEdit: (this.book) ? {...this.book} : bookService.getEmptyObj(),
                title: '',

            }
        },
        methods: {

            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$store.dispatch({type: 'saveBook', book: this.bookEdit})
                            .then(() => {
                                this.closeModal();
                                this.$emit('closeEditModal')
                            })
                        return;
                    }
                    this.$swal('Oops...', 'Please fill all the missing fields !', 'error')

                })
            },

            closeModal() {
                this.$parent.showModal = false;
                if (this.addMode) {
                    this.$parent.toAdd = false
                }
            }

        },

        components:
            {
                DatePicker,
                bookService,
                UploadImage,
                Validator
            }
        ,

    }

</script>
<style scoped>
    .input {
        text-align: left;
    }

    .textarea {
        text-align: left;

    }

    .error-message {
        color: red;
        margin-top: -5px;
        font-size: 12px;
        margin-bottom: 9px;
    }

    .modal-background {
        position: fixed;
    }

</style>