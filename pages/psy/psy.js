// pages/psy/psy.js
import we from '../../utils/wxPromise/index.js'
import url from '../../utils/url/index.js'
var app = getApp()
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    psy: {
      name: '小李子',
      avator: '../../resourse/img.png',
      about: 'xxx 77x xxxxxxxxx\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    following: null,
    displayFollowAnimation: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      psy: app.globalData.psy
    })
    let id = this.data.psy.id
    console.log(id)
    let {data:{following, id: followingId}} = await we.request({
      url: `${url.domain}/api/follows/followee/${id}`,
      header: app.globalData.header
    })
    this.followingId = followingId
    this.setData({
      following: following
    })
    console.log(following)
  },
  followingId: null,
  chat: function () {
    wx.navigateTo({
      url: '../chat/chat'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  toggleFollow: async function () {
    if (this.data.following === false) {
      let { data: { id } } = await we.request({
        url: url.follow,
        header: app.globalData.header,
        method: 'POST',
        data: {
          followeeId: this.data.psy.id
        }
      })
      this.followingId = id
      this.setData({
        displayFollowAnimation: true
      })
      setTimeout(() => {
        this.setData({
          following: true,
          displayFollowAnimation:false
        })
      }, 1500)
    } else {
      we.request({
        method:'DELETE',
        header: app.globalData.header,
        url: `${url.domain}/api/follows/${this.followingId}`,
      })
      this.setData({
        following: false
      })
    }
  },
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