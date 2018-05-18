//app.js
import we from './utils/wxPromise/index.js'
const regeneratorRuntime = require('./libs/regenerator-runtime/runtime-module.js')
import url from './utils/url/index.js'
App({
  onLaunch: function() {
  },

  loginInit: async function() {
    var sessionId = wx.getStorageSync('sessionId') || '' 
    if (sessionId) {
      var {statusCode, header:{WX_SESSION_ID: sessionId},data} = await this.login({ WX_SESSION_ID: sessionId })
      this.globalData.sessionId = sessionId
      this.globalData.header.WX_SESSION_ID = sessionId
      this.globalData.user = data
      if (statusCode === 403) {
        let { code } = await we.login()
        var {statusCode, header:{WX_SESSION_ID: sessionId}, data} = await this.login({ WX_CODE: code })
        this.globalData.user = data
        await this.storeSessionId(sessionId)
      }
    } else {
      let { code } = await we.login()
      var {statusCode, header:{WX_SESSION_ID: sessionId}, data} = await this.login({ WX_CODE: code })
      this.globalData.user = data
      await this.storeSessionId(sessionId)
    }
    if (statusCode === 404) {
      we.navigateTo({
        url: '/pages/signUp/signUp'
      })
    }
  },

  onShow:function () {
    if (!this.globalData.user) {
      this.loginInit()
    }
  },

  login: function(header) {
    return we.request({
      url: url.login,
      method: 'POST',
      header: header
    })
  },

  storeSessionId: async function(sessionId) {
    console.log('storeSessionId', sessionId)
    this.globalData.sessionId = sessionId
    this.globalData.header.WX_SESSION_ID = sessionId
    console.log(this.globalData.sessionId)
    we.setStorage({
      key: 'sessionId',
      data: sessionId
    })
    return Promise.resolve()
  },
  globalData: {
    header: {WX_SESSION_ID: null},
    sessionId: null,
    user: null
  }
})
