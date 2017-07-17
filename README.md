# wechat-todayFood
微信小程序仿今日美食food

初学微信小程序，嗯，还不错嘛，挺有趣的！ 于是自己动手撸了一个😜。你别说一看标题就知道我是吃货呀，我是不想这么快就被揭穿的，但是这个小程序就是这么有意思呀。好了我要进入正题了，我们一起去看看我的demo吧。
## 开发工具：
1. 下载开发者工具：[微信小程序官网](https://mp.weixin.qq.com/debug/wxadoc/dev/)，下载好后就可以进行开发了哟。如果你想要发布你的小程序的话呢，就要在创建小程序的时候获取AppId,可以去https://mp.weixin.qq.com 这里了解详情获取;
2. 开发文档：[微信小程序宝典秘籍](https://www.w3cschool.cn/weixinapp/9wou1q8j.html)，这个是开发小程序的宝典，里面包括了各种组件，API,框架and so on...　<br>
3.　Easy Mork： [easy-mock](www.easy-mock.com),通过它能快速生成模拟数据的服务，它能为我们提供一个数据接口url，然后使用wx.request({ url: url, .....})来发送数据请求，我的数据大部分都是通过Mork模拟的；

## 创建小程序后：
会自动生成一些基本文件： <br>
  *  page文件夹, 页面文件夹 包含你所有的页面文件,至少包含.js .wxml .wxs后缀文件，.json可选
  *  utlis文件夹 ,放置一些全局需要使用的js文件
  *  app.js 控制全局的逻辑结构
  *  app.json 配置一些全局数据，所有页面都要在此处注册
  *  app.wxml 内容结构
  *  app.wxss 全局样式

## 页面注册：
```
  "pages":[
    "pages/index/index",
    "pages/detail/detail"
  ],
```
## 效果预览：
  ![整体预览](https://github.com/carolineLH/wechat-todayFood/blob/master/todayfood/images/GIF.gif) <br>
  
## 项目功能：
   * 首页插入一组图片，并实现跳转　<br>
   * scroll-view的使用，可滚动视图区域生成　<br>
   * 视频播放，video组件使用　<br>
   * 发表评论　<br>
   * 评论显示　<br>
   * 获取数据及交互反馈　<br>
   * 获取用户信息　<br>
   * 动态获取评论时间　<br> 
   * 利用mock 传数据　<br>
   
## 具体功能解析
### 1. 插入一组图片，并实现跳转　<br>
   因为是要插入一组图片，所以我们可以用wx:for={{}}来实现 <br>
   HTML结构
   ```
   <view wx:for="{{foodList}}" wx:key="item" bindtap="bindViewTap" id="{{item.id}}" class="list">
  　<view class="image">
    <image src="{{item.src}}"/>
  　</view>
   ```
  js配置 <br>
  我是在这里插入了图片的地址信息，在data数组里面<br>
  ```
  //事件处理函数
  bindViewTap: function(e) {
    console.log(e.currentTarget.id)
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../detail/detail?id='+ id
    })
  　},
 ```
### ２.　scroll-view的使用，可滚动视图区域生成<br>
在需要设置滚动区域，用scroll-view标签把内容包住<br>
HTML结构
```
<scroll-view class="scroll-user" style="height:{{windowHeight}}px" scroll-y="true" bindscrolltolower="handleLower" bindscrolltoupper="handleUpper">
    <view class="box">
            <text  class="text1">{{videoInfo.title}}</text>
            <text class="text2">{{videoInfo.number}}</text>
            <text  class="text3">{{videoInfo.time}}</text>
            <text  class="text4">{{videoInfo.desc}}</text>   
    </view>
<view class="comment" wx:for="{{userlist}}">
          <view class="userInfo">
            <view class="userinfo-top"> 
            <image class="userinfo-avatar" src="{{item.avatarUrl}}" background-size="cover"></image>
            <text class="userinfo-nickname">{{item.nickName}}</text>
            <text class="text4">{{item.time}}</text>
            </view>
            <text class="con">{{item.desc}}</text>
            <div class="clear"></div>
          </view>      
</view> 
<view class="comment" wx:for="{{comment}}">
          <view class="userInfo">
            <view class="userinfo-top"> 
            <image class="userinfo-avatar" src="{{item.avatarUrl}}" background-size="cover"></image>
            <text class="userinfo-nickname">{{item.nickName}}</text>
            <text class="text4">{{item.time}}</text>
            </view>
            <text class="con">{{item.desc}}</text>
          </view>      
</view>
</scroll-view>
```
js配置 <br>
```
handleUpper: function (event) {
    console.log("handleUpper");
  },handleLower: function (event) {

console.log("handleLower");
  },
```
### ３.　视频播放，video组件使用（这是我踩过的坑！）
HTML结构
```
<view class="video">
            <video src="{{videoInfo.src}}" crossOrigin="anonymous"autoplay controls/>
              <button bindtap="bindButtonTap"></button>
</view> 
<view class="video">
       <video id="item.id" src=""  controls binderror="videoErrorCallback" hidden="{{hiddenVideo}}"></video>
       <button bindtap="bindButtonTap"></button>
</view>
```
js配置 <br>
在 data中写入videoInfo: {}， hiddenVideo: true,
```
    onReady: function (res) {
    this.videoContext = wx.createVideoContext('item.id')
 },
  videoErrorCallback: function(e) {
  console.log('视频错误信息:')
  console.log(e.detail.errMsg)
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
```
### ４.　发表评论（最大的坑！）　<br>　
包括 ：<br>
   * 获取数据及交互反馈　<br>
   * 获取用户信息　<br>
   * 动态获取评论时间　<br> 
HTML结构　<br>
```
<view class="inputtext">   
        <input type="text" name="com" class="text"bindinput="bindInput" value="{{content}}" placeholder="我来说两句" />
        <button type="submit"  bindtap="issue"  class="btn">发布</button>
     </view>
</view>
```
js配置 <br>
输入评论及获取其信息：
```
comment:[],
bindInput:function(e){
  var that=this;
  var value= e.detail.value;
  console.log(value);
  that.setData({
    content:value
  })
},
```
获取数据及交互反馈：
```
content:"",
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
```
动态获取评论时间　<br>
在util.js中　<br>
```
module.exports = {
  formatTime: formatTime
}
```
### ５.　获取用户信息：
HTML结构
``` 
<view class="userInfo">
     <view class="userinfo-top"> 
     <image class="userinfo-avatar" src="{{item.avatarUrl}}" background-size="cover"></image>
     <text class="userinfo-nickname">{{item.nickName}}</text>
     <text class="text4">{{item.time}}</text>
     </view>
     <text class="con">{{item.desc}}</text>
</view>   
``` 
js结构
``` 
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
```
### ６.　用ｍｏｃｋ传递数据
```
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
```
## 坑．．．　<br>
１．由第一个页面中传递过来的数据不在是一个数组，而是一个对象，得到其id就得到其内容。<br>
２．发表评论的时候要对输入的评论内容进行判断，加入评论信息时可以把已有的评论信息和实时加入的评论信息当成两个数组，利用ｐｕｓｈ（）方法把评论内容加　入，再利用concat()方法把两个数组连接起来。<br>
３.就是去看文档啊，看文档！<br>
  
## 项目地址：
https://github.com/carolineLH/wechat-todayFood
  
对了，视频可能不太好放出来，有时候要看缘分，因为视频本身权限原因，我也好难过啊😭
  
嘻嘻，如果您觉得还不错的话，可以给个star哟，谢谢。
  
 






   


