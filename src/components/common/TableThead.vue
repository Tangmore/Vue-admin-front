<!--参数说明-->
<!--table表格
<table-thead :tables="tables" :showRadioRow='showRadioRow' :handleSelectionChange='handleSelectionChange'></table-thead>
    传递表格数据tables、单选事件showRadioRow和多选事件handleSelectionChange，所有参数必须存在
    data中数据例子：tables:{
             tableData: [],//表格数据
             pageCode:"",//表头
             checkBox:true,//是否存在多选框（true：是，false:否）
             radio:true,//是否存在单选框（true：是，false:否）
             height: '',//表格高度
             templet:function (val,msg) {  //表格数据的模板样式
               var _this = this;
               if (val === ""){
               //tableType（0：可改变字体颜色，1：可改变字体颜色和存在点击事件，2：el-switch点击事件，3：带小圆点的状态可改变字体颜色和存在点击事件）
                 //class参数可传可不传，可以改变样式。color可传可不传，改变字体颜色。tableClick点击事件
                 //tableType为2的时候，switchs必须有
                 return [{name:'',tableType:"1",class:"",color:"",switchs:{
                   checkname:"",
                   active:"是",activetext:"是",
                   inactive:"否",inactivetext:"否"
                 },tableClick:function (res) {
                   console.log(msg.id)
                 }}]
               }
             }.bind(this),
             toolbar: { //表格工具条的事件
               judge:function (msg) {
                 let _this=this;
               }.bind(this) //有需要时绑定父组件的this
             }
           },
    -->
