// miniprogram/pages/login/login.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           this.
    //           wx.navigateTo({
    //             url: '/pages/index/index'
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },

  bindGetUserInfo(e) {
    if (e.detail.rawData) {
      console.log("onGetUserInfo", e.detail)
      wx.setStorageSync("userInfo", e.detail.rawData)
      wx.navigateTo({
        url: '/pages/index/index'
      })
    }
  }


})