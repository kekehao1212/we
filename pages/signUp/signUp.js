// pag/////////、、、、、？、、、、《<<es/signUp/signUp.js
import we from '../../utils/wxPromise/index.js'
import url from '../../utils/url/index.js'
var app = getApp()
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avator:'../../resourse/addAvator.png',
    avatorClass: 'avatorButton',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  chooseAvator: async function () {
    let {tempFilePaths} = await we.chooseImage()
    this.setData({
      avator: tempFilePaths[0],
      avatorClass: 'userAvator'
    })
  },

  register: async function (e) {
    let userName = e.detail.value.userName
    if (!userName || this.data.avator === '../../resourse/addAvator.png') {
      we.showModal({
        title: '注册失败',
        content: '请选择用户头像并填写用户名',
        showCancel: false
      })
      return
    }
    var {statusCode:nameStatusCode} = await we.request({
      url: url.register,
      method: 'POST',
      header: {WX_SESSION_ID: app.globalData.sessionId},
      data: {name: userName}
    })
    var {statusCode: avatorStatusCode} = await we.uploadFile({
      url: url.avator,
      filePath: this.data.avator,
      name: 'avator',
      header: app.globalData.header
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