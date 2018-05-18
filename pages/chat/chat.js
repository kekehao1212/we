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
      content: '您好有什么要咨询的呢？',
      type: 'rec'
    },{
      avator: '../../resourse/img.png',
      content: '老师我最近遇到一些问题',
      type: 'sen'
    }],
    inputVal: '',
    consultImage: '../../resourse/img.png',
    cursorSpacing: null,
    showPitchControl: false,
    consultName: ''
  },
  recorderManager: null,
  startRecord: false,
  innerAudioContext: null,
  pitch: 0,
  userImage: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.psy)
    if (!app.globalData.user.image) {
      app.globalData.user.image = 
      `${url.domain}/api/users/_/avator?sessionId=${app.globalData.sessionId}`
      this.setData({
        consultName: app.globalData.psy.user.name,
        userImage: `${url.domain}/api/users/_/avator?sessionId=${app.globalData.sessionId}`,
        consultImage: `${url.domain}/api/users/${app.globalData.psy.id}/avator?c=1`
      })
    } else {
      this.setData({
        consultName: app.globalData.psy.user.name,
        userImage: `${url.domain}/api/users/_/avator?sessionId=${app.globalData.sessionId}`,
        consultImage: `${url.domain}/api/users/${app.globalData.psy.id}/avator?c=1`
      })
    }

    this.recorderManager = wx.getRecorderManager()
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = true
    this.recorderManager.onStop((res) => {
      this.innerAudioContext.autoplay = true
      we.uploadFile({
        url: url.transform,
        filePath: res.tempFilePath,
        name:'audio',
        formData: {
          g_userid: app.globalData.sessionId,
          pitch: this.pitch
        }
      }).then(res => {
        console.log(res)
        let tempmessage = this.data.message
        tempmessage.push({
          type: 'sen',
          audio: `https://transform.acoder.me/fetchtrans/${res.data}.wav`
        })
        this.setData({
          message: tempmessage
        })
        // this.innerAudioContext.src = `https://transform.acoder.me/fetchtrans/${res.data}.wav`
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
  send: function () {

    let tempmessage = this.data.message
    tempmessage.push({
      type: 'sen',
      content: this.data.inputVal
    })
    this.setData({
      message: tempmessage,
      inputVal: ''
    })
  },
  input: function (e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  getRecord: function () {
    if (this.startRecord) {
      wx.hideLoading()
      this.startRecord = false
      this.recorderManager.stop()
    } else {
      wx.showLoading({
        title: '正在录音'
      })
      this.startRecord = true
      this.recorderManager.start({
        format: 'mp3'
      })
    }
  },

  playAudio: function (e) {
    if (e.currentTarget.dataset.audio) {
      this.innerAudioContext.src = e.currentTarget.dataset.audio
    }
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