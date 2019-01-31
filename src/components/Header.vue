<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <router-link class="navbar-brand" to="/">VueJS</router-link>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Main</router-link>
                    </li>

                    <li v-if="role === 'ADMIN'" class="nav-item">
                        <router-link class="nav-link" to="/admin">Home</router-link>
                    </li>

                    <li v-if="role === 'USER'" class="nav-item">
                        <router-link class="nav-link" to="/user">Home</router-link>
                    </li>

                    <li v-if="!username" class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li v-if="!username" class="nav-item">
                        <router-link class="nav-link" to="/registration">Registration</router-link>
                    </li>
                </ul>
                <div v-if="username">
                    {{this.username}},
                    <button class="btn btn-primary" @click="logout">Logout</button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: sessionStorage.getItem('username'),
                role: sessionStorage.getItem('role')
            }
        },
        methods: {
            logout() {
                sessionStorage.clear();
                this.username = '';
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>

</style>