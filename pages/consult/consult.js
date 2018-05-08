// pages/consult/consult.js
import we from '../../utils/wxPromise/index.js'
import url from '../../utils/url/index.js'
var app = getApp()
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    topTabBar: [{
        text: '学习',
        isActive: true,
      }, {
        text: '情感',
        isActive: false,
      }, {
        text: '更多',
        isActive: false,
      }
    ],
    psys: [[{
      avator:'../../resourse/img.png',
      name: '小李子',
      descrption: 'xxx 77x xxxxxxxxx\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }, {
      avator:'../../../resourse/img.png',
      name: '小李子',
      descrption: 'xxx 77x fdsfs\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }],[
      {
        avator:'../../resourse/img.png',
        name: '小李子2',
        descrption: 'xxx 77x xxxxxxxxx\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }, {
        avator:'../../../resourse/img.png',
        name: '小李子2',
        descrption: 'xxx 77x 阿萨德的分手费\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }
    ],[
      {
        avator:'../../resourse/img.png',
        name: '小李子3',
        descrption: 'xxx 77x xxxxxxxxx\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }, {
        avator:'../../../resourse/img.png',
        name: '小李子3',
        descrption: 'xxx 77x 规范的股份的规定发给对方\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }
    ]]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: async function (options) {
     let {data:{results}} = await we.request({
      url: url.consult,
      header: {WX_SESSIONID: app.globalData.sessionId}
    })
    let psys = [[],[],[]]
    results.map(item => { 
      item.avator = `${url.domain}/api/users/${item.id}/avator`
      psys[item.type].push(item)
    })
    this.setData({
      psys: psys
    })
    console.log(psys)
  },

  changeTopTab: function (e) {
    let topTabBar = this.data.topTabBar
    topTabBar[this.data.activeIndex].isActive = false
    topTabBar[e.target.dataset.index].isActive = true
    this.setData({
      'topTabBar': topTabBar,
      'activeIndex': e.target.dataset.index
    })
  },
  toPsy: function (e) {
    let index = e.target.dataset.index
    app.globalData.psy = this.data.psys[this.data.activeIndex][index]
    console.log(app.globalData.psy)
    wx.navigateTo({
      url: '../psy/psy',
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