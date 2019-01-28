//index.js
const app = getApp()

let plugin = requirePlugin("myPlugin")
//let routeInfo = app.globalData.routeInfo;
let routeInfo = {
    startLat: 23.12463,    //起点纬度 选填
    startLng: 113.36199,    //起点经度 选填
    startName: "广州市天河区政府",   // 起点名称 选填
    endLat: 23.12247,    // 终点纬度必传
    endLng :113.36148,  //终点经度 必传
    endName:"广东省广州市天河区黄埔大道南员村二横路口",  //终点名称 必传
    mode:"car"  //算路方式 选填
}

Page({
  data: {
    routeInfo: routeInfo,
    us_id:''
  },
  onLoad: function(options) {
 /* console.log('111111111111111111111111111111111111111111111111111111111')
  console.log(app.globalData.routeInfo);
  console.log('111111111111111111111111111111111111111111111111111111111')*/
  this.setData({
    routeInfo:app.globalData.routeInfo
  })
  }
})

