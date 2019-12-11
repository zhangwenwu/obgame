//index.js
const app = getApp()

// 引入SDK核心类
var QQMapWX = require('qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'OZBBZ-T63WX-CCE4A-ZZK5M-GAW4H-YHBG4' // 必填
});
Page({
    data: {
      polyline: [],
      planning:[],
      startLat:'',
      startLng:''
    },
    onLoad: function() {
      var plan =  app.globalData.routeInfo;
      this.setData({ 
        startLat:plan.startLat,
        startLng:plan.startLng
      })
      var _this = this;
      var _url;
      switch(app.globalData.routeInfo.mode)
        {
        case 'transit':
          _url = 'https://apis.map.qq.com/ws/direction/v1/transit/?from='+plan.startLat+','+plan.startLng+'&to='+plan.endLat+','+plan.endLng+'&policy=LEAST_TIME&output=jsonp&callback=callback_function&key=OZBBZ-T63WX-CCE4A-ZZK5M-GAW4H-YHBG4';
          break;
        case 'walking':
           _url = 'https://apis.map.qq.com/ws/direction/v1/walking/?from='+plan.startLat+','+plan.startLng+'&to='+plan.endLat+','+plan.endLng+'&key=OZBBZ-T63WX-CCE4A-ZZK5M-GAW4H-YHBG4';
          break;
        case 'bicycling':
          _url = 'https://apis.map.qq.com/ws/direction/v1/bicycling/?from='+plan.startLat+','+plan.startLng+'&to='+plan.endLat+','+plan.endLng+'&key=OZBBZ-T63WX-CCE4A-ZZK5M-GAW4H-YHBG4';
          break;
        case 'driving':
           _url = 'https://apis.map.qq.com/ws/direction/v1/driving/?from='+plan.startLat+','+plan.startLng+'&to='+plan.endLat+','+plan.endLng+'&waypoints='+plan.startLat+','+plan.startLng+';'+plan.endLat+','+plan.endLng+'&output=json&callback=cb&key=OZBBZ-T63WX-CCE4A-ZZK5M-GAW4H-YHBG4';
          break;
        }
       wx.request({
          url:_url,
          method:'GET',
          dataType:'json',
          //请求成功回调
          success:function(res){
            var ret=res.data
            if(ret.status!=0)return; //服务异常处理
            var coors = ret.result.routes[0].polyline,pl=[];
            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
            var kr = 1000000;
            for (var i = 2; i < coors.length; i++) {
                coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            //将解压后的坐标放入点串数组pl中
            for (var i = 0; i < coors.length;i+=2){
              pl.push({ latitude: coors[i], longitude:coors[i+1]})
            }
            //设置polyline属性，将路线显示出来
            _this.setData({ 
              polyline:[{
                points:pl,
                color: '#FF0000DD',
                width:2
              }],
              planning:ret.result.routes[0].steps
            })
          }
            
       });
    },
    //事件回调函数
    driving:function(){
        var _this = this;
        var plan =  app.globalData.routeInfo;
        //网络请求设置
        var opt={
          //WebService请求地址，from为起点坐标，to为终点坐标，开发key为必填
          url:'https://apis.map.qq.com/ws/direction/v1/driving/?from='+plan.startLat+','+plan.startLng+'&to='+plan.endLat+','+plan.endLng+'&waypoints='+plan.startLat+','+plan.startLng+';'+plan.endLat+','+plan.endLng+'&output=json&callback=cb&key=OZBBZ-T63WX-CCE4A-ZZK5M-GAW4H-YHBG4',
          method:'GET',
          dataType:'json',
          //请求成功回调
          success:function(res){
            var ret=res.data
            if(ret.status!=0)return; //服务异常处理
            var coors = ret.result.routes[0].polyline,pl=[];
            //坐标解压（返回的点串坐标，通过前向差分进行压缩）
            var kr = 1000000;
            for (var i = 2; i < coors.length; i++) {
                coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            //将解压后的坐标放入点串数组pl中
            for (var i = 0; i < coors.length;i+=2){
              pl.push({ latitude: coors[i], longitude:coors[i+1]})
            }
            //设置polyline属性，将路线显示出来
            _this.setData({ 
              polyline:[{
                points:pl,
                color: '#FF0000DD',
                width:2
              }],
              planning:ret.result.routes[0].steps
            })
          }
        };
        wx.request(opt);
    }
})

