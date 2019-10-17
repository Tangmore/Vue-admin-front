<template>
    <article class="echartsbox">
        <div class="now-archive" style='padding:10px;'>
            <div class="operation-title" style="text-align: left;">
                <span class="archive-borrow-count-title">档案比</span>
            </div>
        </div>
        <div id="now-archive" style='height:100%'></div>
    </article>
</template>

<script>

    export default {
        name: 'nowArchive',
        data() {
            return {
                nowArchive_arr: [],
                nowArchiveCountEcharts: null,
                currentColor:sessionStorage.getItem('theme'),
            };
        },
        methods: {
            nowArchiveCount() {
                let _this = this;
                this.nowArchive_arr = [];
                _this.$api.archiveInterface.nowArchive().then(res => {
                    if (res.state) {
                        var msg = res.rows;
                        var name = '';
                        // console.log(res)
                        for (var item of msg) {
                            if (item.name == "existArc") {
                                name = '现存档案';
                            }
                            else if (item.name == "existBox") {
                                name = '现存档案盒';
                            }
                            else if (item.name == "rfArc") {
                                name = '在架档案';
                            }
                            else if (item.name == "rfBox") {
                                name = '在架档案盒';
                            }
                            else{
                                continue;
                            }
                            this.nowArchive_arr.push({ name: name, value: item.count })
                        }
                        this.nowArchiveCountEcharts.setOption({
                            series: [{
                                data: this.nowArchive_arr
                            }]
                        });
                    }
                })
            },
            initnowArchiveCount() {
                let _this=this;

                this.nowArchiveCountEcharts = this.$echarts.
                    init(document.getElementById('now-archive'));
                var option = {
                    title: {
                        x: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    legend: {
                        orient: 'vertical',
                        right: 40,
                        y : 'center',
                        data: [{ name: '现存档案', icon: 'circle', }, { name: '现存档案盒', icon: 'circle', }, { name: '在架档案', icon: 'circle', }, { name: '在架档案盒', icon: 'circle', }]
                    },

                    series: [
                        {
                            name: '现存档案',
                            type: 'pie',
                            center: ['36%', '36%'],
                            radius: '60%',
                            roseType: 'area',
                            data: this.nowArchive_arr,
                            color: [_this.currentColor, 'rgba(248,110,110,1)' , 'rgba(222,204,0,1)','rgba(11,207,225,1)'],
                        }
                    ]
                };
                this.nowArchiveCountEcharts.setOption(option);

            },
            // 刷新画布
            resize() {
                if (this.nowArchiveCountEcharts) {
                    this.nowArchiveCountEcharts.resize();
                }
            }

        },
        mounted() {
            // this.$nextTick(() => {     //初始化
            //     this.nowArchiveCount();
            //     this.initnowArchiveCount();
            //     window.addEventListener("resize", () => {
            //         this.resize();
            //     });
            // })
        }
    };
</script>
<style scoped>
   @import "../../css/Home.css";
    #now-archive {
        height: 100%;
        margin-top: 20px;
    }
      .echartsbox{
        background: #fff;
        height: 100%;
        overflow:hidden
    }
</style>
