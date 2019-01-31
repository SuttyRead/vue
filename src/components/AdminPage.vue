<template>
    <div>
        <router-link to="/add">Add User</router-link>
        <table className="table table-hover table-bordered">
            <thead>
            <tr>
                <th>Login</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="user in users" :key="user.id">
                <td>{{user.username}}</td>
                <td>{{user.firstName}}</td>
                <td>{{user.lastName}}</td>
                <td>{{user.birthday}}</td>
                <td>{{user.role}}</td>
                <td>
                    <button class="btn btn-primary" @click="editUser(user.id)">Edit</button>
                    <button class="btn btn-primary" @click="deleteUser(user.id)">Delete</button>

                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                users: this.getAll()
            }
        },
        methods: {
            getAll() {
                axios.get('http://10.10.103.100:8050/users', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                }).then(response => this.users = response.data);
            },
            editUser(id) {
                this.$router.push(`/edit/${id}`)
            },
            deleteUser(id) {
                axios.delete(`http://10.10.103.100:8050/users/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                });
            }
        }
    }
</script>

<style scoped>

</style>