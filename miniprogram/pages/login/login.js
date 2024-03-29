// miniprogram/pages/login/login.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('userInfo') != ""){
      wx.showToast({
        title: '正在登录...',
        icon: 'loading'
      })
      app.globalData.userInfo = wx.getStorageSync('userInfo');
      setTimeout( () => {
        wx.navigateTo({
          url: '/pages/index/index'
        })
      }, 1500);
     }else{
      this.setData({
        canIUse: true,
      }) 
     }
     let _this = this
    //  wx.getSetting({
    //    success(res) {
    //      if (res.authSetting['scope.userInfo']) {
    //        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //        wx.getUserInfo({
    //          success: function (res) {
    //           _this.setData({
    //             canIUse: false,
    //           })
    //            wx.navigateTo({
    //              url: '/pages/index/index'
    //            })
    //          }
    //        })
    //      }else{
    //         console.log("未授权")
    //         _this.setData({
    //           canIUse: true,
    //         })
    //       }
    //    }
    //  })
  },

  bindGetUserInfo(e) {
    if (e.detail.rawData) {
      console.log("onGetUserInfo", e.detail)
      wx.setStorageSync("userInfo", JSON.parse(e.detail.rawData))
      this.setData({
        canIUse: false,
      })
      wx.navigateTo({
      url: '/pages/index/index'
      })
    }
  }


})