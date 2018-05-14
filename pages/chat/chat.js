// pages/chat/chat.js
import we from '../../utils/wxPromise/index.js'
import url from '../../utils/url/index.js'
var app = getApp()
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: [{
      avator: '../../resourse/img.png',
      content: '好后来看房间里看电视呢发达就是离开发来看电视剧弗兰克的数据来看路上看到减肥红啊好好',
      type: 'rec'
    }, {
      avator: '../../resourse/img.png',
      content: '达肥红啊好好',
      type: 'sen'
    }, {
      avator: '../../resourse/img.png',
      content: '好后来看房间里看电视呢发达就是离开发来看电视剧弗兰克的数据来看路上看到减肥红啊好好',
      type: 'rec'
    }, {
      avator: '../../resourse/img.png',
      content: '好后来看房间里看电视呢发达就是离开发来看电视剧弗兰克的数据来看路上看到减肥红啊好好',
      type: 'rec'
    }, {
      avator: '../../resourse/img.png',
      content: '好后来看房间里看电视呢发达就是离开发来看电视剧弗兰克的数据来看路上看到减肥红啊好好',
      type: 'rec'
    }, {
      avator: '../../resourse/img.png',
      content: '好后来看房间里看电视呢发达就是离开发来看电视剧弗兰克的数据来看路上看到减肥红啊好好',
      type: 'rec'
    }, {
      avator: '../../resourse/img.png',
      content: '',
      type: 'rec'
    }],
    cursorSpacing: null,
    showPitchControl: false
  },
  recorderManager: null,
  startRecord: false,
  innerAudioContext: null,
  pitch: 0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recorderManager = wx.getRecorderManager()
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = true
    this.recorderManager.onStop((res) => {
      console.log(res)
      this.innerAudioContext.autoplay = true
      this.innerAudioContext.src = res.tempFilePath
      we.uploadFile({
        url: url.transform,
        filePath: res.tempFilePath,
        name:'audio',
        formData: {
          g_userid: app.globalData.sessionId,
          pitch: this.pitch
        }
      }).then(res => {
        this.innerAudioContext.src = `https://transform.acoder.me/fetchtrans/${res.data}.wav`
        console.log(res)
      })
    })
  },
  pitchToggle: function () {
    if (this.data.showPitchControl) {
      this.setData({
        showPitchControl: false
      })
    } else {
      this.setData({
        showPitchControl: true
      })
    }
  },
  changePitch: function (e) {
    this.pitch = e.detail.value
  },
  getRecord: function () {
    if (this.startRecord) {
      wx.hideLoading()
      this.startRecord = false
      this.recorderManager.stop()
    } else {
      wx.showLoading({
        title: '请将说话'
      })
      this.startRecord = true
      this.recorderManager.start({
        format: 'mp3'
      })
    }
  },

  playAudio: function () {
    innerAudioContext.src = ''
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