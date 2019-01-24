const DB = require('../utils/db')

module.exports = {

  /**
   * 添加评论
   */
  add: async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let username = ctx.state.$wxInfo.userinfo.nickName
    let avatar = ctx.state.$wxInfo.userinfo.avatarUrl

    let content = ctx.request.body.content || null
    let studentID = ctx.request.body.studentID || null
    
    await DB.query('INSERT INTO classcomment(user, username, avatar, studentID, content) VALUES (?, ?, ?, ?, ?)', [user, username, avatar, studentID, content])

    ctx.state.data = { 1: studentID, 2: content}
  },
}