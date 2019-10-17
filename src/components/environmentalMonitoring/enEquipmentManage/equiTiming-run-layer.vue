<template>
  <el-dialog :title="modalObj.title" :visible.sync="visible" center :width="modalObj.width" :before-close="modalClose" :close-on-click-modal="false"
    :fullscreen='dialogfullscreen' :close-on-press-escape="false">
    <article class="equi_timing_run">
      <el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="90px">
        <el-form-item label="设备名称：" prop="equName">
          {{ruleForm.equName}}
        </el-form-item>
        <el-form-item label="设备编号：" prop="equNum">
          {{ruleForm.equNum}}
        </el-form-item>
        <el-form-item label="设备类型：" prop="fkTypeName">
          {{ruleForm.fkTypeName}}
        </el-form-item>
        <el-form-item label="所属库房：" prop="fkStoreName">
          {{ruleForm.fkStoreName}}
        </el-form-item>
        <!-- 添加任务 -->
        <div style="display: flex;justify-content: space-between;">
          <div class="add_task">
            <el-card class="box-card">
              <div slot="header" style="color: rgb(255, 255, 255,1);position: relative;">
                <span>任务</span>
                <span class="cop_btn cop_btn_asc" @click='addTask'>+</span>
              </div>
              <div style="height: 320px">
                <div v-for='(item,index) in task_arr' :key='index' class="task_list" @click='getTaskContent(item)' :class="item.taskName==active_item?'bg':''">
                  <span style="width: 180px;display: inline-block;">{{item.taskName}}</span>
                  <span class="cop_btn cop_btn_desc" @click='deleteTask(item)'>-</span>
                </div>
              </div>
            </el-card>
          </div>
          <img src="../../../images/turn-page.png" alt="" />
          <!-- 任务操作详情 -->
          <div style="width: 460px;" class="task_detail">
            <el-card class="box-card">
              <div slot="header">
                <span>任务内容</span>
              </div>
              <div style="height: 280px;" v-for='(item,index) in task_detail_arr' :key='index'>
                <!-- 执行指令 -->
                <div>
                  <el-form-item label='执行指令：'>
                    <el-select v-model="item.cmdName" style="width: 200px" @change='cmdChange'>
                      <el-option v-for='(item,index) in cmds_arr' :key='index' :label="item.cmdName" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <!-- 星期  -->
                <el-form-item label="时间周期：">
                  <div style="width: 400px;">
                    <el-checkbox v-for='(item,index) in  weekday_arr' v-model='item.selectFlag' :key='index' :label="item.label" @change='handleWeekChange(item.weekCycle)'></el-checkbox>
                  </div>
                </el-form-item>
                <!-- 运行时间 -->
                <div>
                  <el-form-item label='运行时间：'>
                    <el-time-picker style="width: 200px" v-model="item.executeTime" placeholder="请选择时间" value-format='hh:mm:ss' @change='timeChange'>
                    </el-time-picker>
                  </el-form-item>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <!--弹出层按钮居中 buttonCenter-->
        <el-form-item class="buttonCenter">
          <el-button @click="modalClose" size="small">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm',ruleForm)" size="small">保存</el-button>
        </el-form-item>
      </el-form>
    </article>

    <!-- 添加任务 -->
    <TimeTaskAddModel v-if="timeTaskAddVisible" :visible.sync="timeTaskAddVisible" v-dialogDrag :modalObj='modalObj1' @getNewTask='getNewTask'></TimeTaskAddModel>
  </el-dialog>
</template>

