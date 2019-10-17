<template>
    <div class="hello">
     <input type="text" v-model='rfid'>
     <button @click='readRfid'>识别</button>
     
    </div>
  
  </template>
  <script>
      import {comRfid} from '../js/common/rfid.js'
      export default{
          data(){
              return{
                rfid:''
              }
          },
          methods:{
              readRfid(){
                  var _this=this;
                  var data={wsUri:this.$store.state.wsUri,cmd:'readMany'};
                  comRfid(data,function(res){
                    var res=JSON.parse(res);
                    if(res.state){
                        if(res.row){
                            _this.rfid=res.row.EPC || '';
                        }
                    }else{
                        return;
                    }
        })
      }
    }
}
  </script>
  <style lang="css">
  
  </style>