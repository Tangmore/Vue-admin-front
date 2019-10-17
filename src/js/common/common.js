const common = {
  //自适应高度,value是this
  adaptiveHeight(value) { 
    const that = value;
    // 判断是否有表单查询区域
    if(that.$refs.formheight){
      var formheight= that.$refs.formheight.$el.clientHeight;
    }else{
      var formheight=0;     
    }
    window.onresize = () => {
      if(!that.$refs.mainheight){return;}
      return (() => {
        let tableHeight = that.$refs.mainheight.$el.clientHeight - formheight - 50;
        that.tables.height = tableHeight + 'px';
      })()
    };
    let tableHeight = that.$refs.mainheight.$el.clientHeight - formheight - 50;
    that.tables.height = tableHeight + 'px';
  },
  //档案类别
  addMarker(that,type){
    if(type==="markerName" || type==="AddArchiveBox" )that.treeShow=true;
    $(".el-select-dropdown").css("display","none");
    $(".isdisabled").toggleClass("istrue")
  },
  selectMarker(treedate,that,type){
    if(!type || that.treeShow){
      $(".isdisabled").removeClass("istrue");
      that.ruleForm.fkTypeId=treedate.key;
      that.ruleForm.fkTypeName=treedate.label;
    }
  } 
}
export { common }
