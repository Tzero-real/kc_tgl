// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true
})

// 云函数入口函数
exports.main = async (event, context) => {
  return await cloud.database().collection('kc_form').where({
    tag: "已通过",
    school: event.school
  }).get()
}