<script>
  import store from '@/store';
  import { mapState } from 'vuex';
  import TimeTaskAddModel from '@/components/environmentalMonitoring/enEquipmentManage/timeTask-add-layer.vue';
  export default {
    name: 'equiTiming-run-layer',
    components: {
      TimeTaskAddModel
    },
    data() {

      return {
        ruleForm: {},
        // 执行指令
        cmds_arr: [],
        cmds_id: '',
        // 参数设置
        timingTaskList: [],
        // 星期
        weekday_arr: [{ label: '周一', weekCycle: 2, selectFlag: false },
        { label: '周二', weekCycle: 3, selectFlag: false },
        { label: '周三', weekCycle: 4, selectFlag: false },
        { label: '周四', weekCycle: 5, selectFlag: false },
        { label: '周五', weekCycle: 6, selectFlag: false },
        { label: '周六', weekCycle: 7, selectFlag: false },
        { label: '周日', weekCycle: 1, selectFlag: false }],
        selectedWeek: [],
        // 运行时间
        runTime: '',
        // 任务列表
        task_arr: [],
        // 点击item
        active_item: '',
        // 任务内容arr
        task_detail_arr: [{
          executeTime: '',
          cmd: '',
          cmdName: '',
          cmdPar: {}
        }],
        task_arr_submit: [],
        equNum: '',
        // 公共dialog
        timeTaskAddVisible: false,
        modalObj1: {}
      };
    },
    computed: {
      ...mapState(['dialogfullscreen'])
    },
    props: {
      visible: { type: Boolean, default: false },
      modalObj: { type: Object, default: false },
      storeroom_arr: { type: Array, required: true },
      refresh: { type: Function, required: true }
    },
    mounted() {
      // 初始设备设置
      this.ruleForm = this.modalObj.notice_id;
      this.initCmdByTypeCode();
      this.initTimingTaskList();
    },
    methods: {
      // 初始化任务列表
      initTimingTaskList() {
        this.$api.enMonitoringInterface.initTimingTaskList({ num: this.modalObj.notice_id.equNum }).then(res => {
          if (res.state) {
            this.task_arr = res.rows;
            if (res.rows) {
              this.getTaskContent(res.rows[0]);
              this.active_item = res.rows[0].taskName;
              // 初始提交arr
              for (let item of res.rows) {
                var obj = this.handleObj(item);
                this.task_arr_submit.push(obj);
              }
            }
          }
        });
      },
      handleObj(res) {
        var obj = {};
        obj.executeTime = res.executeTime;
        obj.taskName = res.taskName;
        obj.weekCycle = res.weekCycle;
        var taskC = res.taskContent.split(',')[0].split(':')[1];
        taskC = taskC.substring(1, (taskC.length - 1));
        obj.cmd = taskC;
        if (this.cmds_arr.length != 0) {
          for (var item of this.cmds_arr) {
            if (item.cmdMark == taskC) {
              obj.parm = item.cmdPar;
            } else {
              obj.parm = {};
            }
          }
        }
        return obj;
      },
      //   初始化执行指令
      initCmdByTypeCode() {
        this.$api.enMonitoringInterface.initCmdByTypeCode({ typeCode: this.modalObj.notice_id.fkTypeCode }).then(res => {
          if (res.state) {
            this.cmds_arr = res.rows;
          }
        });
      },
      cmdChange(val) {
        var obj = {};
        for (var item of this.cmds_arr) {
          if (item.id == val) {
            obj.cmd = item.cmdMark;
            obj.parm = item.cmdPar;
          }
        }
        for (var item of this.task_arr_submit) {
          if (item.taskName == this.task_detail_arr[0].taskName) {
            item.cmd = obj.cmd;
            item.parm = obj.parm;
          }
        }
      },
      // 周期星期
      handleWeekChange(val) {
        let dayList = this.task_detail_arr[0].dayList;
        let index = dayList.indexOf(val);
        if (index == -1) {
          dayList.push(val);
        } else {
          dayList.splice(index, 1);
        }
        for (var item of this.task_arr_submit) {
          if (item.taskName == this.task_detail_arr[0].taskName) {
            item.weekCycle = dayList.toString();
          }
        }
      },
      // 时间
      timeChange(val) {
        for (var item of this.task_arr_submit) {
          if (item.taskName == this.task_detail_arr[0].taskName) {
            item.executeTime = val;
          }
        }
      },
      // 点击获取任务内容
      getTaskContent(res) {
        this.active_item = res.taskName;
        var single_obj = {};
        this.task_detail_arr = [];
        for (var item of this.weekday_arr) {
          item.selectFlag = false;
        }
        var taskC = res.taskContent.split(',')[0].split(':')[1];
        taskC = taskC.substring(1, (taskC.length - 1));
        //初始星期 
        for (var item of this.weekday_arr) {
          for (var i of res.dayList) {
            if (item.weekCycle == i) {
              item.selectFlag = true;
            }
          }
        }
        single_obj.dayList = res.dayList;
        single_obj.executeTime = res.executeTime;
        single_obj.taskName = res.taskName;
        single_obj.cmd = taskC;
        // 初始命令
        if (this.cmds_arr.length != 0) {
          for (var item of this.cmds_arr) {
            if (item.cmdMark == taskC) {
              single_obj.cmdName = item.cmdName;
              single_obj.cmdPar = item.cmdPar;
            }
          }
        }
        this.task_detail_arr.push(single_obj);
      },
      // 任务添加
      addTask() {
        let _this = this;
        _this.timeTaskAddVisible = true;
        _this.modalObj1 = { title: '添加', width: '400px', notice_id: this.task_arr, modal: false };
      },
      getNewTask(msg) {
        // console.log(msg)
        var obj = {
          dayList: [],
          executeTime: "",
          taskContent: "{cmd:''}",
          taskName: msg,
          weekCycle: ""
        };
        for (var item of this.weekday_arr) {
          item.selectFlag = false;
        }
        this.task_arr.push(obj);
        var obj2 = this.handleObj(obj)
        this.task_arr_submit.push(obj2);
      },
      // 任务删除
      deleteTask(res) {
        for (var item in this.task_arr) {
          if (this.task_arr[item].taskName == res.taskName) {
            this.task_arr.splice(item, 1);
          }
        }
        for (var item in this.task_arr_submit) {
          if (this.task_arr_submit[item].taskName == res.taskName) {
            this.task_arr_submit.splice(item, 1);
          }
        }
      },
      // 提交
      submitForm() {
        let _this = this;
        let obj = {
          equNum: this.modalObj.notice_id.equNum,
          tasks: this.task_arr_submit
        };
        _this.$api.enMonitoringInterface.submitTimeRun(obj).then(res => {
          if (res.state) {
            _this.refresh();
            _this.modalClose();
          }
          layer.msg(res.msg);
        })
      },

      modalClose() {
        this.$emit('update:visible', false); // 直接修改父组件的属性
        store.dispatch('dialogfullScreen', false);
      }
    }
  };
