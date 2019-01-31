<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h2 class="text-center">Edit User</h2>
                    <form>
                        <div class="form-group">
                            <label for="login">Login:</label>
                            <input type="text" placeholder="Enter login" name="login" class="form-control" id="login"
                                   v-model="user.username"
                                   pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$" readOnly required/>
                        </div>

                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" placeholder="Enter password" name="password"
                                   pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                                   v-model="user.password"
                                   class="form-control" id="password" required/>
                        </div>

                        <div class="form-group">
                            <label for="email">Email address:</label>
                            <input type="email" placeholder="Enter Email" name="email" class="form-control"
                                   v-model="user.email"
                                   pattern="\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,4}"
                                   id="email" required/>
                        </div>

                        <div class="form-group">
                            <label for="firstName">First Name:</label>
                            <input type="text" placeholder="Enter First Name" name="firstName"
                                   v-model="user.firstName"
                                   pattern="^[A-Z]{1}[a-z]{1,25}"
                                   class="form-control"
                                   id="firstName" required/>
                        </div>

                        <div class="form-group">
                            <label for="lastName">Last Name:</label>
                            <input type="text" placeholder="Enter Last name" name="lastName"
                                   class="form-control"
                                   v-model="user.lastName"
                                   pattern="^[A-Z]{1}[a-z]{1,25}"
                                   id="lastName" required/>
                        </div>

                        <div class="form-group">
                            <label for="birthday">Birthday:</label>
                            <input type="date" placeholder="Enter birthday" name="birthday"
                                   class="form-control"
                                   v-model="user.birthday"
                                   id="birthday" required/>
                        </div>

                        <div class='form-group'>
                            <label> Role:
                                <select class="form-control" v-model="user.role">
                                    <option value="ADMIN">Admin</option>
                                    <option value="USER">User</option>
                                </select>
                            </label>
                        </div>

                        <button class="btn btn-success" @click.prevent="edit">Save</button>
                        <router-link role="button" class="btn btn-success" to="/admin">Cancel</router-link>
                    </form>
                    {{user}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                user: '',
                id: ''
            }
        },
        mounted() {
            this.id = this.$route.params.id;
            this.user = this.getUserById()
        },
        methods: {
            edit() {
                axios.put(`http://10.10.103.100:8050/users/${this.id}`, this.user, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        }
                        ,
                    }
                ).then(response => {
                    this.user = response.data
                });
                this.$router.push('/admin');
            },
            getUserById() {
                axios.get(`http://10.10.103.100:8050/users/${this.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                }).then(response => {
                    this.user = response.data
                });
            }

        }
    }
</script>

<style scoped>

</style>