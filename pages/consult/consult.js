// pages/consult/consult.js
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
    psy: [[{
      avatar:'../../resourse/img.png',
      name: '小李子',
      descrption: 'xxx 77x xxxxxxxxx\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }, {
      avatar:'../../../resourse/img.png',
      name: '小李子',
      descrption: 'xxx 77x fdsfs\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }],[
      {
        avatar:'../../resourse/img.png',
        name: '小李子2',
        descrption: 'xxx 77x xxxxxxxxx\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }, {
        avatar:'../../../resourse/img.png',
        name: '小李子2',
        descrption: 'xxx 77x 阿萨德的分手费\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }
    ],[
      {
        avatar:'../../resourse/img.png',
        name: '小李子3',
        descrption: 'xxx 77x xxxxxxxxx\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }, {
        avatar:'../../../resourse/img.png',
        name: '小李子3',
        descrption: 'xxx 77x 规范的股份的规定发给对方\n\r xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
      }
    ]]
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
  toPsy: function () {
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