<template>
    <article class="echartsbox">
        <div class="operation" style='padding:10px'>
            <div class="operation-title">
                <span class="archive-borrow-count-title">各类型档案数量排行</span>
            </div>
        </div>
        <div id="archive-type-order" style='height:100%'></div>
    </article>
</template>

<script>

    export default {
        name: 'archiveTypeOrder',
        data() {
            return {
                typeArr: [],
                countArr: [],
                archiveTypeOrderEcharts: null,
                currentColor: sessionStorage.getItem('theme'),
            };
        },

        methods: {
            // 获取排行
            archiveTypeOrder() {
                this.countArr = [];
                this.typeArr = [];
                let _this = this;
                _this.$api.archiveInterface.archiveTypeOrder().then(res => {
                    if (res.state) {
                        // console.log(res)
                        var msg = res.rows;
                        for (var item of msg) {
                            this.typeArr.push(item.typeName);
                            this.countArr.push(item.num);
                        }
                        this.archiveTypeOrderEcharts.setOption({
                            xAxis: [{
                                data: this.typeArr
                            }],
                            series: [{
                                data: this.countArr
                            }]
                        });
                    }
                })
            },
            initarchiveTypeOrder() {
                var _this = this;
                this.archiveTypeOrderEcharts = this.$echarts.init(document.getElementById('archive-type-order'));
                var option = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        x: '6%',
                        y: 30,
                        x2: '10%',
                        y2: 120,
                        borderWidth: 1
                    },
                    xAxis: [
                        {
                            type: 'category',
                            name: '类型',
                            data: this.typeArr,
                            axisTick: {
                                alignWithLabel: true
                            },
                            splitLine: { show: false },
                            axisLine: {
                                lineStyle: {
                                    type: 'solid',
                                    color: 'rgba(186,186,186,1)',
                                    width: '1'
                                }
                            },
                            axisLabel: {
                                // rotate:16,
                                interval: 0,
                                textStyle: {
                                    color: 'rgba(186,186,186,1)',

                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '数量',
                            minInterval: 1,
                            splitLine: { show: false },
                            axisLine: {
                                lineStyle: {
                                    type: 'solid',
                                    color: 'rgba(186,186,186,1)',
                                    width: '1'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: 'rgba(186,186,186,1)',

                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '档案数量',
                            type: 'bar',
                            barWidth: '40%',
                            data: this.countArr,
                            itemStyle: {
                                normal: {
                                    color: function (params) {
                                        var colorList = [];
                                        var lightColor = '';
                                        if (_this.currentColor == '#1AB394') {
                                            lightColor = '#3CDEBD';
                                        } else if (_this.currentColor == '#5293FF') {
                                            lightColor = '#8DB8FF';
                                        } else if (_this.currentColor == '#0BCFE1') {
                                            lightColor = '#70F3FF';
                                        } else if (_this.currentColor == '#8762FF') {
                                            lightColor = '#B098FF';
                                        }
                                        var colorList = [_this.currentColor, lightColor,
                                        _this.currentColor, lightColor,
                                        _this.currentColor, lightColor,
                                        _this.currentColor, lightColor,
                                        _this.currentColor, lightColor];
                                        return colorList[params.dataIndex]
                                    },
                                    label: { show: true },
                                    barBorderRadius: [30, 30, 0, 0] //柱状角成椭圆形
                                },
                            }
                        }
                    ]
                };
                this.archiveTypeOrderEcharts.setOption(option);
            },
            // 刷新画布
            resize() {
                if (this.archiveTypeOrderEcharts) {
                    this.archiveTypeOrderEcharts.resize();
                }
            }

        },

        mounted() {
            // this.$nextTick(() => {     //初始化
            //     this.initarchiveTypeOrder();
            //     this.archiveTypeOrder();
            //     window.addEventListener("resize", () => {
            //         this.resize();
            //     });
            // });
        }
    };
</script>
<style scoped>
    @import "../../css/Home.css";
    .operation {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }

    #archive-type-order {
        height: 204px;
        margin-top: 20px;
    }

    .echartsbox {
        background: #fff;
        height: 100%;
        overflow: hidden
    }
</style>