var util=require("../../utils/util.js")
var app = getApp()
Page({
  data: {
    nickName:"",
    avatarUrl:"",
    comment:[],
    content:"",
    videoInfo: {},
    hiddenVideo: true,
    userlist:[
      {
        avatarUrl:"../../images/avatar1.jpg",
        nickName:"小可爱",
        time:"3天前",
        desc:"很不错"        
      },
       {
        avatarUrl:"../../images/avatar2.jpg",
        nickName:"我爱吃好吃的",
        time:"1小时前",
        desc:"非常nice，自己跟着做了一遍，也不错，真的很好吃啊"        
      }
    ]
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('item.id')
 },
  videoErrorCallback: function(e) {
  console.log('视频错误信息:')
  console.log(e.detail.errMsg)
 },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    wx.getUserInfo({
   success: function(res) {
    var userInfo = res.userInfo
    var nickName = userInfo.nickName
    var avatarUrl = userInfo.avatarUrl
    that.setData({
      nickName:nickName,
      avatarUrl:avatarUrl
    })
  }
})
    var id=options.id; 
    //调用应用实例的方法获取全局数据
  var api_url='https://www.easy-mock.com/mock/5966410258618039284c745b/list/list';
  console.log(api_url);
  wx.request({
    url: api_url,
    method:'GET',
    success: function(res) {
    var info = res.data.data[id];
       that.setData({
              hidden: true,
              videoInfo: info
            })
    }
  })
  },
bindInput:function(e){
  var that=this;
  var value= e.detail.value;
  console.log(value);
  that.setData({
    content:value
  })
},
issue:function(){
  var that=this ;
  var arr=new Array();
  if(this.data.content===""){
    wx.showModal({
  title: '提示',
  content: '请填写评论',
  success: function(res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
  })
  }else{
  arr.push({
    nickName:this.data.nickName,
    avatarUrl:this.data.avatarUrl,
    time:util.formatTime(new Date()),
    desc:this.data.content
  })
  this.setData({
    comment:this.data.comment.concat(arr),
    content:""
  })
  console.log(this.data.comment)
  console.log(this.data.nickName)
 setTimeout (function(){
  wx.showToast({
    title: '评论成功',
    icon: 'success',
    duration: 2000
  })
},1000)
}
},
handleUpper: function (event) {
    console.log("handleUpper");
  },
handleLower: function (event) {
    console.log("handleLower");
  },
bindButtonTap:function(){
        var that = this;
        wx.chooseVideo({
            sourceType:['album','camera'],
            maxDuration:60,
            camera:['front','back'],
            success:function(res){
                that.setData({
                    src:res.api_url
                })
            }
        })
    },

})