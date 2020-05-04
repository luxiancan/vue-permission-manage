<template>
    <div>
        sys-log

        <div>随便搞一个图表组件，搞点其他颜色</div>
        <pieChart style="width: 70%;height: 400px;" :chartConfig="pieChartCfg"></pieChart>
    </div>
</template>

<script>
import pieChart from '@/components/echarts/pie-chart.vue';
export default {
    name: 'sys-log',
    components: {
        pieChart
    },
    data: () => ({
        pieChartCfg: {
            colors: ['#f00', 'pink', 'blue', 'green', 'brown'],
        }
    }),
};
</script>

<style scoped lang="scss">

</style>
