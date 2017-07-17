//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    foodList:[
      {
        "id":0,
        "src":"http://1img.mgtv.com/preview/sp_images/2017/shenghuo/291200/3768921/20170105162653378.jpg",
        "desc":"旺财蛋糕费南雪"
      },
      {
        "id":1,
        "src":"http://0img.mgtv.com/preview/sp_images/2017/shenghuo/291200/3768925/20170105162125385.jpg",
        "desc":"鸡金银汤上汤西兰花"
      },
      {
        "id":2,
        "src":"http://0img.mgtv.com/preview/sp_images/2017/shenghuo/291200/3768928/20170105161725813.jpg",
        "desc":"嚤嚤喳喳"
      },
       {
        "id":3,
        "src":"http://2img.mgtv.com/preview/sp_images/2017/shenghuo/291200/3768932/20170105161110380.jpg",
        "desc":"咸蛋黄焗南瓜"
      },
       {
        "id":4,
        "src":"http://0img.mgtv.com/preview/sp_images/2017/shenghuo/309467/4013191/20170714153518445.jpg",
        "desc":"蒸制和盐烤蛏子"
      },
       {
        "id":5,
        "src":"http://1img.mgtv.com/preview/sp_images/2017/shenghuo/309467/4013194/20170714152514715.jpg",
        "desc":"水果的Freestyle吃法"
      },
       {
        "id":6,
        "src":"http://0img.mgtv.com/preview/sp_images/2017/shenghuo/309467/4013195/20170714154245327.jpg",
        "desc":"河虾"
      },
       {
        "id":7,
        "src":"http://3img.mgtv.com/preview/sp_images/2017/shenghuo/309467/4013190/20170714151445401.jpg",
        "desc":"红薯的两种洋气吃法"
      },
       {
        "id":8,
        "src":"http://0img.mgtv.com/preview/sp_images/2017/shenghuo/309467/3990142/20170629153952135.jpg",
        "desc":"绿豆糕"
      },
       {
        "id":9,
        "src":"http://2img.mgtv.com/preview/sp_images/2017/shenghuo/309467/3896104/20170411153342124.jpg",
        "desc":"草头圈子"
      }
    ]
  },
  //事件处理函数
  bindViewTap: function(e) {
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../detail/detail?id='+ id
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
  }
})