<template>
  <el-table class="tb-edit" highlight-current-row :data="tables.tableData"
            :pageCode="tables.pageCode" :checkBox="tables.checkBox"
            style="width: 100%" :height="tables.height?tables.height:null"
            @row-click="showRadioRow"
            @selection-change="handleSelectionChange">
    <template v-for="(col ,index) in cols">
      <!--序号index-->
      <el-table-column v-if="col.type==='index'" :type="col.type" :label="col.label" :width="col.width" :fixed="col.fixed==''?null:col.fixed" align="center" show-overflow-tooltip></el-table-column>
      <!--多选框selection-->
      <el-table-column v-if="col.type==='selection'" :type="col.type" :width="col.width" :fixed="col.fixed==''?null:col.fixed" align="center" show-overflow-tooltip></el-table-column>
      <!--单选框radio-->
      <el-table-column v-if="col.type==='radio'" :type="col.type" :width="col.width" :fixed="col.fixed==''?null:col.fixed" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-radio class="radio"  v-model="radio"  :label="scope.$index">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <!--常规normal 不存在工具条和模板样式，只显示当前内容-->
      <el-table-column v-if="col.type==='normal' && !col.toolbar && !col.templet" :prop="col.prop" :label="col.label"
                       :width="col.width" :fixed="col.fixed==''?null:col.fixed" :toolbar="col.toolbar" align="center"
                       show-overflow-tooltip>
      </el-table-column>
      <!--常规normal 存在模板样式，内容根据templet更改样式-->
      <el-table-column v-if="col.type==='normal' && col.templet" :prop="col.prop" :label="col.label" :width="col.width" :fixed="col.fixed==''?null:col.fixed" :toolbar="col.toolbar" align="center" show-overflow-tooltip>
        <!--数据库字段templet和父组件传递的tables数据中templet都存在
        slot-scope="scope":这条数据的内容
         -->
        <template v-if="col.templet && tables.templet"  slot-scope="scope">
        <!-- 父组件tableType（0：可改变字体颜色，1：可改变字体颜色和存在点击事件，2：el-switch点击事件，3：带小圆点的状态可改变字体颜色和存在点击事件）  -->
         <el-button type="text" v-if="bar.tableType==0"  :class="bar.class" :style="{color:bar.color}"
                     v-for="(bar ,index) in tables.templet(col.prop,scope.row)"  :key='index'>{{bar.name}}</el-button>
          <el-button type="text" v-if="bar.tableType==1" @click="bar.tableClick(scope.row.id)" :class="bar.class" :style="{color:bar.color}"
                     v-for="(bar ,index) in tables.templet(col.prop,scope.row)"  :key='index'>{{bar.name}}</el-button>
          <!--<el-radio  v-if="bar.tableType==2"  :key='index' :label="bar.name" :class="bar.class" :style="{color:bar.color}" v-model="scope.row.allowBorrow"-->
                     <!--@click="if(bar.tableClick)bar.tableClick"-->
                    <!--v-for="(bar ,index) in tables.templet(col.prop,scope.row)"></el-radio>-->
          <!--开关样式变成了radio的样式-->
          <el-switch v-if="bar.tableType==2" class="switchStyle" active-color="var(--activecolor)" inactive-color="#D5D5D5"
                     :active-value="bar.switchs.active" :inactive-value="bar.switchs.inactive"
                     :active-text="bar.switchs.activetext" :inactive-text="bar.switchs.inactivetext" v-model="scope.row.allowBorrow"
                     v-for="(bar ,index) in tables.templet(col.prop,scope.row)" @change="if(bar.tableClick)bar.tableClick(scope.row)" :key='index'>
          </el-switch>

          <el-button  type="text" v-if="bar.tableType==3" @click="if(bar.tableClick)bar.tableClick" :class="bar.class" :style="{color:bar.color}"
                     v-for="(bar ,index) in tables.templet(col.prop,scope.row)"  :key='index'>
            <span class="circleDot" :class="bar.circleColor"></span>
            {{bar.name}}</el-button>
        </template>
      </el-table-column>
      <!--常规normal 存在工具条-->
      <el-table-column v-if="col.type==='normal' && col.toolbar" :prop="col.prop" :label="col.label" :width="col.width" :fixed="col.fixed==''?null:col.fixed" :toolbar="col.toolbar" align="center" show-overflow-tooltip>
        <template v-if="col.toolbar"  slot-scope="scope">
              <el-button size="small" type="text" @click="bar.tableClick(scope.row.id,scope.row,$event)" :disabled="bar.disabled ? true : false" :class="bar.class" v-if='tables.toolbar.judge' :style="{color:bar.color}"
                         v-for="(bar ,index) in tables.toolbar.judge(scope.row)"  :key='index'>{{bar.name}}</el-button>
          <!--<el-button type="text" @click="bar.tableClick(scope.row.id,parent)" :class="bar.class" v-if='tables.toolbar.judge' :style="{color:bar.color}"-->

        </template>
      </el-table-column>
      <el-table-column v-if="col.type==='sort'" :prop="col.prop" sortable :label="col.label" :width="col.width" :fixed="col.fixed==''?null:col.fixed" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag type="primary">{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";
    export default {
      components: {ElButton},
      name: "TableThead",
        props:{
          tables:{type:Object,required:true},
          handleSelectionChange:{type:Function,required:true},
          showRadioRow:{type:Function,required:true}
        },
        data() {
            return {
              parent:'',
              cols: [],
              radio:'',
//              radio: '是',//switch
//              switchvalue: false
            };
        },
        mounted() {
          this.init();
        },
        methods: {
          init(){
            // console.log(this.tables.cols)
            console.log(this.tables.pageCode)
            //查询表格的表头
            this.parent=this.tables.parent;
            if(this.tables.pageCode){
              this.$api.commonInterface.tableCols({
                pageCode: this.tables.pageCode,
//              pageMarker: par.pageMarker
              }).then(res => {
                console.log(res.rows)
                let cols=res.rows;
                if(this.tables.checkBox)this.cols.push({type:"selection",width:"55",fixed: "left"});
                if(this.tables.radio)this.cols.push({type:"radio",width:"55",fixed: "left"});
                this.cols.push({type:"index",label: "序号",width:"55",fixed: "left"});
                for(let col of cols){
                  //hide:0显示，1隐藏
                  if(col.hide===0){
                    let coljson={
                      label: col.title, prop: col.field, type: "normal",
                      width:col.width,
                      toolbar:col.toolbar,
                      templet:col.templet,
                      fixed: col.fixed
                    };
                    this.cols.push(coljson);
                  }
                }
              });
            }else if(!this.tables.pageCode && this.tables.cols){
              let cols=this.tables.cols;

              if(this.tables.checkBox)this.cols.push({type:"selection",width:"55",fixed: "left"});
              if(this.tables.radio)this.cols.push({type:"radio",width:"55",fixed: "left"});
              this.cols.push({type:"index",label: "序号",width:"55",fixed: "left"});
              for(let col of cols){
                //hide:0显示，1隐藏
                if(col.hide===0){
                  let coljson={
                    label: col.title, prop: col.field, type: "normal",
                    width:col.width,
                    toolbar:col.toolbar,
                    templet:col.templet,
                    fixed: col.fixed
                  };
                  this.cols.push(coljson);
                }
              }
            }
          },
        }
    };
</script>
<style scoped>
  @import "../../css/table.css";
</style>
