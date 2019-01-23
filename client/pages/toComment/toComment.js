// pages/toComment/toComment.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    type:2,
    listArray: ["第 1 排", "第 2 排", "第 3 排", "第 4 排", "第 5 排", "第 6 排", "第 7 排", "第 8 排", "第 9 排", "第 10 排", "第 11 排", "第 12 排", "第 13 排", "第 14 排", "第 15 排"],
    showItem:"______",
    index:0,
    maxWordNum:140,
    minWordNum:10,
    texts: "至少10个字",
    questionBase:[
      {
        "id":"1",
        "type":1,
        "name":"请问这节课你坐在第____排？",
        "choice":"",
        "selectIndex": null
      },
      {
        "id": "2",
        "type": 2,
        "name": "你觉得这节课难度如何？",
        "choice": ["好难诶","还好了","水爆啦"],
        "selectIndex":null
      },
      {
        "id": "3",
        "type": 2,
        "name": "你觉得这节课难度如何？",
        "choice": ["好难诶", "还好了", "水爆啦"],
        "selectIndex": null
      },
      {
        "id": "4",
        "type": 2,
        "name": "你觉得这节课难度如何？",
        "choice": ["好难诶", "还好了", "水爆啦"],
        "selectIndex": null
      },
      {
        "id": "5",
        "type": 2,
        "name": "你觉得这节课难度如何？",
        "choice": ["好难诶", "还好了", "水爆啦"],
        "selectIndex": null
      },
      {
        "id": "6",
        "type": 3,
        "name": "这节课你有哪些难以理解的地方？",
        "choice": "",
        "selectIndex": null
      }
    ],
    studentAnswer:[]
  },
  commonSelected: function (event) {
    let qB = this.data.questionBase
    qB[0].selectIndex = parseInt(event.detail.value)
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: parseInt(event.detail.value),
      showItem: this.data.listArray[parseInt(event.detail.value)],
      questionBase:qB
    });
  }, commonCancel: function () {
    console.log('我取消了！');
  },
  selectOneItem: function (event){
    let selectData = event.currentTarget.dataset
    let qB = this.data.questionBase
  
    if (qB[selectData.th].selectIndex == null){
      qB[selectData.th].selectIndex = selectData.id;
      this.setData({
        questionBase:qB
      })
    }else{
      if(qB[selectData.th].selectIndex != selectData.id){
        qB[selectData.th].selectIndex = selectData.id;
        this.setData({
          questionBase: qB
        })
      }else{
        qB[selectData.th].selectIndex = null;
        this.setData({
          questionBase: qB
        })
      }
    }
  },
  //字数限制  
  bindInputText: function (e) {
    let qB = this.data.questionBase
    let id = qB.length-1
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最少字数限制
    if (len <= this.data.minWordNum){
      qB[id].selectIndex = null
      this.setData({
        texts: "够10个字才可以(⊙o⊙)哦，把你有疑问的地方都提出来吧~",
        questionBase: qB
      })
    }
    else if (len > this.data.minWordNum){
      qB[id].selectIndex = value
      this.setData({
        texts: " ",
        questionBase: qB
      })
    }
    //最多字数限制
    if (len > this.data.maxWordNum) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数  
    });
  },

  onTapLogin() {
    app.login({
      success: ({ userInfo }) => {
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      locationAuthType: app.data.locationAuthType
    })
    app.checkSession({
      success: ({ userInfo }) => {
        this.setData({
          userInfo
        })
      }
    })
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