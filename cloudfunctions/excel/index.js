// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser:true
})

//操作excel用的类库
const xlsx = require('node-xlsx');

// 云函数入口函数
exports.main = async(event, context) => {
  try {
    let {kc_form} = event
    
    //1,定义excel表格名
    let excelname = '科创汇总表格.xlsx'
    //2，定义存储数据的
    let excel = [];
    let form_head = ['项目名称', '申请人', '学号','主要成员1','学院','专业','指导教师1','职称','指导教师2','职称','指导教师3','职称']; //表属性
    excel.push(form_head);

    for (let key in kc_form) {
      let exceldata = [];
      exceldata.push(kc_form[key].name);
      exceldata.push(kc_form[key].head);
      exceldata.push(kc_form[key].headId);
      exceldata.push(kc_form[key].stu)
      exceldata.push(kc_form[key].school);
      exceldata.push(kc_form[key].subject);
      exceldata.push(kc_form[key].teacher[0]);
      exceldata.push(kc_form[key].teachertitle[0]); 
      exceldata.push(kc_form[key].teacher[1]);
      exceldata.push(kc_form[key].teachertitle[1]);   
      exceldata.push(kc_form[key].teacher[2]);
      exceldata.push(kc_form[key].teachertitle[2]);          
      excel.push(exceldata)
    }
    //3，把数据保存到excel里
    var excelcontext = await xlsx.build([{
      name: "TGL工作室生成",//excel表格底下的工作簿名字
      data: excel
    }]);

    //4，把excel文件保存到云存储里
    return await cloud.uploadFile({
      cloudPath: excelname,
      fileContent: excelcontext, //excel二进制文件
    })

  } catch (e) {
    console.error(e)
    return e
  }
}
