<template>
    <div>
        待办事项

        <div>
            <input type="text" v-model="title">
            <button @click="add">submit</button>
        </div>
        <div>
            <ul>
                <li v-for="(item, index) in list" :key="index">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'todo-list',
    data() {
        return {
            title: '',
            list: []
        };
    },
    methods: {
        add: function() {
            this.list.push(this.title);
            this.title = '';
        }
    }
};
</script>

<style scoped lang="scss">

</style>
