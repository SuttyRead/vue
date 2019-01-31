<template>
    <div>
        <div class="col-md-2">
            <form action="/login" method="post">
                <div class="form-group">
                    <label for="exampleInputLogin">Login</label>
                    <input type="text" class="form-control" id="exampleInputLogin" aria-describedby="emailHelp"
                           placeholder="Enter login" name="login" v-model="login" required>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"
                           placeholder="Enter password" v-model="password"
                           name="password" required>
                </div>
                <button type="submit" class="btn btn-primary" @click="logIn">Submit</button>
            </form>
            {{this.login}}
            {{this.password}}
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                login: '',
                password: ''
            }
        },
        methods: {
            logIn(e) {
                e.preventDefault();
                axios.post('http://10.10.103.100:8050/login', {
                    username: this.login,
                    password: this.password
                }).then(e => {
                    let data = e.data;
                    let strings = data.toString().split('.');
                    let s = atob(strings[1]);
                    let payload = JSON.parse(s);
                    sessionStorage.setItem('username', payload.username);
                    sessionStorage.setItem('role', payload.role);
                    sessionStorage.setItem('token', data);
                }).then(() => {
                    this.$router.push({
                        name: 'admin',
                        params: {username: sessionStorage.getItem('username'), role: sessionStorage.getItem('role')}
                    });
                }).catch(errors => this.errors = errors);

            }
        }
    }
</script>

<style scoped>

</style>