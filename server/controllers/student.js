const DB = require('../utils/db')

module.exports = {
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl
    
    let studentID = ctx.request.body.id || null

    await DB.query('INSERT INTO student(user, username, studentID) VALUES (?, ?, ?)', [user, username, studentID])

    ctx.state.data = {}
  },

}