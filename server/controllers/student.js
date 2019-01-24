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

  refresh:async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId

    let list = await DB.query('SELECT * FROM student WHERE student.user = ? ', [user])
    let time = ctx.request.body.time
    let flag = ctx.request.body.flag
    if(flag == 1){
      let count = list[0].detailNum + 1
      await DB.query('UPDATE student SET detailNum = ? AND updateTime = ?WHERE student.user = ?', [count,time,user])
    }else{
      await DB.query('UPDATE student SET updateTime = ? WHERE student.user = ?', [time, user])
    }

    ctx.state.data = {}
  },
  

  getMe:async ctx => {
    let user = ctx.state.$wxInfo.userinfo.openId
    let list = await DB.query('SELECT * FROM student WHERE student.user = ? ', [user])
    ctx.state.data = list[0]
  }

}