</script>
<style scoped>
  .el-dialog__wrapper>>>.el-form .el-form-item__content {
    width: 80px;
  }

  .el-dialog__wrapper>>>.el-form .buttonCenter .el-form-item__content {
    width: 780px;
  }

  .equi_timing_run .add_task {
    width: 240px;
    margin-bottom: 40px;
  }

  .equi_timing_run .add_task>>>.el-card__header {
    padding: 10px 20px;
    background: var(--activecolor);
  }

  .equi_timing_run .add_task>>>.el-card__body {
    padding: 0;
  }

  .equi_timing_run .task_detail>>>.el-card__header {
    padding: 10px 20px;
    background: rgba(244, 244, 244, 1);
  }

  .equi_timing_run img {
    width: 35px;
    height: 35px;
    transform: rotate(270deg);
    margin-top: 150px
  }

  /* 任务按钮 */

  .equi_timing_run .cop_btn_desc {
    text-align: center;
    position: absolute;
    left: 206px;
    top: 10px;
    color: rgb(233, 230, 230);
  }

  .equi_timing_run .cop_btn {
    height: 10px;
    width: 10px;
    line-height: 10px;
    text-align: center;
    border: 1px solid rgb(233, 230, 230);
    cursor: pointer;
  }

  .equi_timing_run .cop_btn_asc {
    float: right;
    margin-top: 4px;
  }

  .equi_timing_run .task_list {
    padding: 0 10px;
    height: 34px;
    line-height: 34px;
    position: relative;
  }

  .equi_timing_run .task_list:hover {
    background: rgb(206, 247, 239);
  }

  .bg {
    background: rgb(206, 247, 239);
  }
</style>