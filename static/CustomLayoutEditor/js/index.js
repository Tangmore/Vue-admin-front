function initDrag(){
 $(".demo .column").sortable({
    opacity: .35,
    connectWith: ".column",
    handle: '.drag'
  })
}

layui.use(['form', 'layer'], function () {
  const form = layui.form,
    layer = layui.layer;

  let globalObj = {};

  var index = 0;

  //修改主题颜色
  var root = document.querySelector(':root');
  root.setAttribute('style', '--activecolor: '+$('#myIframe', parent.document)[0].attributes[3].value+'');

  // 保存布局，类似于PS那种自己保存
  function handleSaveLayout() {
    let e = $(".demo").html();
    console.log(e);
    return e;
  }

  function handleJsIds() {
    addId();
    layui.form.render();
  }

  function addId() {
    index++;
    var element = $('.sidebar-nav').find('.boxes').find('.view');
    element.attr('data-index', index);
  }

  function isRepeat(arr) {
    var hash = {};
    for(var i in arr){
      if(hash[arr[i].field]){
        layer.msg(`第${(i*1)+1}项字段名重复，请修改`);
        return true;
      }
      hash[arr[i].field] = true;
    }
    return false;
  }

  function gridSystemGenerator() {    // 自定义布局
    $(".lyrow .preview input").bind("keyup", function () {
      var e = 0;
      var t = "";
      var n = false;
      var r = $(this).val().split(" ", 12);
      $.each(r, function (r, i) {
        if (!n) {
          if (parseInt(i) <= 0) n = true;
          e = e + parseInt(i);
          t += '<div class="layui-col-md' + i + ' column"></div>'

        }
      });
      if (e == 12 && !n) {
        t = `<div class="lyrow ui-draggable"> ${t} </div>`;
        $(this).parent().next().children().html(t);
        $(this).parent().prev().show()
      } else {
        $(this).parent().prev().hide()
      }
    })
  }

  function removeElm() {
    $(".demo").delegate(".remove", "click", function (e) {
      e.preventDefault();
      $(this).parent().remove();
      if (!$(".demo .lyrow").length > 0) {
        clearDemo()
      }
    })
  }

  // 编辑组件
  function editElm(pelement) {
    let title = pelement.find('.preview').text(),
      el = '#layer-text',
      layFilter = 'form-text';

    let myId = pelement.find('.view')[0];
    // console.log(myId[0]);

    if (title === '文本框' || title === '文本域') {
      $('#dirShow').hide();
      $('#alertShow').show();
    } else {
      $('#dirShow').show();
      $('#alertShow').hide();
    }
    form.verify({
      english: function (value, item) {
        if (!new RegExp("^[A-Za-z]+$").test(value)) {
          return '只能输入英文字母或单词';
        }
      }
    });

    form.val(layFilter, {
      "title": pelement.find('label').text().split(" ")[0],
      "fieldname": pelement.find('.hide').attr('name'),
      "required": pelement.find('.hide').attr('data-required') || '1',
      "tipsinfo": pelement.find('.hide').attr('placeholder') || '请输入信息',
      "minlength": pelement.find('.hide').attr('minlength') || 0,
      "maxlength": pelement.find('.hide').attr('maxlength') || 10
    });
    layer.open({
      type: 1,
      title: '编辑',
      content: $(el),
      area: ['500px', '450px'],
      cancel: function () {
        $('#layer-text').hide();
      }
    });
    form.on('submit(determine)', function (data) {
      if($('#error_tip').is(':visible')){
        return false;
      }
      // console.log(data.field);
      var value = data.field;
      var info = getInfo(myId);
      for(var i in info){
        if(value.fieldname === info[i].field){
          layer.msg('字段名重复，请重新输入!!');
          return false;
        }
      }
      $('#layer-text').hide();
      if(value.required == '0'){
        pelement.find('input[class="layui-input"]').removeAttr('required', true);
      }else {
        pelement.find('input[class="layui-input"]').attr('required', true);
      }
      pelement.find('label').text(data.field.title + ' ：');
      pelement.find('input[class="hide"]').attr('name', value.fieldname);
      pelement.find('input[class="layui-input"]').attr('placeholder', value.tipsinfo || '');
      pelement.find('input[class="hide"]').attr('placeholder', value.tipsinfo || '');
      pelement.find('input[class="hide"]').attr('minlength', value.minlength);
      pelement.find('input[class="hide"]').attr('maxlength', value.maxlength);
      pelement.find('input[class="hide"]').attr('data-required', value.required);
      layer.closeAll();
      return false;
    });
  }

  function clearChoose(pelement) {
    let ele = pelement.find('.layui-input-block');
    ele.empty();
  }

  function clearDemo() {
    $(".demo").empty()
  }

  function removeMenuClasses() {
    $("#menu-layoutit li button").removeClass("active")
  }

  $(window).resize(function () {
    $("body").css("min-height", $(window).height() - 40);
    $(".demo").css("min-height", $(window).height() - 90);
  });

  $(document).ready(function () {
    let i = 0;
    $("body").css("min-height", $(window).height() - 140);
    $(".demo").css("min-height", $(window).height() - 90);
    $(".demo, .demo .column").sortable({connectWith: ".column", opacity: .35, handle: ".drag"});
    $(".sidebar-nav .lyrow").draggable({
      connectToSortable: ".demo",
      helper: "clone",
      handle: ".drag",
      drag: function (e, t) {
        t.helper.width(600)
      },
      stop: function (e, t) {
        $(".demo .column").sortable({
          opacity: .35,
          connectWith: ".column",
          handle: '.drag'
        })
      }
    });
    $(".sidebar-nav .box").draggable({
      connectToSortable: ".column",
      helper: "clone",
      handle: ".drag",
      drag: function (e, t) {
        t.helper.width(600)
      },
      stop: function () {
        handleJsIds();
      }
    });
    // initContainer();
    //组件编辑器编辑按钮操作
    let element = '';
    $(".row").on('click', '.box-edit', function () {
      element = $(this);
      let pelement = element.parent();
      // console.log(pelement.find('.preview').text());
      editElm(pelement);
    });

    $("#edit").click(function () {
      $("body").removeClass("devpreview sourcepreview");
      $("body").addClass("edit");
      removeMenuClasses();
      $(this).addClass("active");
      return false
    });
    $("#clear").click(function (e) {
      e.preventDefault();
      clearDemo()
    });
    $("#devpreview").click(function () {
      $("body").removeClass("edit sourcepreview");
      $("body").addClass("devpreview");
      $("body").style('margin-left', '0');
      removeMenuClasses();
      $(this).addClass("active");
      return false
    });

    $("#sourcepreview").click(function () {
      $("body").removeClass("edit");
      $("body").addClass("devpreview sourcepreview");
      removeMenuClasses();
      getInfo();
      $(this).addClass("active");
      return false
    });
    $(".nav-header").click(function () {
      // $(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
      $(this).next().slideDown()
    });

    $('#upload-btn').click(function () {
      let code = handleSaveLayout();
      let arcTpl = getInfo();

      var isRe = isRepeat(arcTpl);
      if (isRe) {
        return false;
      } else {
        let arcTplData = {}, codeData = {};
        var page = parent.page;

        arcTplData.id = parent.uploadId;
        arcTplData.arcTpl = arcTpl;

                codeData.id = parent.uploadId;
                codeData.htmlTpl = code;
                if (!parent.uploadId) {
                    layer.msg('请选择节点之后再上传！！');
                } else if (arcTplData.arcTpl.length <= 0) {
                    layer.msg('请创建模板后再上传！！');
                } else if (page === 'archiveModel') {
                  parent.$api.archiveInterface.updateHtmlTpl(codeData).then(res => {
                    console.log(res);
                  });
                  parent.$api.archiveInterface.updateArcTpl(arcTplData).then(res => {
                    layer.msg(res.msg)
                  });
                    // parent.app.post('archivesmodule/arcTbArcType/updateHtmlTpl', codeData, function (data) {
                    //     // console.log(data);
                    // });
                    // parent.app.post('archivesmodule/arcTbArcType/updateArcTpl', arcTplData, function (data) {
                    //     // console.log(data);
                    //     layer.msg(data.msg);
                    // });
                } else if (page === 'processTemplate') {
                    // console.log(codeData)
                    var tempjson = {
                        id: codeData.id.id,
                        fkSceneId: codeData.id.fkSceneId?codeData.id.fkSceneId:"",
                        fkSceneCode: codeData.id.fkSceneCode?codeData.id.fkSceneCode:"",
                        htmlTpl: codeData.htmlTpl,
                        formTpl: arcTplData.arcTpl
                    };
                  parent.$api.archiveInterface.updateArcTbFlowTpl(tempjson).then(res => {
                    if(res.state){
                      parent.showtemp_click();
                    }
                    layer.msg(res.msg);
                  });
                    // parent.app.post('activitymodule/ArcTbFlowTpl/updateArcTbFlowTpl', tempjson, function (data) {
                    //     // console.log(data);
                    //     if(data.state){
                    //         parent.showtemp_click();
                    //     }
                    //     layer.msg(data.msg);
                    // });
                } else {
                    // 调用其他接口
                }
            }
        });

        // 数据字典
        $('#dictionary').click(function () {
          parent.$api.archiveInterface.initSelectArcModel('').then(res => {
            if(res.state){
              $('#list').empty();
              $('.main').empty();
              let li = '', data = res.rows;
              for (let i = 0; i < data.length; i++) {
                li += `<li data-id="${data[i].id}">${data[i].svalue}</li>`
              }
              $('#list').append(li);
              let pelement = element.parent();
              let dirBox = layer.open({
                type: 1,
                title: '数据字典',
                content: $('#dicBox'),
                btn: ['确定', 'cancel'],
                area: ['600px', '445px'],
                yes: function (index, layero) {
                  let values = globalObj.svalue;
                  let id = globalObj.id;
                  let renderEle = pelement.find('.layui-input-block');

                  let select = pelement.find('select'),
                    checkbox = pelement.find(':checkbox'),
                    radio = pelement.find(':radio');

                  let ele = '';

                  if (select.length > 0) {
                    clearChoose(pelement);
                    let options = '';
                    for (let i = 0; i < values.length; i++) {
                      options += `<option value="${values[i]}">${values[i]}</option>`;
                    }
                    ele = `<select name="city">${options}</select>`;
                    renderEle.append(ele);
                    layui.form.render();
                    layer.close(dirBox);
                    $('#dicBox').hide();
                  } else if (checkbox.length > 0) {
                    clearChoose(pelement);
                    for (let i = 0; i < values.length; i++) {
                      ele += `<input type="checkbox" name="like[${values[i]}]" title="${values[i]}">`
                    }
                    renderEle.append(ele);
                    layui.form.render();
                    layer.close(dirBox);
                    $('#dicBox').hide();
                  } else if (radio.length > 0) {
                    clearChoose(pelement);
                    for (let i = 0; i < values.length; i++) {
                      ele += `<input type="radio" name="${values[i]}" value="${values[i]}" title="${values[i]}">`;
                    }
                    renderEle.append(ele);
                    layui.form.render();
                    layer.close(dirBox);
                    $('#dicBox').hide();
                  } else {
                    return false;
                  }
                  pelement.find('input[class="hide"]').attr('data-url', `id=${id}`);
                },
                btn2: function (index, layero) {
                  $('#dicBox').hide();
                  return true;
                },
                cancel: function () {
                  $('#dicBox').hide();
                }
              })
            }
          });
            // parent.app.get('authmodule/sysTbDictCode/selectArcModel', '', function (res) {
            //     if (res.state) {
            //         $('#list').empty();
            //         $('.main').empty();
            //         let li = '', data = res.rows;
            //         for (let i = 0; i < data.length; i++) {
            //             li += `<li data-id="${data[i].id}">${data[i].svalue}</li>`
            //         }
            //         $('#list').append(li);
            //         let pelement = element.parent();
            //         let dirBox = layer.open({
            //             type: 1,
            //             title: '数据字典',
            //             content: $('#dicBox'),
            //             btn: ['确定', 'cancel'],
            //             area: ['600px', '445px'],
            //             yes: function (index, layero) {
            //                 let values = globalObj.svalue;
            //                 let id = globalObj.id;
            //                 let renderEle = pelement.find('.layui-input-block');
            //
            //                 let select = pelement.find('select'),
            //                     checkbox = pelement.find(':checkbox'),
            //                     radio = pelement.find(':radio');
            //
            //                 let ele = '';
            //
            //                 if (select.length > 0) {
            //                     clearChoose(pelement);
            //                     let options = '';
            //                     for (let i = 0; i < values.length; i++) {
            //                         options += `<option value="${values[i]}">${values[i]}</option>`;
            //                     }
            //                     ele = `<select name="city">${options}</select>`;
            //                     renderEle.append(ele);
            //                     layui.form.render();
            //                     layer.close(dirBox);
            //                     $('#dicBox').hide();
            //                 } else if (checkbox.length > 0) {
            //                     clearChoose(pelement);
            //                     for (let i = 0; i < values.length; i++) {
            //                         ele += `<input type="checkbox" name="like[${values[i]}]" title="${values[i]}">`
            //                     }
            //                     renderEle.append(ele);
            //                     layui.form.render();
            //                     layer.close(dirBox);
            //                     $('#dicBox').hide();
            //                 } else if (radio.length > 0) {
            //                     clearChoose(pelement);
            //                     for (let i = 0; i < values.length; i++) {
            //                         ele += `<input type="radio" name="${values[i]}" value="${values[i]}" title="${values[i]}">`;
            //                     }
            //                     renderEle.append(ele);
            //                     layui.form.render();
            //                     layer.close(dirBox);
            //                     $('#dicBox').hide();
            //                 } else {
            //                     return false;
            //                 }
            //                 pelement.find('input[class="hide"]').attr('data-url', `id=${id}`);
            //             },
            //             btn2: function (index, layero) {
            //                 $('#dicBox').hide();
            //                 return true;
            //             },
            //             cancel: function () {
            //                 $('#dicBox').hide();
            //             }
            //         })
            //     }
            // })
        });

        $('.aside').on('click', 'ul li', function () {
            $('.main').empty();
            let id = $(this).attr('data-id');
            let values = [];
          parent.$api.archiveInterface.initSelectArcModelId({id: id}).then(res => {
            if (res.state) {
              let p = '', data = res.rows;
              for (let i = 0; i < data.length; i++) {
                p += `<p>${data[i].svalue}</p>`;
                values.push(data[i].svalue);
                globalObj.svalue = values;
              }
              globalObj.id = id;
              $('.main').append(p);
            }
          });
            // parent.app.get('authmodule/sysTbDictCode/selectArcModelId', {id: id}, function (res) {
            //     if (res.state) {
            //         let p = '', data = res.rows;
            //         for (let i = 0; i < data.length; i++) {
            //             p += `<p>${data[i].svalue}</p>`;
            //             values.push(data[i].svalue);
            //             globalObj.svalue = values;
            //         }
            //         globalObj.id = id;
            //         $('.main').append(p);
            //     }
            //
            // })
        });
        removeElm();
        gridSystemGenerator();

  })
});
