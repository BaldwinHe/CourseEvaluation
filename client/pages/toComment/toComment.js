// pages/toComment/toComment.js
const app = getApp()
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const _ = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuID: "请输入您的学号",
    theStudentNumber:"",
    hiddenUnsure:true,
    hiddenInput:true,
    flag:0,
    studentID:null,
    userInfo: null,
    locationAuthType: app.data.locationAuthType,
    type:2,
    listArray: ["第 1 排", "第 2 排", "第 3 排", "第 4 排", "第 5 排", "第 6 排", "第 7 排", "第 8 排", "第 9 排", "第 10 排", "第 11 排", "第 12 排", "第 13 排", "第 14 排", "第 15 排"],
    showItem:"______",
    index:0,
    maxWordNum:140,
    minWordNum:10,
    texts: "至少10个字",
    questionNum:0,
    questionBase:[
      {
        "id":"1",
        "types":1,
        "names":"请问这节课你坐在第____排？",
        "choice":"",
        "selectIndex": null
      },
      {
        "id": "2",
        "types": 2,
        "names": "你觉得这节课难度如何？",
        "choice": ["好难诶","还好了","水爆啦"],
        "selectIndex":null
      },
      {
        "id": "3",
        "types": 2,
        "names": "你觉得这节课难度如何？",
        "choice": ["好难诶", "还好了", "水爆啦"],
        "selectIndex": null
      },
      {
        "id": "4",
        "types": 2,
        "names": "你觉得这节课难度如何？",
        "choice": ["好难诶", "还好了", "水爆啦"],
        "selectIndex": null
      },
      {
        "id": "5",
        "types": 2,
        "names": "你觉得这节课难度如何？",
        "choice": ["好难诶", "还好了", "水爆啦"],
        "selectIndex": null
      },
      {
        "id": "6",
        "types": 3,
        "names": "这节课你有哪些难以理解的地方？(选)",
        "choice": "",
        "selectIndex": null
      }
    ],
    studentAnswer:[]
  },
  commonSelected: function (event) {
    let qB = this.data.questionBase
    let sA = this.data.studentAnswer
    qB[0].selectIndex = parseInt(event.detail.value)
    sA[0] = this.data.listArray[parseInt(event.detail.value)]
    //改变index值，通过setData()方法重绘界面
    this.setData({
      index: parseInt(event.detail.value),
      showItem: this.data.listArray[parseInt(event.detail.value)],
      questionBase:qB,
      studentAnswer:sA
    });
  }, commonCancel: function () {
    console.log('我取消了！');
  },
  selectOneItem: function (event){
    let selectData = event.currentTarget.dataset
    let qB = this.data.questionBase
    let sA = this.data.studentAnswer
    if (qB[selectData.th].selectIndex == null){
      qB[selectData.th].selectIndex = selectData.id;
      sA[selectData.th] = selectData.id;
      this.setData({
        questionBase:qB,
        studentAnswer:sA
      })
    }else{
      if(qB[selectData.th].selectIndex != selectData.id){
        qB[selectData.th].selectIndex = selectData.id;
        sA[selectData.th] = selectData.id;
        this.setData({
          questionBase: qB,
          studentAnswer: sA
        })
      }else{
        qB[selectData.th].selectIndex = null;
        sA[selectData.th] = null;
        this.setData({
          questionBase: qB,
          studentAnswer: sA
        })
      }
    }
  },
  //字数限制  
  bindInputText: function (e) {
    let qB = this.data.questionBase
    let sA = this.data.studentAnswer
    let id = qB.length-1
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最少字数限制
    if (len <= this.data.minWordNum){
      qB[id].selectIndex = null
      sA[id] = null
      this.setData({
        texts: "够10个字才可以(⊙o⊙)哦，把你有疑问的地方都提出来吧~",
        questionBase: qB
      })
    }
    else if (len > this.data.minWordNum){
      qB[id].selectIndex = value
      sA[id] = value
      this.setData({
        texts: " ",
        questionBase: qB,
        studentAnswer:sA
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
        console.log(userInfo)
        this.setData({
          userInfo,
          locationAuthType: app.data.locationAuthType,
          flag:1
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },
  getStudentInfo(){
    this.setData({
      hiddenInput: !this.data.hiddenInput
    })  
  },
  bindStudentNumber :function (event) {
    console.log(event)
    this.setData({
      theStudentNumber:event.detail.value
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenInput: true
    });
  },
  //确认  
  confirm: function () {
    let ID = this.data.theStudentNumber
    let sure = this.data.hiddenUnsure
    this.setData({
      hiddenInput: true,
      stuID:ID,
      hiddenUnsure:!sure
    })
  },  
  getBack: function(){
    this.setData({
      hiddenUnsure: true
    });
  },
  verySure: function(){
    this.sendStudent()
    this.setData({
      hiddenUnsure: true,
      flag:0
    })
  },
  sendStudent(){
    wx.showLoading({
      title: '正在上传您的学号'
    })
    qcloud.request({
      url: config.service.addStudent,
      login: true,
      method: 'PUT',
      data: {
        id: this.data.stuID
      },
      success: result => {
        wx.hideLoading()
        let data = result.data
        if (data.code) {
          wx.showToast({
            icon: 'none',
            title: '上传信息失败'
          })
        }
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '上传信息失败'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dl = this.data.questionBase.length;
    var arr = new Array(dl);
    arr[dl-1]="";
    this.setData({
      questionNum:dl,
      studentAnswer:arr
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
  checkChoice:function() {
    let nowAns = this.data.studentAnswer
    for(var i = 0;i<this.data.questionNum-1;i++){
      if(nowAns[i]==null){
        wx.showModal({
          title: '提示',
          content: '诶，你是不是漏了点题呀',
          confirmText: "补补啦",
          cancelText: "快点去",
          confirmColor: "#AA56FF",
          cancelColor: "#5656FF",
          success: function (res) {
          }
        })  
        return;
      }
    }
    this.submit()
  },
  submit: function () {
    wx.showModal({
      title: '注意啦',
      content: '提交了就不能修改了哦,文本反馈这学期共需(有效)填写10次才不会扣平时分,你已填写' + '1' + '次',
      confirmText:"确认提交",
      cancelText:"我还改改",
      confirmColor: "#FF007F",
      cancelColor: "#7F7F7F",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  } ,
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})