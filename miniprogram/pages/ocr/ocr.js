//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    start_input:'',
    end_input:'',
    go_type:'步行',
    is_go:false
  },
  onShareAppMessage: function () {

    return {
      title: '分享分享',
      desc: '分享页面的内容分享页面的内容',
      imageUrl:'http://b302.photo.store.qq.com/psb?/V11GHIAy02wo8S/lwmNpw.NPQ3rqzD8wLxQFOvLGO01mIgk3uJgPuInXds!/b/YYA.DLRFgAAAYgFHDLTtHwAA&bo=RAG6AAAAAAABBNw!&rf=viewer_4',
      path: '../ocr/ocr?id=1', // 路径，传递参数到指定页面。

    }

  },
 
  onLoad: function() {

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(res);
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
  
    /*wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })*/
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res);
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  //获取起始位置
  startLocation:function(e){
     wx.chooseLocation({
        success: res => {
          console.log(res);          
          this.setData({
            start_input: res.name,
          })
          app.globalData.routeInfo.startLat = res.latitude;
          app.globalData.routeInfo.startLng = res.longitude;
          app.globalData.routeInfo.startName = res.address;
        }
     })
  },
  //获取终点位置
  endLocation:function(e){
     wx.chooseLocation({
        success: res => {
          console.log(res);          
          this.setData({
            end_input: res.name+'-('+res.address+')',
          })
          app.globalData.routeInfo.endLat = res.latitude;
          app.globalData.routeInfo.endLng = res.longitude;
          app.globalData.routeInfo.endName = res.address;
        }
     })
  },
  //出行方式
  go_type: function(){
   var _this = this;
    wx.showActionSheet({
      title: '选择出行方式',
      itemList: ['步行', '骑行','驾车'],
      success(res) {
        switch(res.tapIndex)
        {
        case 0:
          app.globalData.routeInfo.mode = 'walking';
          _this.setData({
            go_type: '步行'
          })
          break;
        case 1:
          app.globalData.routeInfo.mode = 'bicycling';
          _this.setData({
            go_type: '骑行'
          })
          break;
        case 2:
          app.globalData.routeInfo.mode = 'driving';
          _this.setData({
            go_type: '驾车'
          })
          break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  go_but: function(){
    wx.navigateTo({
        url: '../qqmap/qqmap?id=1'
      })
  },
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
      // 调用云函数
      wx.cloud.callFunction({
              name: 'sum',
              data: {
                a:'2', b:'3'
              },
              success: res => {
              console.log(res.result);

      },
          fail: err => {
              console.error('[云函数] [login] 调用失败', err)
              wx.navigateTo({
                  url: '../deployFunctions/deployFunctions',
              })
          }
      })
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },



})
