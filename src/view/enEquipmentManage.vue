<template>
  <el-container> 
    <el-container>
      <el-main ref="mainheight" style="padding: 0 20px;">
        <el-form ref="formheight" :inline="true" :model="ruleForm" class="demo-form-inline">
         斤斤
        </el-form>
      </el-main>
    </el-container>
 
    <!--更多操作弹出层的内容-->
    <div id="more_action" style="display: none;">
      <ul style="margin:6px;padding:0;text-align: center;"></ul>
    </div>
  </el-container>
</template>

<script>
 
  export default {
    name: "enEquipmentManage",
    components: { 
  
    },
    data() {
      return {
        ruleForm: {
          fkStoreId: '',
          equipmentType: '',
          startTime: '',
          endTime: '',
          state: '',
          keyword: ''
        },
          // toolbar: {
          //   judge: function (msg) {
          //     let _this = this;
          //     return [{
          //       name: "设置", tableClick: function (res) {
          //         _this.equipmentSettingVisible = true;
          //         _this.modalObj = { title: '设置', width: '700px', notice_id: res };
          //       }
          //     }, {
          //       name: "定时运行", color: "#0BCFE1", tableClick: function (id, res) {
          //         _this.equiTimingRunVisible = true;
          //         _this.modalObj = { title: '定时运行', width: '820px', notice_id: res };
          //       }
          //     }, {
          //       name: "删除", color: '#F86E6E', tableClick: function (res) {
          //         _this.is_which_delete = 0;
          //         _this.deletedVisible = true;
          //         _this.modalObj = { title: '删除', width: '300px', notice_id: res, content: '是否确定删除？' };
          //       }
          //     }, {
          //       name: "更多", color: '#DECC00', tableClick: function (id, res, e) {
          //         layer.close(layer.tips());
          //         var data = res;
          //         _this.$api.enMonitoringInterface.initMoreEvent({ typeId: res.fkTypeId }).then(res => {
          //           var actionList = res.rows,
          //             ulElem = $('#more_action ul').empty();
          //           if (res.state) {
          //             if (ulElem.children().length == 0) {
          //               var liElem,
          //                 count = 0;//指令数组的下标
          //               for (var key in actionList) {
          //                 if (actionList[key].cmdMark == "enable") {
          //                   liElem = `<li class='equiCmdItem' data-cmdMark='${actionList[key].cmdMark}' value='${data.equNum}'><span style="color: #393D49">
          //                      ${actionList[key].cmdName}</span></li>`;
          //                 } else if (actionList[key].cmdMark == "equsto") {
          //                   liElem = `<li class='equiCmdItem' data-cmdMark='${actionList[key].cmdMark}'  value='${data.equNum}'><span style="color: #393D49">
          //                     ${actionList[key].cmdName}</span> </li>`;
          //                 } else if (actionList[key].cmdMark == "allatt") {
          //                   liElem = `<li class='equiCmdItem' data-cmdMark='${actionList[key].cmdMark}' value='${data.equNum}'><span style="color: #393D49"> 
          //                      ${actionList[key].cmdName}</span></li>`;
          //                 } else if (actionList[key].cmdMark == "alluser") {
          //                   liElem = `<li class='equiCmdItem' data-cmdMark='${actionList[key].cmdMark}' value='${data.equNum}'><span style="color: #393D49"> 
          //                     ${actionList[key].cmdName}</span> </li>`;
          //                 } else if (actionList[key].cmdMark == "setip") {
          //                   liElem = "";
          //                 } else if (actionList[key].cmdMark == "clearatt") {
          //                   liElem = `<li class='equiCmdItem' data-cmdMark='${actionList[key].cmdMark}' value='${data.equNum}'><span style="color: #393D49">
          //                      ${actionList[key].cmdName}</span> </li>`;
          //                 } else {
          //                   _this.cmdParArray.push(actionList[key].cmdPar);
          //                   liElem = `<li class="li-normal" value="${actionList[key].cmdMark}" 
          //                   data-cmdpar = "${count}"><span style="color: #393D49"> ${actionList[key].cmdName}</span></li>`;
          //                   count++;
          //                 }
          //                 ulElem.append(liElem);
          //               }
          //             }
          //             var con = $('#more_action').html();
          //             layer.open({
          //               id:'more_action_layer',
          //               type: 4,
          //               shade: 0.1,
          //               tips: [3, '#ffffff'],
          //               closeBtn: 0,
          //               shadeClose: true,
          //               tipsMore:false,
          //               area: ['auto', 'auto'],
          //               content: [con, e.target]
          //             });
          //             window.event.stopPropagation();

          //           } else {
          //             layer.msg(res.msg);
          //             return false;
          //           }
          //           // 更多的li标签点击事件--normal
          //           $('li.li-normal').on('click', function (event) {
          //             console.log('click事件');
          //           });

          //         });
          //       }
          //     }];
          //   }.bind(this)
          // }
        // },
        crumbs: [{ name: "设备管理" }],
        // 公共dialog
        // 定时运行
        equiTimingRunVisible: false,
        //删除   
        deletedVisible: false,
        modalObj: {},
      };
    },

    mounted() {
      this.common.adaptiveHeight(this);
    },
    methods: {
    }
  };
</script>
<style>
  .layui-layer-tips i.layui-layer-TipsG {
    z-index: -1;
  }

  .layui-layer-tips .layui-layer-content {
    padding: 10px;
    border-radius: 6px;
  }
</style>
<style scoped>
  #more_action ul li {
    padding: 0;
    list-style-type: none;
  }
</style>