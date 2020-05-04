<template>
    <div class="chart-container" :id="chartId"></div>
</template>

<script>
import echarts from 'echarts';

let chartIdSeed = 1;
export default {
    name: 'pie-chart',
    props: {
        chartData: {
            type: Array,
            default: () => []
        },
        chartConfig: {
            type: Object,
            default: () => {}
        },
    },
    data: () => ({
        defaultConfig: {
            colors: ['#1890ff', '#13c2c2', '#ffc53d', '#73d13d', '#f0657d'],
        },
        finalConfig: {},
        chartId: 1,
        myChart: null,
        option: {},
        timer: null,
    }),
    mounted() {
        this.chartId = 'pie-chart_' + chartIdSeed++;
        this.finalConfig = Object.assign({}, this.defaultConfig, this.chartConfig);
        this.addResizeEvent();
        this.initOption();
        this.$nextTick(() => {
            this.ready();
        });
    },
    methods: {
        initOption() {
            const ROOT_PATH = 'https://www.echartsjs.com/examples/';
            let weatherIcons = {
                'Sunny': ROOT_PATH + 'data/asset/img/weather/sunny_128.png',
                'Cloudy': ROOT_PATH + 'data/asset/img/weather/cloudy_128.png',
                'Showers': ROOT_PATH + 'data/asset/img/weather/showers_128.png'
            };
            let cfg = this.finalConfig;
            this.option = {
                title: {
                    text: '天气情况统计',
                    subtext: '虚构数据',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    // orient: 'vertical',
                    // top: 'middle',
                    bottom: 10,
                    left: 'center',
                    data: ['西凉', '益州', '兖州', '荆州', '幽州']
                },
                color: cfg.colors,
                series: [
                    {
                        type: 'pie',
                        radius: '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: [
                            {
                                value: 1548,
                                name: '幽州',
                                label: {
                                    formatter: [
                                        '{title|{b}}{abg|}',
                                        '  {weatherHead|天气}{valueHead|天数}{rateHead|占比}',
                                        '{hr|}',
                                        '  {Sunny|}{value|202}{rate|55.3%}',
                                        '  {Cloudy|}{value|142}{rate|38.9%}',
                                        '  {Showers|}{value|21}{rate|5.8%}'
                                    ].join('\n'),
                                    backgroundColor: '#eee',
                                    borderColor: '#777',
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    rich: {
                                        title: {
                                            color: '#eee',
                                            align: 'center'
                                        },
                                        abg: {
                                            backgroundColor: '#333',
                                            width: '100%',
                                            align: 'right',
                                            height: 25,
                                            borderRadius: [4, 4, 0, 0]
                                        },
                                        Sunny: {
                                            height: 30,
                                            align: 'left',
                                            backgroundColor: {
                                                image: weatherIcons.Sunny
                                            }
                                        },
                                        Cloudy: {
                                            height: 30,
                                            align: 'left',
                                            backgroundColor: {
                                                image: weatherIcons.Cloudy
                                            }
                                        },
                                        Showers: {
                                            height: 30,
                                            align: 'left',
                                            backgroundColor: {
                                                image: weatherIcons.Showers
                                            }
                                        },
                                        weatherHead: {
                                            color: '#333',
                                            height: 24,
                                            align: 'left'
                                        },
                                        hr: {
                                            borderColor: '#777',
                                            width: '100%',
                                            borderWidth: 0.5,
                                            height: 0
                                        },
                                        value: {
                                            width: 20,
                                            padding: [0, 20, 0, 30],
                                            align: 'left'
                                        },
                                        valueHead: {
                                            color: '#333',
                                            width: 20,
                                            padding: [0, 20, 0, 30],
                                            align: 'center'
                                        },
                                        rate: {
                                            width: 40,
                                            align: 'right',
                                            padding: [0, 10, 0, 0]
                                        },
                                        rateHead: {
                                            color: '#333',
                                            width: 40,
                                            align: 'center',
                                            padding: [0, 10, 0, 0]
                                        }
                                    }
                                }
                            },
                            {value: 535, name: '荆州'},
                            {value: 510, name: '兖州'},
                            {value: 634, name: '益州'},
                            {value: 735, name: '西凉'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        },
        ready() {
            let vm = this;
            let dom = document.getElementById(vm.chartId);
            if (!dom) return false;

            vm.myChart = echarts.init(dom);

            // ... The part about updating the chartData is omitted.

            vm.myChart.setOption(vm.option);
        },
        addResizeEvent() {
            window.addEventListener('resize', this.resizeChart);
        },
        removeResizeEvent() {
            window.removeEventListener('resize', this.resizeChart);
        },
        resizeChart() {
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.myChart && this.myChart.resize();
            }, 200);
        },
    },
    beforeDestroy() {
        this.removeResizeEvent();
        this.myChart && this.myChart.clear();
    },
};
</script>

<style lang="scss" scoped>
    .chart-container {
        width: 100%;
        height: 100%;
    }
</style>
