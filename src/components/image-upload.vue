<template>
    <section id="image-up">
        <div v-if="!image">
            <h3>Book Cover</h3>
            <input type="file" @change="onFileChange">
        </div>
        <div v-else>
            <img :src="image"/>
            <button @click="removeImage">Remove image</button>
        </div>
    </section>


</template>

<script>

    export default {
        data: {
            image: ''
        },
        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;

                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage: function (e) {
                this.image = '';
            }
        }
    }
</script>

<style scoped>
    #image-up {
        text-align: center;
    }
    img {
        width: 30%;
        margin: auto;
        display: block;
        margin-bottom: 10px;
    }
</style>



