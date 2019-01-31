<template>
    <div>
        Hello, {{username}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: sessionStorage.getItem('username')
            }
        }
    }
</script>

<style scoped>

</style>