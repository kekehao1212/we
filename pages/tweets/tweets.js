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
    tweets:[],
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
      let arr = []
      for (let item of results) {
        arr.push({
          content: item.content,
          title: item.title,
          id: item.id
          // avator : `${url.domain}/api/users/${item.post.userId}/avator`
        })
      }
      let temp = this.data.tweets
      arr.reverse()
      temp[0] = arr
      this.setData({
        tweets: temp
      })    
      console.log('推送',arr)
    })
    
    //获取树洞
    we.request({
      url: url.tweets,
      header: app.globalData.header
    }).then((res) => {
      console.log(res)
      let {data:{results}} = res
      let arr = []
      for(let item of results) {
        arr.push({
          avator: `${url.domain}/api/users/${item.post.userId}/avator`,
          content: item.content,
          userName: item.post.user.name,
          userId: item.post.userId,
          anonymous: item.post.anonymous,
          title: item.title,
          postId: item.post.id,
          commentInput: ''
        })
      }
      let temp = this.data.tweets
      arr.reverse()
      temp[1] = arr
      this.setData({
        tweets: temp
      })
      console.log('树洞',temp[1])
    })
    
    //获取关注文章
    we.request({
      url: url.articles,
      header: app.globalData.header
    }).then((res) => {
      let {data:{results}} = res
      console.log(res)
      let arr = []
      for (let item of results) {
        arr.push({
          avator: item.avator,
          content: item.content,
          userName: item.post.user.name,
          userId: item.post.user.id,
          anonymous:item.post.anonymous,
          postId: item.post.id,
          commentInput: '',
          title: item.post.title
        })
      }
      let temp = this.data.tweets
      arr.reverse()
      temp[2] = arr
      this.setData({
        tweets: temp
      })
      console.log('关注',arr)
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
    console.log(e)
    let postId = e.detail.target.dataset.postid
    let inputVal = e.detail.value.inputVal
    let tweetIndex = e.detail.target.dataset.tweetindex
    we.request({
      url: `${url.domain}/api/posts/${postId}/comments`,
      method: 'POST',
      data: {
        content: inputVal,
        anonymous: false
      },
      header:app.globalData.header
    }).then(res => {
      if (res.statusCode === 201) {
        var temp = this.data.tweets
        console.log(tweetIndex)
        temp[this.data.activeIndex][tweetIndex].commentInput = ''
        this.setData({
          tweets: temp
        })
        console.log(res)
        wx.showModal({
          title: '评论成功',
          showCancel: false
        })
      }
    })
  },
  
  getComment: function (e) {
    var temp = this.data.tweets
    let postId = e.currentTarget.dataset.postid
    let tweetIndex = e.currentTarget.dataset.tweetindex
    if (temp[this.data.activeIndex][tweetIndex].showComment) {
      temp[this.data.activeIndex][tweetIndex].showComment = false
      this.setData({
        tweets: temp
      })
      return 
    } else {
      we.request({
        url: `${url.domain}/api/posts/${postId}/comments`,
        header:app.globalData.header
      }).then((res) => {
        console.log(res)
        let posts = res.data.posts
        console.log(posts)
        let comments = []
        for (let item of posts) {
          comments.push({
            content: item.comment.content,
            userName: item.post.user.name,
            anonymous: item.post.anonymous
          })
        }
        temp[this.data.activeIndex][tweetIndex].showComment = true
        temp[this.data.activeIndex][tweetIndex].comments = comments
        this.setData({
          tweets: temp
        })
        console.log(comments)
      })
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