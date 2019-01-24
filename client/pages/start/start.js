// pages/start/start.js
const app = getApp()
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canSubmit: ["2019/01/24", "2019/01/25", "2019/01/26","2019/01/28"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let flag = 0;
    let canSubmit = this.data.canSubmit;
    let dateNow = util.formatTime(new Date()).substring(0, 10);
    for(var i = 0;i<this.data.canSubmit.length;i++){
      if(dateNow == canSubmit[i]){
        flag = 1;
        break;
      }
    }
    if(flag == 0){
      wx.showModal({
        title: '哎呀',
        content: '今天是没有课的呀',
        confirmText: "知道啦",
        cancelText: "噢噢噢",
        confirmColor: "#FF007F",
        cancelColor: "#7F7F7F",
        success: function (res) {
          
        }
      })
      return;
    }
    let timer = setTimeout(() => {
      clearTimeout(timer)
      this.direct()
    }, 3000)
  },

  direct() {
    wx.redirectTo({
      url: '/pages/toComment/toComment'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})