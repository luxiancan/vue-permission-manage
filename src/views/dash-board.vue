<template>
    <div>
        dash-board

        <div>随便搞一个图表组件</div>
        <pieChart style="width: 70%;height: 400px;"></pieChart>
    </div>
</template>

<script>
import pieChart from '@/components/echarts/pie-chart.vue';
export default {
    name: 'dash-board',
    components: {
        pieChart
    },
    mounted() {
        let arr = [1, 2, 3, 2, 3];
        let dupArr = [...new Set(arr)];
        console.log(dupArr);
    }
};
</script>

<style scoped lang="scss">

</style>
