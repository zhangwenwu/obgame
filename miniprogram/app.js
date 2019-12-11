//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      routeInfo: {
          startLat: '',    //起点纬度 选填
          startLng: '',    //起点经度 选填
          startName: '',   // 起点名称 选填
          endLat: '',    // 终点纬度必传
          endLng :'',  //终点经度 必传
          endName:'',  //终点名称 必传
          mode:'walking'//算路方式 选填驾车（car），公交（bus），步行（walk）
      }
    }
  }
})
