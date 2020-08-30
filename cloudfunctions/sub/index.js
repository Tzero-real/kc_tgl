const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  console.log(event)
  try {
    const result = await cloud.openapi.subscribeMessage.send({
        touser: event.openId,
        data: {
          "thing1": {
            "value": event.name
          },
          "name4": {
            "value": event.head
          },
          "phrase3": {
            "value": event.tag
          },
          "thing5": {
            "value": event.correct
          }
        },
        templateId: "xGmh4S4t0yddmfjDygiRhl1oL6lgfmBAz30AjRH99Vs",
        page:`pages/details/index?id=${event.id}`
      })
    return result
  } catch (err) {
    return err
  }
}