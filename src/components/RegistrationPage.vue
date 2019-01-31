<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <h2 class="text-center">Registration</h2>
                    <form @change="OnChangeEdit">
                        <div class="form-group">
                            <label for="login">Username:</label>
                            <input type="text" placeholder="Enter login" name="login" class="form-control" id="login"
                                   v-model="user.username"
                                   pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$" required/>
                        </div>

                        <div v-if="errors.username && user.username !== ''" class="alert alert-danger" role="alert">
                            Uppercase and lowercase letter.
                            Must be 2-20 characters. Without specifically characters #,$,% and so on. For example
                            SuttyRead
                        </div>

                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" placeholder="Enter password" name="password"
                                   pattern="^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
                                   v-model="user.password"
                                   class="form-control" id="password" required/>
                        </div>

                        <div v-if="errors.password && user.password !== ''" class="alert alert-danger" role="alert">
                            Password must be have
                            lowercase and uppercase Latin letters, number. Minimum 8 characters
                        </div>

                        <div class="form-group">
                            <label for="confirmPassword">Confirm password:</label>
                            <input type="password" placeholder="Enter confirm password" name="confirmPassword"
                                   pattern="^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
                                   v-model="user.confirmPassword"
                                   class="form-control" id="confirmPassword" required/>
                        </div>

                        <div v-if="errors.confirmPassword && user.confirmPassword !== ''" class="alert alert-danger"
                             role="alert">
                            Password must be have
                            lowercase and uppercase Latin letters, number. Minimum 8 characters
                        </div>

                        <div class="form-group">
                            <label for="email">Email address:</label>
                            <input type="email" placeholder="Enter Email" name="email" class="form-control"
                                   v-model="user.email"
                                   pattern="\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,4}"
                                   id="email" required/>
                        </div>

                        <div v-if="errors.email && user.email !== ''" class="alert alert-danger" role="alert">
                            Enter correct email. Email
                            must be have @. For example SuttyRead@gmail.com
                        </div>

                        <div class="form-group">
                            <label for="firstName">First Name:</label>
                            <input type="text" placeholder="Enter First Name" name="firstName"
                                   v-model="user.firstName"
                                   pattern="^[A-Z]{1}[a-z]{1,25}"
                                   class="form-control"
                                   id="firstName" required/>
                        </div>

                        <div v-if="errors.firstName && user.firstName !== ''" class="alert alert-danger" role="alert">
                            Only latin letter.
                            First letter must be uppercase. For example Sutty
                        </div>

                        <div class="form-group">
                            <label for="lastName">Last Name:</label>
                            <input type="text" placeholder="Enter Last name" name="lastName"
                                   class="form-control"
                                   v-model="user.lastName"
                                   pattern="^[A-Z]{1}[a-z]{1,25}"
                                   id="lastName" required/>
                        </div>

                        <div v-if="errors.lastName && user.lastName !== ''" class="alert alert-danger" role="alert">
                            Only latin letter.
                            Last letter must be uppercase. For example Sutty
                        </div>

                        <div class="form-group">
                            <label for="birthday">Birthday:</label>
                            <input type="date" placeholder="Enter birthday" name="birthday"
                                   class="form-control"
                                   v-model="user.birthday"
                                   id="birthday" required/>
                        </div>

                        <div v-if="errors.birthday && user.birthday !== ''" class="alert alert-danger" role="alert">
                            Incorrect birthday
                        </div>

                        <button class="btn btn-success" @click.prevent="add">Save</button>
                        <router-link role="button" class="btn btn-success" to="/">Cancel</router-link>
                    </form>
                    {{user}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import {
        dateValidator,
        emailValidator,
        loginValidator,
        nameValidator,
        passwordMatchValidator,
        passwordValidator
    } from "../utils/validator";

    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    birthday: ''
                },
                errors: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    birthday: ''
                }
            }
        },

        methods: {
            add() {
                axios.post('http://10.10.103.100:8050/registration', this.user, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                ).then(response => {
                    this.user = response.data
                });
                this.$router.push('/admin');
            },
            OnChangeEdit() {

                if (!dateValidator(this.user.birthday)) {
                    this.errors.birthday = 'Incorrect birthday'
                } else {
                    this.errors.birthday = '';
                }
                if (!nameValidator(this.user.firstName)) {
                    this.errors.firstName = 'Enter correct first name'
                } else {
                    this.errors.firstName = '';
                }
                if (!nameValidator(this.user.lastName)) {
                    this.errors.lastName = 'Enter correct last name'
                } else {
                    this.errors.lastName = '';
                }
                if (!passwordValidator(this.user.password)) {
                    this.errors.password = 'Enter correct password'
                } else {
                    this.errors.password = '';
                }
                if (!passwordValidator(this.user.confirmPassword)) {
                    this.errors.confirmPassword = 'Enter correct confirm password'
                } else {
                    this.errors.confirmPassword = '';
                }
                if (!emailValidator(this.user.email)) {
                    this.errors.email = 'Enter correct email'
                } else {
                    this.errors.email = '';
                }
                if (!loginValidator(this.user.username)) {
                    this.errors.username = 'Enter correct username'
                } else {
                    this.errors.username = '';
                }
                if (!passwordMatchValidator(this.user.password, this.user.confirmPassword)) {
                    this.errors.confirmPassword = 'Passwords should match'
                } else {
                    this.errors.username = '';
                }
            }

        }
    }
</script>

<style scoped>

</style>