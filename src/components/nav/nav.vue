<template>
    <section>
        <nav class="navbar-content ">
            <div class="nav-logo" @click="linkToHomePage">
               <span>Herolo </span>
                <img src="../../../public/img/booklogo.png" alt="">
            </div>

        </nav>
    </section>
</template>

<script>
    export default {
        name: "navbar",
        methods:{
            linkToHomePage(){
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .navbar-content {
        display: flex;
        /*justify-content: center;*/
        background-color: #28282e;
        color: white;
        height: 100px;

    }
    .nav-logo{
        margin-left: 20px;
    }

    img{
        max-width: 100px;
        position: static;
        margin-top: 5px;
    }
    span{
        margin-left: 15px;
        font-size: 88px;
        float: right;
        line-height: 102px;
        margin-right: 8px;
    }


</style>