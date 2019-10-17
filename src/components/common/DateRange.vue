<!--日期范围选择控件，运用日期组件必须引用该组件，且需要传递dateRange
    <date-range :dateRange="dateRange"></date-range>
    返回数据 dateRange:{startDate:'',endDate:''} -->
<template>
  <el-row>
<!-- 日期类型 -->
   <div v-if='!isTimeDate'>
  <el-col :span="11">
    <el-date-picker type="date" placeholder="请选择时间" :picker-options="pickerOptionsStart"  value-format="yyyy-MM-dd"
                    v-model="startDate" style="width: 150px;" @change="startRange"></el-date-picker>
  </el-col>
  <el-col class="date-line" :span="2" style="text-align: center;padding-left: 3px">至</el-col>
  <el-col :span="11">
    <el-date-picker type="date" placeholder="请选择时间" :picker-options="pickerOptionsEnd"  value-format="yyyy-MM-dd"
                    v-model="endDate" style="width: 150px;" @change="endRange"></el-date-picker>
 </el-col>
   </div>
 
   <!-- 日期时间类型 -->
   <div v-else>
    <el-col :span="11">
      <el-date-picker type="datetime" placeholder="请选择时间" :picker-options="pickerOptionsStart"  value-format="yyyy-MM-dd hh:mm:ss"
                      v-model="startDate" style="width: 150px;" @change="startTimeRange"></el-date-picker>
    </el-col>
    <el-col class="date-line" :span="2" style="text-align: center;padding-left: 3px">至</el-col>
    <el-col :span="11">
      <el-date-picker type="datetime" placeholder="请选择时间" :picker-options="pickerOptionsEnd"  value-format="yyyy-MM-dd hh:mm:ss"
                      v-model="endDate" style="width: 150px;" @change="endTimeRange"></el-date-picker>
   </el-col>
     </div>
 
  </el-row>
</template>
<script>
    export default {
        name: "DateRange",
        props:{
          dateRange:{type:Object,required:true}
        },
        data() {
            return {
              pickerOptionsStart: {
                disabledDate: time => {
                  let endDateVal = this.endDate;
                  if (endDateVal) {
                    return  time.getTime() > Date.now() || time.getTime() > new Date(endDateVal).getTime();
                  }
                  return  time.getTime() > Date.now();
                }
              },
              pickerOptionsEnd: {
                disabledDate: time => {
                  let beginDateVal = this.startDate;
                  if (beginDateVal) {
                    return time.getTime() > Date.now() || time.getTime() < new Date(beginDateVal).getTime()- 24*60*60*1000;
                  }
                  return time.getTime() > Date.now();
                },
              },
              startDate:'',
              endDate:'',
              // 是否为日期时间格式
              isTimeDate:false
            };
        },
        mounted(){
          if(this.dateRange.isTimeDate){
            this.isTimeDate=true;
          }
        },
        methods: {
          // 日期类型
          startRange(){
            if(this.startDate){
              this.dateRange.startDate=this.startDate + " 00:00:00";
            }else {
              this.dateRange.startDate="";
            }
          },
          endRange(){
            if(this.endDate){
              this.dateRange.endDate=this.endDate + " 23:59:59";
            }else {
              this.dateRange.endDate="";
            }
          },
          // 日期时间类型
          startTimeRange(){
            if(this.startDate){
              this.dateRange.startDate=this.startDate;
            }else {
              this.dateRange.startDate="";
            }
          },
          endTimeRange(){
            if(this.endDate){
              this.dateRange.endDate=this.endDate;
            }else {
              this.dateRange.endDate="";
            }
          }
        }
    };
</script>
