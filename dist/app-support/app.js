/*
录音
https://github.com/xiangyuecn/Recorder
src: app-support/app.js,app-support/app-ios-weixin-support.js,app-support/app-native-support.js
*/
!function(e){"use strict";var t=/MicroMessenger/i.test(navigator.userAgent),n=e.RecordAppBaseFolder||"/Recorder/dist/",o=e.OnRecordAppInstalled,u=[{Key:"Native",Support:function(n){m.AlwaysAppUseJS?n(!1):r.Config.IsApp(n)},CanProcess:function(){return!0},Config:{IsApp:function(n){n(!1)},JsBridgeRequestPermission:function(n,e){e("JsBridgeRequestPermission未实现")},JsBridgeStart:function(n,e,t){t("JsBridgeStart未实现")},JsBridgeStop:function(n,e){e("JsBridgeStop未实现")},paths:[{url:n+"app-support/app-native-support.js",check:function(){return!r.IsInit}}]},ExtendDefault:!0},{Key:"IOS-Weixin",Support:function(n){m.AlwaysUseWeixinJS||!Recorder.Support()?n(t):n(!1)},CanProcess:function(){return!1},Config:{WxReady:function(n){n(null,"未实现IOS-Weixin.Config.WxReady")},DownWxMedia:function(n,e,t){t("下载素材接口DownWxMedia未实现")},paths:[{url:n+"app-support/app-ios-weixin-support.js",check:function(){return!s.IsInit}},{url:n+"engine/beta-amr.js",lazyBeforeStop:1,check:function(){return!Recorder.prototype.amr}}]},ExtendDefault:!0},{Key:"Default",Support:function(n){n(!0)},CanProcess:function(){return!0},Config:{paths:[{url:n+"recorder-core.js",check:function(){return!e.Recorder}},{url:n+"engine/mp3.js",lazyBeforeStart:1,check:function(){return!Recorder.prototype.mp3}}]}}],r=u[0],s=u[1],v=u[2];v.RequestPermission=function(n,e){var t=m.__Rec;t&&(t.close(),m.__Rec=null);var o=Recorder();o.open(function(){n()},e)},v.Start=function(n,e,t){var o=m.__Rec;null!=o&&o.close(),m.__Rec=o=Recorder(n),o.appSet=n,o.open(function(){o.start(),e()},function(n){t(n)})},v.Stop=function(t,e){var o=m.__Rec;if(!o)return Recorder.IsOpen()&&((o=Recorder()).open(),o.close()),void e("未开始录音");var r=function(){for(var n in o.close(),o.set)o.appSet[n]=o.set[n]},n=function(n){r(),e(n),m.__Rec=null};t?o.stop(function(n,e){r(),t(n,e),m.__Rec=null},n):n("仅清理资源")};var m={LM:"2020-1-28 04:38:58",Current:0,IsWx:t,BaseFolder:n,UseLazyLoad:!0,AlwaysUseWeixinJS:!1,AlwaysAppUseJS:!1,Platforms:{Native:r,Weixin:s,Default:v},Js:function(r,s,i,n){var a=(n=n||e).document,c=function(n){if(n>=r.length)s();else{var e=r[n],t=e.url;if(!1!==e.check()){var o=a.createElement("script");o.setAttribute("type","text/javascript"),o.setAttribute("src",t),o.onload=function(){c(n+1)},o.onerror=function(n){i("请求失败:"+(n.message||"-")+"，"+t)},a.body.appendChild(o)}else c(n+1)}};c(0)},Install:function(t,o){var r=m.__reqs||(m.__reqs=[]);r.push({s:t,f:o}),t=function(){s("s",arguments)},o=function(n,e){s("f",arguments)};var s=function(n,e){for(var t=0;t<r.length;t++)r[t][n].apply(null,e);r.length=0};if(!(1<r.length)){var p=function(n,e,t){for(var o,r=n.Config,s=r.paths,i=[],a=0;a<s.length;a++)o=s[a],m.UseLazyLoad?o.lazyBeforeStart?e&&e.push(o):o.lazyBeforeStop?t&&t.push(o):i.push(o):i.push(o);return i},i=0,a=function(e,n){if(e.IsInit)n();else{var t=p(e);console.log("Install "+e.Key+"...",t),m.Js(t,function(){e.IsInit=!0,n()},function(n){n="初始化js库失败："+n,console.log(n,e),o(n)})}},d=function(t,o){var n=[],e=[];p(t,n,e),t.ExtendDefault&&p(v,n,e);var r=t.LazyReady;r||(r=t.LazyReady={fsta:[],fsto:[],fall:[],usta:0,usto:0,msta:"",msto:""},t.LazyAtStart=function(n){s()?n(r.msta):r.fsta.push(n)},t.LazyAtStop=function(n){i()?n(r.msto):r.fsto.push(n)},t.OnLazyReady=function(n){s()&&i()?n(r.msta||r.msto):r.fall.push(n)});var s=function(){return 1==r.usta||3==r.usta},i=function(){return 1==r.usto||3==r.usto},a=o?"usta":"usto",c=o?"msta":"msto",u=o?"fsta":"fsto",l=function(n){n&&console.log("Lazy Load:"+a);var e=function(n,e){var t=r[n];r[n]=[];for(var o=0;o<t.length;o++)t[o](e)};2!=r[a]&&e(u,r[c]),s()&&i()&&e("fall",r.msta||r.msto),o&&d(t)};if(r[a]<2){r[c]="",r[a]=2;var f=o?n:e;console.log("Lazy Load..."+a,f),m.Js(f,function(){r[a]=3,l(1)},function(n){n="加载js库失败["+a+"]："+n,console.log(n,t),r[a]=1,r[c]=n,l(1)})}else l()},c=function(e){if(e)d(e,1),console.log("Install Success"),m.Current=e,t();else{var n=function(){e.Support(function(n){n?a(e,function(){c(e)}):(i++,c())})};(e=u[i]).ExtendDefault?a(v,n):n()}};c(m.Current)}},GetStartUsedRecOrNull:function(){return m.__Rec||null},RequestPermission:function(e,t){m.Install(function(){var n=m.Current;console.log("开始请求"+n.Key+"录音权限"),n.RequestPermission(function(){console.log("录音权限请求成功"),e&&e()},function(n,e){console.log("录音权限请求失败："+n+",isUserNotAllow:"+e),t&&t(n,e)})},function(n){console.log("Install失败",n),t&&t(n)})},Start:function(t,o,r){var s=m.Current;if(s){t||(t={});var n={type:"mp3",sampleRate:16e3,bitRate:16,onProcess:function(){}};for(var e in n)t[e]||(t[e]=n[e]);var i=0;s.LazyAtStart(function(n){i&&console.warn("Start Wait Ready "+(Date.now()-i)+"ms"),i=1;var e=function(n){console.log("开始录音失败："+n),r&&r(n)};n?e(n):s.Start(t,function(){console.log("开始录音",t),o&&o()},e)}),i||console.warn("Start Wait Ready..."),i=Date.now()}else r&&r("需先调用RequestPermission")},Stop:function(t,o){var r=m.Current;if(r){var s=0;r.LazyAtStop(function(n){s&&console.warn("Stop Wait Ready "+(Date.now()-s)+"ms"),s=1;var e=function(n){console.log("结束录音失败："+n),o&&o(n)};n?e(n):r.Stop(t?function(n,e){console.log("结束录音"+n.size+"b "+e+"ms",n),t(n,e)}:null,e)}),s||console.warn("Stop Wait Ready..."),s=Date.now()}else o&&o("需先调用RequestPermission")}};e.RecordApp=m,o&&o()}(window),"function"==typeof define&&define.amd&&define(function(){return RecordApp}),"object"==typeof module&&module.exports&&(module.exports=RecordApp),function(){"use strict";var s=RecordApp.Platforms.Weixin,R=s.Config;s.IsInit=!0;var i,a,c={};s.RequestPermission=function(t,o){R.WxReady(function(n,e){c.wx=null,e?o("微信JsSDK准备失败："+e):(c.wx=n,a?u(function(){s.RequestPermission(t,o)}):n.startRecord({success:function(){setTimeout(function(){g(function(n){!n||/short/i.test(n)?t():o("清理资源出错："+n)})},100)},fail:function(n){o("无法录音："+n.errMsg)},cancel:function(n){o("用户不允许录音："+n.errMsg,!0)}}))})};var g=function(e){i=a=0,c.wx.stopRecord({success:function(){e&&e()},fail:function(n){e&&e("无法结束录音："+n.errMsg)}})},u=function(n){console.warn("录音中，正在kill重试"),g(function(){setTimeout(n,300)})},h=function(n){console.log("["+Date.now()+"]"+n)};s.Start=function(n,e,t){var o=c.wx;if(o)if(a)u(function(){s.Start(n,e,t)});else{if(i)return console.log("等待上次wx.startRecord回调后重试"),void setTimeout(function(){s.Start(n,e,t)},600);a=0,i=1;var r=function(n){i=0,t("无法录音："+n.errMsg),g()};o.startRecord({success:function(){a=1,i=0,c.startTime=Date.now(),c.start=n,h("已开始录音"),e()},fail:r,cancel:r}),c.chunks=[],c.chunkErr="",c.stopJoinEnd=null,o.onVoiceRecordEnd({complete:function(n){var e=Date.now();c.stopJoinEnd?c.stopJoinEnd(n,"chunk"):n.localId&&c.chunks?c.chunks.push({res:n,duration:e-c.startTime,time:e,from:"chunk"}):console.error("已忽略chunk数据",n),h("微信录音超时，正在重启..."),a?o.startRecord({success:function(){c.startTime=Date.now(),console.log("已接续录音,中断"+(Date.now()-e)+"ms")},fail:function(n){var e="无法接续录音："+n.errMsg;console.error(e,n),c.chunkErr=e}}):console.error("已停止录音，拒绝重启")}})}else t("请先调用RequestPermission")},s.Stop=function(f,e){a=0,h("开始停止录音");var p=function(n){e("录音失败："+(n.errMsg||n))},d=c.start;if(d){c.start=null;var v={list:[]};d.DownWxMediaData=v;var u=function(){var r=v.list,n=r[0];if(n.duration){for(var e=atob(n.data),t=e.length,o=new Uint8Array(t);t--;)o[t]=e.charCodeAt(t);var s=new Blob([o.buffer],{type:n.mime});f(s,n.duration)}else{var i=[],a=0,c=0,u=0,l=function(){if(u||(u=Date.now()),c>=r.length)return v.decodeTime=Date.now()-u,void function(){a||(a=Date.now());for(var n=[],e=0;e<i.length;e++)for(var t=i[e],o=0;o<t.length;o++)n.push(t[o]);var r=Recorder(d).mock(n,8e3);r.stop(function(n,e){for(var t in v.encodeTime=Date.now()-a,r.set)d[t]=r.set[t];f(n,e)},p)}();var n=r[c];n.duration=m[c].duration,n.isAmr=!0;for(var e=atob(n.data),t=e.length,o=new Uint8Array(t);t--;)o[t]=e.charCodeAt(t);Recorder.AMR.decode(o,function(n){i.push(n),c++,l()},function(n){p("AMR音频"+(c+1)+"无法解码:"+n)})};Recorder.AMR?l():p("未加载AMR转换引擎")}},l=[],o=function(){if(f){for(var e=[],n=0;n<m.length;n++)e.push(m[n].res.localId);h("结束录音共"+e.length+"段，开始上传下载"),console.log(e,m);var t=0,o=0,r=function(){v.downTime=Date.now()-o,u()},s=function(){if(o||(o=Date.now()),t>=l.length)r();else{var n=l[t];R.DownWxMedia({mediaId:n,transform_mediaIds:l.join(","),transform_type:d.type,transform_bitRate:d.bitRate,transform_sampleRate:d.sampleRate},function(n){v.list.push(n),n.duration?r():/amr/i.test(n.mime)?(t++,s()):p("微信服务器返回了未知音频类型："+n.mime)},function(n){p("下载音频失败："+n)})}},i=0,a=function(){if(i>=e.length)return v.uploadTime=Date.now()-c,void s();var n=e[i];console.log("微信录音片段"+i+" wx.playVoice({localId:'"+n+"'})"),wx.uploadVoice({localId:n,isShowProgressTips:0,fail:p,success:function(n){var e=n.serverId;console.log("serverId:"+e),l.push(e),i++,a()}})},c=Date.now();a()}else p("仅清理资源")},m=c.chunks;if(c.chunkErr)return console.error(c.chunkErr,m),void p("录制失败，已录制"+m.length+"分钟，但后面出错："+c.chunkErr);if(m.length&&Date.now()-m[m.length-1].time<900)return console.error("丢弃结尾未停止太短录音"),g(),void o();c.stopJoinEnd=function(n,e){c.stopJoinEnd=null;var t=Date.now();n.localId?m.push({res:n,duration:t-c.startTime,time:t,from:e}):console.error("已忽略"+e+"数据",n),c.chunks=null,o()},c.wx.stopRecord({fail:p,success:function(n){c.stopJoinEnd&&c.stopJoinEnd(n,"stop")}})}else p("未开始录音")}}(),function(){"use strict";var s=RecordApp,n=s.Platforms.Native,i=n.Config;n.IsInit=!0;var l=window.NativeRecordReceivePCM=window.top.NativeRecordReceivePCM=function(n,e){var t=l.rec;if(t){t._appStart||t.envStart(1,e),t._appStart=1;for(var o,r=atob(n),s=r.length,i=new Int16Array(s/2),a=0,c=0,u=0;u+2<=s;c++,u+=2)o=(r.charCodeAt(u)|r.charCodeAt(u+1)<<8)<<16>>16,i[c]=o,a+=Math.abs(o);t.envIn(i,a)}else console.error("未开始录音，但收到Native PCM数据")};n.RequestPermission=function(n,e){i.JsBridgeRequestPermission(n,e)},n.Start=function(n,e,t){l.param=n;var o=Recorder(n);o.set.disableEnvInFix=!0,l.rec=o,s.__Rec=o,i.JsBridgeStart(n,e,t)},n.Stop=function(o,e){var r=function(n){e(n),l.rec=null,s.__Rec=null};i.JsBridgeStop(function(){var e=l.rec;if(l.rec=null,e){console.log("rec encode start: pcm:"+e.recSize+" src:"+e.srcSampleRate+" set:"+JSON.stringify(l.param));var t=function(){for(var n in e.set)l.param[n]=e.set[n]};if(!o)return t(),void r("仅清理资源");e.stop(function(n,e){console.log("rec encode end"),t(),o(n,e),s.__Rec=null},function(n){t(),r(n)})}else r("未开始录音")},r)}}();