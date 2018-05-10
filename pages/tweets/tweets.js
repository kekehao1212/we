// pages/message/message.js
import we from '../../utils/wxPromise/index.js'
import url from '../../utils/url/index.js'
var app = getApp()
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 1,
    topTabBar: [{
      text: '推送',
      isActive: false,
    }, {
      text: '树洞',
      isActive: true,
    }, {
      text: '关注',
      isActive: false,
    }],
    tweets:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: async function (options) {
    //获取推送
    we.request({
      url: url.notification,
      header: app.globalData.header
    }).then((res) => {
      console.log(res)
      let {data:{results}} = res
      // for(let item of results) {
      //   item.avator = `${url.domain}/api/users/${item.post.userId}/avator`
      // }
      let temp = this.data.tweets
      temp[0] = results
      this.setData({
        tweets: temp
      })
    })

    //获取树洞
    we.request({
      url: url.tweets,
      header: app.globalData.header
    }).then((res) => {
      console.log(res)
      let {data:{results}} = res
      for(let item of results) {
        item.avator = `${url.domain}/api/users/${item.post.userId}/avator`
      }
      let temp = this.data.tweets
      temp[1] = results
      this.setData({
        tweets: temp
      })
    })

    //获取关注文章
    we.request({
      url: url.articles,
      header: app.globalData.header
    }).then((res) => {
      let {data:{results}} = res
      console.log(res)
      let temp = this.data.tweets
      temp[2] = results
      this.setData({
        tweets: temp
      })
    })
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

  comment: function (e) {
    console.log('comment',e)
    let postId = e.detail.target.dataset.postid
    let inputVal = e.detail.value.inputVal
    we.request({
      url: `${url.domain}/api/posts/${postId}/comments`,
      method: 'POST',
      data: {
        content: inputVal,
        anonymous: false
      },
      header:app.globalData.header
    }).then(res => {
      console.log(res)
    })
  },
  
  getComment: function (e) {
    console.log(e)
    let postId = e.currentTarget.dataset.postid
    we.request({
      url: `${url.domain}/api/posts/${postId}/comments`,
      header:app.globalData.header
    }).then((res) => {
      console.log(res)
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