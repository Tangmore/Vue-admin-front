<template>
    <article class="echartsbox" >
        <div class="operation" style='padding:10px;'>
            <div class="operation-title">
                <span class="archive-borrow-count-title">数</span>
            </div>
            <div class="operation-btn">
                <!-- 按钮组 -->
                <el-button-group style="margin-left: 10px">
                    <el-button size="mini" :class="timeType==1?'operation-btn-color':''" @click='changetimeTypeMonth'>月</el-button>
                    <el-button size="mini" :class="timeType==2?'operation-btn-color':''" @click='changetimeTypeYear '>年</el-button>
                </el-button-group>
            </div>
        </div>
        <div id="archive-borrow-count" style='height:100%;'></div>
    </article>
</template>

<script>
    export default {
        name: 'archiveBorrow',
        data() {
            return {
                data: [], 
                countArr: [],
                timeType: 2,
                fkTypeId: '',
                borrowCountEcharts: null,
                xdata: [1,2,3,4,5,6,7,8,9,10,11,12],
                currentColor:sessionStorage.getItem('theme'),
            };
        },
 
        methods: {
            changetimeTypeYear() {
                this.timeType = 2;
                this.xdata=[];
            },
            changetimeTypeMonth() {
                this.timeType = 1;
                this.xdata=[];
            },
            // 获取借阅数
            archiveborrowCount() {
                this.countArr = [];
            },
            initBorrowCount() {
                this.borrowCountEcharts = this.$echarts.init(document.getElementById('archive-borrow-count'));
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor:this.currentColor,
                            }
                        }
                    },
                    //设置表格位置
                    grid: {
                        x: '6%',
                        y: 30,
                        x2: '10%',
                        y2: 120,
                        borderWidth: 1
                    },
                    xAxis: {
                        type: 'category',
                        name: '日期',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color: 'rgba(186,186,186,1)',//左边线的颜色
                                width: '1'//坐标线的宽度
                            }
                        },
                        axisLabel: {
                            // rotate:16,
                            interval: 0,
                            textStyle: {
                                color: 'rgba(186,186,186,1)'//坐标值得具体的颜色
                            }
                        },
                        data: this.xdata
                    },
                    yAxis: {
                        type: 'value',
                        name: '数量',
                        minInterval:1,
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color: 'rgba(186,186,186,1)',//左边线的颜色
                                width: '1'//坐标线的宽度
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(186,186,186,1)',//坐标值得具体的颜色
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    },
                    series: {
                        smooth: true,
                        symbol: 'pin',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color:this.currentColor,
                                // label: { show: true }
                            }
                        }, 
                        lineStyle: {
                            width: 4
                        },

                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: this.currentColor,
                                }, {
                                    offset: 1,
                                    color: 'rgba(255,255,255,1)'
                                }])
                            }
                        },
                        data: this.countArr
                    }
                };
                this.borrowCountEcharts.setOption(option);

            },
            // 刷新画布
            resize() {
            
            }
        },
   
        mounted() {
            this.$nextTick(() => {     //初始化
                window.addEventListener("resize", () => {
                    this.resize();
                });
            });
 
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

    .operation-btn {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }
     .operation-btn>>>.operation-btn-color {
        background: var(--activecolor);
        color: #fff;
    }
       .echartsbox{
        background: #fff;
        height: 100%;
        overflow:hidden;
    }

</style>