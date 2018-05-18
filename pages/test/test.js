// pages/test/test.js
import {questions, results} from './questions'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: null,
    questionIndex: 0,
    showResult: false,
    answer: null,
  },
  chooseRadio: false,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      questions: questions,
      results: results
    })
  },

  radioChange: function (e) {
    this.chooseRadio = true
    if (this.data.questionIndex === 11) {
      this.setData({
        answer: e.detail.value,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  preQuestion: function () {
    if (this.data.questionIndex === 0) {
      wx.showModal({
        title:'这是第一题',
        showCancel: false
      })
      return
    } else {
      let Index = this.data.questionIndex - 1
      this.setData({
        questionIndex: Index
      })
      this.chooseRadio = false
    }
  },

  nextQuestion: function () {
    if (!this.chooseRadio) {
      wx.showModal({
        title:'未完成该问题',
        content: '请选择一个选项',
        showCancel: false
      })
      return
    }
    if (this.data.questionIndex === this.data.questions.length - 1) {
      wx.showModal({
        title:'测试完成请查看结果',
        showCancel: false,
        success: (res) => {
          if(res.confirm) {
            this.setData({
              showResult: true
            })
          }
        }
      })
      return
    } else {
      let Index = this.data.questionIndex + 1
      this.setData({
        questionIndex: Index
      })
      this.chooseRadio = false
    }
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