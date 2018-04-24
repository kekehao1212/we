// pages/message/message.js
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
    tweets:[[{
      name:'小李子',
      avator: '../../resourse/img.png',
      tweet: 'xxxxxxx\n\rxxxxxxxx即可观看的介绍顾客的时光iU盾说xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },{
      name:'小李子',
      avator: '../../resourse/img.png',
      tweet: 'xxxxxxx\n\rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },{
      name:'小李子',
      avator: '../../resourse/img.png',
      tweet: 'xxxxxxx\n\rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }],[{
      name:'小李子2',
      avator: '../../resourse/img.png',
      tweet: 'xxxxxxx\n\rxxxxxxxx即可观看的介绍顾客的时光iU盾说xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },{
      name:'小李子2',
      avator: '../../resourse/img.png',
      tweet: 'xxxxxxx\n\rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },{
      name:'小李子2',
      avator: '../../resourse/img.png',
      tweet: 'xxxxxxx\n\rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }],[{
      name:'小李子3',
      avator: '../../resourse/img.png',
      tweet: 'xxxxxxx\n\rxxxxxxxx即可观看的介绍顾客的时光iU盾说xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },{
      name:'小李子3',
      avator: '../../resourse/img.png',
      tweet: 'xxxxxxx\n\rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },{
      name:'小李子3',
      avator: '../../resourse/img.png',
      tweet: 'xxxxxxx\n\rxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }]]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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