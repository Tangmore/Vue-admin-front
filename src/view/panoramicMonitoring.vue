<template>
  <el-container>
    <el-main ref="mainheight">
      <el-row class="panoramic" :gutter="24">
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18" style="margin-bottom: 30px;">
     
          <el-form :model="ruleForm" ref="ruleForm" style="height: 100%">
            <el-form-item label="选择库房：">
              <el-select v-model="ruleForm.fkStoreId" @change='initmonitorList' style="width: 130px;">
                <el-option v-for='(item,index) in  storeroom_arr' :key='index' :label="item.storeName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-row style="margin-top:20px;height: calc(100% - 60px)">
              <el-col :span="24" style="height: 100%;">
                <div id="content">
                  <div class="equi-box" v-for='(item,index) in equiment_arr' v-if="item.fkTypeCode!='afmj'" :id="'drag-field'+item.id" :key='index'>
                    <div class="equi-item" :class="item.state =='on'?'equi_on_state':(item.state == 
                    'offline'?'':'equi_off_state')">
                      <!-- 设备类型图片 -->
                      <!-- {{item.state}} -->
                      <img :src="item.imgAddress" alt="" style='width:24px;height:24px;' srcset>
                    </div>
                    <div class="equi_state">
                      <p>{{item.equName}} &nbsp;&nbsp;
                        <span v-if="item.fkTypeCode=='cjq'" :class="'cjq-'+item.equNum">0℃</span>
                      </p>
                      <p>当前状态：
                        <span :class="item.state=='on'?'item_point':'item_point_offline'"></span>{{item.state | equiState}}</p>
                      <p>当前模式：{{item.mode | equiMode }}</p>
                    </div>
                    <span :id="'more-event'+item.id" class="more-event" @click="initMoreEvent(item,$event)">更多操作</span>
                    <main>
                 
                    </main>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="equi_detail">
          <div class="right_side" style="height: 100%">
            <div>
              <header-crumb :crumbs="crumbs1"></header-crumb>
            </div>
            <div class="equi_list discrible" style="height: 26%;">
              <div class="title-item">
                <span class="item_point"></span>{{ruleForm.storeName}}</div>
              <el-row :gutter="20">
                <el-col :span="8" class="green-text">
                  <p>{{this.ruleForm.onmun}}</p>运行数量 </el-col>
                <el-col :span="8" class="yellow-text">
                  <p>{{this.ruleForm.offnum}}</p>关闭数量</el-col>
                <el-col :span="8" class="blue-text">
                  <p>{{this.ruleForm.offlinenum}}</p>离线数量</el-col>
              </el-row>
              <div class='' style="margin-top: 10px;" v-for='(item,index) in cjq_arr' :key='index'>
                <div class="title-item">
                  <span class="item_point"></span>{{item.equName}}&nbsp;({{item.state | equiState}})</div>
                <el-row>
                  <el-col :span="8" class="green-text">
                    <p>{{item.wd}}
                      <span class='minfont'>℃</span>
                    </p>
                  </el-col>
                  <el-col :span="8" class="yellow-text">
                    <p>{{item.sd}}
                      <span class='minfont'>%RH</span>
                    </p>
                  </el-col>
                  <el-col :span="8" class="blue-text">
                    <p>{{item.nd}}
                      <span class='minfont'>mg/m³</span>
                    </p>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div style="margin-top: 10px;position: relative;">
              <div style="display: flex;justify-content: start;align-items: center;" class="title-item">
                <div class="item_line"></div>环境实时曲线图
              </div>
              <div style="position: absolute;right:0;top: 0;">
                <el-select v-model="ruleForm.equId" @change='CjqChange' style="width: 110px;" size="mini">
                  <el-option v-for='(item,index) in  cjq_arr' :key='index' :label="item.equName" :value="item.equNum"></el-option>
                </el-select>
              </div>
            </div>
            <div id="store_echart">

            </div>
            <div style="margin-top: 10px;">
              <header-crumb :crumbs="crumbs2"></header-crumb>
            </div>
            <div class="alarm_table discrible" style="height:32%;">
              <audio controls="controls" id="wsd_alarm" style="display: none">
                <source src=" audios/wsdalarm.mp3" type="audio/mpeg">
              </audio>
              <el-table :data="tableData" stripe style="font-size: 14px;">
                <el-table-column prop="alarmMsg" label="报警信息" align="center"></el-table-column>
                <el-table-column prop="alarmValue" label="报警值" align="center"></el-table-column>
                <el-table-column prop="createTime" label="报警时间" align="center"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script> 
  export default {
    name: "panoramicMonitoring",
    components: { 
    },

    data() {
      return {
        disabled: false,
        crumbs: [{ name: "全景监测" }],
        crumbs1: [{ name: "设备监控" }],
        crumbs2: [{ name: "报警信息" }],

        ruleForm: {
          // 库房id
          fkStoreId: '',
          storeName: '',
          //采集器id
          equId: '',
          //总数 在线 关闭 离线数量  
          totalEquiNum: 0,
          onmun: 0,
          offnum: 0,
          offlinenum: 0
        },
         currentColor: sessionStorage.getItem('theme'),
        // 库房列表
        storeroom_arr: [],
        // 设备
        equiment_arr: [],
        // 更多操作
        moreEvent_arr: [],
        cmdParArray: [],
        // 采集器arr
        cjq_arr: [],
        // 集中器arr
        jzq_arr: [],
        // echarts
        cjqDataEcharts: null,
        cjq_data: {
          wdata: [],
          sdata: [],
          ndata: [],
          timeArr: []
        },
        // 报警信息table
        tableData: [],

        // websocket
        websocket: null,
        equiNumber_arr: [],
        _times: '',
        timearr: [],

        ind:''
      };
    },
 
     computed: {
      currentTabValue() {
        return this.$store.state.currentTabValue;　　//需要监听的数据
      },
      keepAlive(){
        return  this.$store.state.keepAlive;
      }
    },
    watch: {
      // 点前点击tab是否更改
      currentTabValue(newVal, oldVal) {
        // console.log(this.ind)
           let arr=window.location.href.split('/');
        this.ind=arr[arr.length-1]+'';  
        if((newVal!=this.$options.name) || (this.ind!=this.$options.name)){
          if(this.websocket){
              this.websocket.close();
              this.websocket='';
          }
        }else{
           this.websocketMsg();
        }
      }
    
    },
    mounted() {
      var _this = this;
      // 获取库房、初始集中器echarts
      this.$nextTick(() => {
        this.initStorehouseList();
        this.initCjqEchart(this.cjq_data.wdata, this.cjq_data.sdata, this.cjq_data.ndata, this.cjq_data.timeArr);
      })
      window.addEventListener("resize", () => {
        this.resize();
      });
      // 设备拖拽
      this.dragEqui();

    },
    filters: {
      equiState: function (val) {
        if (val === 'offline') {
          return "离线";
        } else if (val === 'off') {
          return "关闭";
        } else {
          return "运行";
        }
      },
      equiMode: function (val) {
        if (val === 'hand') {
          return "手动模式";
        } else {
          return "自动模式";
        }
      }
    },
    methods: {
      // 针对断网的情况的心跳重连      
      startHeartbeat(value) {
        var _this = this;
        _this.timearr[value] = setTimeout(() => {
          _this.jzq_arr = [];   
          console.log("断开" + value);
          _this.initEquipment(_this.ruleForm.fkStoreId);
       
          clearTimeout(_this.timearr[value]);
        }, 20000);
        console.log(_this.timearr);
      },
      resetHeartbeat(value) {
        var _this = this;
        clearTimeout(_this.timearr[value]);
        _this.startHeartbeat(value);
      },

      //获取库房
      initStorehouseList() {
        this.$api.enMonitoringInterface.initStorehouseList().then(res => {
          if (res.state) {
            if (res.rows.length > 0) {
              this.storeroom_arr = res.rows;
              this.ruleForm.fkStoreId = this.storeroom_arr[0].id;
              this.ruleForm.storeName = this.storeroom_arr[0].storeName;
              this.initAlarmTb(this.ruleForm.fkStoreId);
              this.initEquipment(this.ruleForm.fkStoreId);
              // 获取设备初始位置
              this.getPosition(this.ruleForm.fkStoreId);
              // websocket连接       
              this.websocketMsg();
            }
          }
        });
      },
      // 库房改变刷新
      initmonitorList(val) {
        var _this = this;
        // 清除定时器       
        for (var obj in _this.timearr) {
          //  console.log(_this.timearr[obj])
          clearTimeout(_this.timearr[obj]);
        }
        this.initEquipment(val);
        this.cjqDataEcharts.setOption({
          xAxis: [{ data: [] }],
          series: [{
            data: []
          }, {
            data: []
          }, {
            data: []
          }]
        })

        // 库房切换时重新绘制
        this.ruleForm.equId = '';
        this.ruleForm.fkStoreId = val;
        for (var item of this.storeroom_arr) {
          if (item.id == val) {
            this.ruleForm.storeName = item.storeName;
          }
        }
        this.initAlarmTb(val);

        _this.websocket.send(JSON.stringify({ storeId: _this.ruleForm.fkStoreId }));
      },
      // 初始库房设备
      initEquipment(val) {
        var _this = this;
        this.ruleForm.offlinenum = 0;
        this.ruleForm.onmun = 0;
        this.ruleForm.offnum = 0;
        this.ruleForm.totalEquiNum = 0;
        this.ruleForm.equId = '';
        this.cjq_arr = [];
        this.equiment_arr = [];
        let data = { 'map[fkStoreId]': val };
        for (var item of this.storeroom_arr) {
          if (item.id == val) {
            // 设置库房背景
            if (item.imgAddress) {
              $("#content").css("background", "url(" + this.$store.state.imgurl + "" + item.imgAddress + ")no-repeat");
              $("#content").css("background-size", "100% 100%");
            }
          }
        }
        this.$api.enMonitoringInterface.initEquiManageTb(data).then(res => {
          if (res.state) {
            this.equiment_arr = res.rows;
            // 获取设备位置
            this.getPosition(val);
            for (var item of res.rows) {
              // 统计设备编号--equiNumber_arr
              _this.equiNumber_arr.push(item.equNum);
              item.imgAddress = this.$store.state.imgurl + item.imgAddress;
              item.state = 'offline';
              item.mode = 'auto';
              if (item.fkTypeCode != 'afmj') {
                this.ruleForm.totalEquiNum++;
              }
              if ((item.state == 'offline') && (item.fkTypeCode != 'afmj')) {
                this.ruleForm.offlinenum++;
              }
              if (item.fkTypeCode == "cjq") {
                // 温度
                item.wd = 0.0;
                // 湿度
                item.sd = 0.0;
                // 浓度
                item.nd = 0.0;
                this.cjq_arr.push(item);
              }
            }
            if (this.cjq_arr.length != 0) {
              this.CjqChange(this.cjq_arr[0].equNum);
            }
          }
        })
      },
      //websocket链接  
      websocketMsg() {
        var _this = this;
        if (_this.websocket) {
          _this.websocket.send(JSON.stringify({ storeId: _this.ruleForm.fkStoreId }));
        } else {
          _this.websocket = new WebSocket("ws://" + _this.$store.state.baseurl.substring(7) + "equsocket");
          //连接成功建立的回调方法
          _this.websocket.onopen = function (event) {
            _this.websocket.send(JSON.stringify({ storeId: _this.ruleForm.fkStoreId }));
            _this.setMessageInnerHTML("open");
          }
        }
        //接收到消息的回调方法
        _this.websocket.onmessage = function (event) {
          _this.setMessageInnerHTML(event.data);
        }

        //连接发生错误的回调方法
        _this.websocket.onerror = function () {
          _this.websocketMsg();
          _this.setMessageInnerHTML("error");
        }

        //连接关闭的回调方法
        _this.websocket.onclose = function () {
          _this.setMessageInnerHTML("close");
        }
 
      },
      // 显示消息
      setMessageInnerHTML(innerHTML) {  
        let _this = this;  
        let arr=window.location.href.split('/');
        this.ind=arr[arr.length-1]+'';  
        console.log(this.ind);
         if((this.keepAlive.indexOf(this.$options.name)==-1) || this.ind==''){
              _this.websocket.close();
              _this.websocket='';
              return;
          }
        // 监测时间
        this.heartCheckTime = 0;
        try {
          this.ruleForm.onmun = 0;
          this.ruleForm.offlinenum = 0;
          this.ruleForm.offnum = 0;
          var msgjson = JSON.parse(JSON.parse(innerHTML));
          _this.randata = Math.random();
          var result1 = this.equiNumber_arr.indexOf(msgjson.jsonData.devNum);
          console.log(msgjson);
       
          if (msgjson.jsonData.alarmMsg) {
            // 温湿度报警信息
            // document.getElementById("wsd_alarm").play();
            this.initAlarmTb(this.ruleForm.fkStoreId);
          }

          if (result1 != -1) {
            for (var item of this.equiment_arr) {
              // 更新设备状态、模式
              if (item.equNum == msgjson.jsonData.devNum) {
                item.state = msgjson.jsonData.devState;
                // 当返回状态为up/down时
                if (msgjson.jsonData.devState == 'up' || msgjson.jsonData.devState == 'down') {
                  item.state = 'on';
                }
                if (msgjson.jsonData.mode) {
                  item.mode = msgjson.jsonData.mode;
                }
              }
              // 更新运行、关闭、离线设备数量
              if (item.state == 'on') {
                this.ruleForm.onmun++;
              } else if (item.state == 'off') {
                this.ruleForm.offnum++;
              } else if ((item.state == 'offline') && (item.fkTypeCode != 'afmj')) {
                this.ruleForm.offlinenum++;
              }
            }
            // 集中器状态   
            var centerNum = msgjson.jsonData.centerNum
            var index_arr = $.inArray(centerNum, this.jzq_arr);
            if (index_arr == -1) {
              for (var item of this.equiment_arr) {
                if (item.equNum == centerNum) {
                  item.state = 'on';
                }
              }
              this.jzq_arr.push(centerNum);
              this.startHeartbeat(centerNum);
            }
            if (index_arr >= 0) {
              this.resetHeartbeat(centerNum);
            }

            //更新采集器数据
            if (msgjson.jsonData.devType == 'cjq') {
              for (var key of this.cjq_arr) {
                if (msgjson.jsonData.devNum == key.equNum) {
                  // 温度
                  key.wd = msgjson.jsonData.data.wd.toFixed(2);
                  // 湿度
                  key.sd = msgjson.jsonData.data.sd.toFixed(2);
                  // 浓度
                  key.nd = msgjson.jsonData.data.tvoc.toFixed(2);
                  $(".cjq-" + msgjson.jsonData.devNum).html(key.wd + '℃');
                }
              }
              if (msgjson.jsonData.devNum == this.ruleForm.equId) {
                var msgdata = msgjson.jsonData.data;
                var wd = msgdata.wd;
                var sd = msgdata.sd;
                var tvoc = msgdata.tvoc;
                if (!wd) { wd = 0; }
                if (!sd) { sd = 0; }
                if (!tvoc) { tvoc = 0; }
                this.getTime();
                this.cjq_data.wdata.push(wd);
                this.cjq_data.sdata.push(sd);
                this.cjq_data.ndata.push(tvoc);
                this.cjq_data.timeArr.push(this._times);
                if (this.cjq_data.timeArr.length > 20) {
                  this.cjq_data.wdata.shift();
                  this.cjq_data.sdata.shift();
                  this.cjq_data.ndata.shift();
                  this.cjq_data.timeArr.shift();
                }
                this.cjqDataEcharts.setOption({
                  xAxis: [{
                    data: this.cjq_data.timeArr
                  }],
                  series: [{
                    data: this.cjq_data.wdata
                  }, {
                    data: this.cjq_data.sdata
                  }, {
                    data: this.cjq_data.ndata
                  }]
                })
              }
            }
          }
        } catch (error) {
          console.log(innerHTML);
        }
      },

      //取得系统当前时间
      getTime() {
        var date = new Date();
        var hours = this.checkTime(date.getHours());
        var minutes = this.checkTime(date.getMinutes());
        var seconds = this.checkTime(date.getSeconds());
        this._times = hours + ":" + minutes + ":" + seconds;
      },
      checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      },
      // 获得echarts数据
      CjqChange(val) {
        let _this = this;
        this.ruleForm.equId = val;
        this.cjqDataEcharts.setOption({
          xAxis: [{
            data: []
          }],
          series: [{
            data: []
          }, {
            data: []
          }, {
            data: []
          }]
        })
      },
      // 初始echart
      initCjqEchart(wdata, sdata, ndata, timeArr) {
        let _this = this;
        this.cjqDataEcharts = this.$echarts.init(document.getElementById('store_echart'));
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          legend: {
            data: ['温度', '湿度', 'TVOC'],
            // orient:'vertical',
            y: 'top',
            right: 40,
            top: 6,
            textStyle: {
              color: 'rgba(135,135,135,1)'
            }
          },
          grid: {
            x: '10%',
            y: 28,
            x2: 26,
            y2: 20,
            borderWidth: 1
          },
          xAxis: [{
            type: 'category',
            // name: '时间',
            boundaryGap: false,
            data: timeArr,
            splitLine: { show: false },//去除网格线
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(223,223,223,1)',//左边线的颜色
                width: '1'//坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: 'rgba(135, 135, 135, 1)',//坐标值得具体的颜色

              }
            }

          }],
          yAxis: [{
            type: 'value',
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(223,223,223,1)',
                width: '1'
              }
            },
            axisLabel: {
              textStyle: {
                color: 'rgba(135, 135, 135, 1)'
              }
            }
          }],
          series: [{
            type: 'line',
            name: '温度',
            symbol: 'circle',
            symbolSize: '6',
            data: wdata,
            itemStyle: {
              normal: {
                color: _this.currentColor,
                lineStyle: {
                  color: _this.currentColor
                }
              }
            }
          }, {
            type: 'line',
            name: '湿度',
            symbol: 'circle',
            symbolSize: '6',
            data: sdata,
            itemStyle: {
              normal: {
                color: '#DECC00',
                lineStyle: {
                  color: '#DECC00'
                }
              }
            }
          }, {
            type: 'line',
            name: 'TVOC',
            symbol: 'circle',
            symbolSize: '6',
            data: ndata,
            itemStyle: {
              normal: {
                color: '#0BCFE1',
                lineStyle: {
                  color: '#0BCFE1'
                }
              }
            }
          }]
        };
        this.cjqDataEcharts.setOption(option);
      },
      // 初始报警信息列表
      initAlarmTb(val) {
        this.tableData = [];
        let data = { 'map[fkStoreId]': val };
        this.$api.enMonitoringInterface.initAlarmsTb(data).then(res => {
          if (res.state) {
            this.tableData = res.rows;
          }
        });
      },
      // 鼠标拖拽
      dragEqui(obj) {
        var _this = this;
        if (!obj) { return; }
        var obox = document.getElementById("content");
        var odrag = document.getElementById("drag-field" + obj);

        $("#drag-field" + obj).hover(function () {
          $(this).addClass("all");
        }, function () {
          $(this).removeClass("all");
          $(this).find('main').hide();
        })

        odrag.onmousedown = function (ev) {
          var oevent = ev || event;
          var tar = oevent.target.id;
          if (tar.indexOf("drag-field") == -1) { return; }
          var distanceX = oevent.clientX - odrag.offsetLeft;
          var distanceY = oevent.clientY - odrag.offsetTop;
          var old_x = oevent.clientX;
          var old_y = oevent.clientY;
          document.onmousemove = function (ev) {
            var oevent = ev || event;
            var _x, _y;
            _x = oevent.clientX - distanceX;
            _y = oevent.clientY - distanceY;
            if (_x < 0) _x = 0;
            if (_y < 0) _y = 0;
            if (_x > obox.offsetWidth - 66) _x = obox.offsetWidth - 66;
            if (_y > obox.offsetHeight - odrag.offsetHeight) _y = obox.offsetHeight - odrag.offsetHeight;
            odrag.style.left = _x + 'px';
            odrag.style.top = _y + 'px';
          };

          document.onmouseup = function (ev) {
            var oevent = ev || event;
            var _x = oevent.clientX - distanceX;
            var _y = oevent.clientY - distanceY;
            var leftindex = (_x / $("#content").width()).toFixed(2);
            var topindex = (_y / $("#content").height()).toFixed(2);
            var id = oevent.target.id;
            var data = { fkEquId: id.substring(10), leftIndex: leftindex, topIndex: topindex };
            _this.$api.enMonitoringInterface.updateLocation(data).then(res => {
              if (res.state) {
                layer.msg(res.msg);
              }
            });
            document.onmousemove = null;
            document.onmouseup = null;
          };
        }
      },
      // 获取初始位置
      getPosition(storeid) {
        this.$api.enMonitoringInterface.getLocationByStoreId({ storeid }).then(res => {
          if (res.state) {
            for (var item of this.equiment_arr) {
              for (var itemR of res.rows) {
                if (item.id == itemR.fkEquId) {
                  item.posx = ($("#content").width() * itemR.leftIndex).toFixed(2);
                  item.posy = ($("#content").height() * itemR.topIndex).toFixed(2);
                  // 绑定前端ID
                  $('#drag-field' + item.id).css({ "top": item.posy + 'px', "left": item.posx + 'px' });
                }
              }
              // 设备拖拽
              if (item.fkTypeCode != 'afmj' && res.rows.length != 0) {
                this.dragEqui(item.id);
              }
            }
          }
        });
      },
      // 更多操作
      initMoreEvent(val, e) {
        var _this = this;
        this.moreEvent_arr = [];
        var id = e.target.id,
          ulElem = $('#' + id).next().empty().toggle();
        this.$api.enMonitoringInterface.initMoreEvent({ typeId: val.fkTypeId }).then(res => {
          if (res.state) {
            var liElem,
              count = 0,
              actionList = res.rows;
            for (var key in actionList) {
              this.cmdParArray.push(actionList[key].cmdPar);
              liElem = `<p class='plist' style="margin: 0;margin-top: 4px;padding-left:4px;"
               value="${actionList[key].cmdMark}" 
                data-cmdpar = "${count}" 
                data-equNum="${val.equNum}"> ${actionList[key].cmdName}</p>`;
              count++;
              ulElem.append(liElem);
            }

          } else {
            layer.msg(res.msg);
          }
          // 点击操作，发送命令
          $('p.plist').on('click', function (event) {
            var cmd = $(this).attr('value');
            //根据数组下标来获取对应的cmdPar
            var cmdPar = $(this).attr('data-cmdpar');
            var equNum = $(this).attr('data-equNum');
            var info = {
              equNum,
              cmd,
              data: _this.cmdParArray[cmdPar]
            };
            _this.$api.enMonitoringInterface.sendMsg(info).then(res => {
              if (res.state) {
                if (res.msg == "NotHandMode") {
                  layer.msg("当前不处于手动模式，请开启！");
                } else if (res.msg == "OffLine") {
                  layer.msg("设备不在线，请检查设备状态！");
                } else if (res.msg == "NoAddr") {
                  layer.msg("未知的设备地址！");
                } else if (res.msg == "NoneCmd") {
                  layer.msg("没有找到命令！");
                } else if (res.msg == "NoDataItem") {
                  layer.msg("数据字段为空！");
                } else if (res.msg == "OtherErr") {
                  layer.msg("其他错误！");
                } else {
                  layer.msg(msg.msg);
                }
              }
              layer.msg(res.msg);
            });
            // 清空
            _this.cmdParArray = [];
          })
        });
      },

      // 刷新画布
      resize() {
        if (this.cjqDataEcharts) {
          this.cjqDataEcharts.resize();
        }
      },
    },
 
  };
</script>
 