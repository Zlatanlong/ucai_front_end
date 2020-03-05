webpackJsonp([23],{GvEz:function(t,e){},KzEK:function(t,e,n){"use strict";var a=n("olkN"),o={name:"dish-card",props:{dish:{type:Object,default:null},showDetail:{type:Boolean,default:!0}},data:function(){return{sharedState:a.a.state}},methods:{goto:function(t){this.$router.push("/dish/"+t),this.$emit("goto")}}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{on:{click:function(e){t.goto(t.dish.id)}}},[n("Card",{staticClass:"dish-card"},[n("div",{staticClass:"img-box"},[t.sharedState.ifShowImg?n("img",{staticClass:"img",attrs:{src:null===t.dish.imgUrl?"":t.dish.imgUrl}}):t._e()]),n("h3",[t._v(t._s(t.dish.name))]),t.showDetail?n("div",[n("p",[n("span",[t._v("餐厅："+t._s(t.dish.restaurantName))]),n("span",{staticStyle:{float:"right"}},[t._v("¥ "+t._s(t.dish.price)),n("Icon",{attrs:{type:"ios-pricetag-outline"}})],1)]),n("p",[n("span",[t._v("总评： "+t._s(0===t.dish.evaluationTimes?"暂无":parseFloat(t.dish.totalScore.toFixed(1))))]),n("span",{staticStyle:{float:"right"}},[n("svg",{staticClass:"icon icon-zan",staticStyle:{width:"16px",height:"16px"},attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-zan"}})]),t._v("("+t._s(t.dish.likesCount)+")")])])]):t._e()])],1)},staticRenderFns:[]};var i=n("VU/8")(o,s,!1,function(t){n("MT9f")},null,null);e.a=i.exports},MT9f:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"footer"},[e("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center"}},[e("Col",{attrs:{xs:20,sm:16,md:12,lg:8}},[e("Row",{attrs:{type:"flex",justify:"center"}},[this._v("\n        联系客服 • 关于U菜 • 关于我们 • 特别鸣谢\n      ")]),this._v(" "),e("Row",{attrs:{type:"flex",justify:"center"}},[this._v("\n        鲁ICP备18033953号 • "),e("a",{attrs:{href:"http://www.miitbeian.gov.cn",target:"_blank"}},[this._v("工信部首页")]),this._v(" • ALL RIGHTS RESERVED\n      ")]),this._v(" "),e("Row",{attrs:{type:"flex",justify:"center"}},[this._v("\n        UPCTX.CN © 2017-2018\n      ")])],1)],1)],1)},staticRenderFns:[]};var s=n("VU/8")({name:"footer-main"},o,!1,function(t){n("cRC3")},"data-v-50b29318",null).exports,i=n("olkN"),r={components:{MySearchComponent:n("aQXz").a},data:function(){return{theme1:"light",sharedState:i.a.state,showDrawer:!1,ifShowImg:!0,ifShowRecommend:!0}},methods:{goTo:function(t){"3-4"===t?(this.logOut(),this.$router.push("/")):"3-5"===t?this.$router.push("/login"):"3-6"===t?this.$router.push("/register"):"3-1"===t?this.$router.push("/user/"+this.sharedState.user.id+"/info"):"3-7"===t?this.$router.push("/user/"+this.sharedState.user.id+"/notice"):"4"===t&&this.$router.push("/restaurants"),this.showDrawer=!1},logOut:function(){var t=this;this.$http.get("/login/out/user").then(function(e){0===e.data.code&&(i.a.clearIfLoginAction(),t.$Message.success("注销成功！"))})},switchChange:function(t){i.a.setIfShowImg(t)},switchRecommend:function(t){i.a.setIfShowRecommend(t)}},created:function(){this.ifShowImg=this.sharedState.ifShowImg,this.ifShowRecommend=this.sharedState.ifShowRecommend}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nav-main"},[n("Menu",{staticClass:"nav-nav",attrs:{mode:"horizontal",theme:t.theme1,"active-name":"1"},on:{"on-select":t.goTo}},[n("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"space-between",align:"middle"}},[n("Col",{attrs:{span:"2"}},[n("MenuItem",{staticStyle:{"font-size":"20px"},attrs:{name:"4",to:"/"}},[n("svg",{staticClass:"icon icon-longxia",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-longxia"}})]),t._v("优菜")])],1),n("Col",{attrs:{span:"2"}},[n("i-switch",{attrs:{size:"large"},on:{"on-change":t.switchChange},model:{value:t.ifShowImg,callback:function(e){t.ifShowImg=e},expression:"ifShowImg"}},[n("span",{attrs:{slot:"open"},slot:"open"},[t._v("多图")]),n("span",{attrs:{slot:"close"},slot:"close"},[t._v("省流")])])],1),n("Col",{attrs:{span:"3"}},[n("span",[t._v("智能推荐")]),n("i-switch",{attrs:{size:"large"},on:{"on-change":t.switchRecommend},model:{value:t.ifShowRecommend,callback:function(e){t.ifShowRecommend=e},expression:"ifShowRecommend"}},[n("span",{attrs:{slot:"open"},slot:"open"},[t._v("开启")]),n("span",{attrs:{slot:"close"},slot:"close"},[t._v("关闭")])])],1),n("Col",{attrs:{span:"6",offset:"0"}},[n("MySearchComponent")],1),n("Col",{staticClass:"nav-right",attrs:{span:"9",offset:"0"}},[n("div",{staticStyle:{float:"right"}},[n("MenuItem",{staticStyle:{"font-size":"20px"},attrs:{name:"1",to:"/"}},[n("svg",{staticClass:"icon icon-shouye",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-shouye"}})]),t._v("主页")]),n("MenuItem",{staticStyle:{"font-size":"20px"},attrs:{name:"4",to:"/restaurants"}},[n("svg",{staticClass:"icon icon-canting",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-canting"}})]),t._v("餐厅")]),n("MenuItem",{staticStyle:{"font-size":"20px"},attrs:{name:"2",to:"/dishes"}},[n("svg",{staticClass:"icon icon-guo",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#icon-guo"}})]),t._v("菜菜们")]),n("Submenu",{attrs:{name:"3"}},[n("template",{slot:"title"},[t.sharedState.ifLogin?n("Avatar",{attrs:{src:t.sharedState.user.userHeadUrl}},[t._v(t._s(null===t.sharedState.user?null:t.sharedState.user.name.substring(0,1)))]):t._e(),t.sharedState.ifLogin?t._e():n("span",[t._v("请登录")])],1),t.sharedState.ifLogin?n("MenuGroup",{attrs:{title:"个人"}},[n("MenuItem",{attrs:{name:"3-1"}},[t._v("个人信息")]),n("MenuItem",{attrs:{name:"3-7"}},[n("Badge",{attrs:{count:t.sharedState.noticesCount}},[t._v("我的通知")])],1)],1):t._e(),t.sharedState.ifLogin?n("MenuGroup",{attrs:{title:"账号"}},[n("MenuItem",{attrs:{name:"3-3"}},[t._v("修改密码")]),n("MenuItem",{attrs:{name:"3-4"}},[t._v("注销")])],1):t._e(),t.sharedState.ifLogin?t._e():n("MenuGroup",{attrs:{title:"请登录"}},[n("MenuItem",{attrs:{name:"3-5"}},[t._v("登录")]),n("MenuItem",{attrs:{name:"3-6"}},[t._v("注册")])],1)],2)],1)])],1)],1),n("Button",{staticClass:"nav-drawer-button",attrs:{type:"primary",size:"large",shape:"circle",icon:"md-menu"},on:{click:function(e){t.showDrawer=!0}}},[t._v("U菜")]),n("Drawer",{attrs:{closable:!1,placement:"left"},model:{value:t.showDrawer,callback:function(e){t.showDrawer=e},expression:"showDrawer"}},[n("MySearchComponent",{attrs:{slot:"header"},on:{search:function(e){t.showDrawer=!1}},slot:"header"}),n("CellGroup",{on:{"on-click":t.goTo}},[n("Cell",{attrs:{to:"/"}},[n("h3",[t._v("主页")])]),n("Cell",{attrs:{label:"菜菜们都等不及被吃了",to:"/dishes"}},[n("h3",[t._v("菜菜们")])]),n("Cell",{attrs:{label:"",to:"/restaurants"}},[n("h3",[t._v("餐厅")])]),t.sharedState.ifLogin?n("Cell",[n("p",[t._v("尊敬的：")]),n("h3",[t._v(t._s(t.sharedState.user.name))])]):t._e(),t.sharedState.ifLogin?t._e():n("Cell",{attrs:{title:"登录",label:"",to:"/login"}}),t.sharedState.ifLogin?t._e():n("Cell",{attrs:{title:"注册",label:"",to:"/register"}}),t.sharedState.ifLogin?n("Cell",{attrs:{title:"个人信息",name:"3-1"}}):t._e(),t.sharedState.ifLogin?n("Cell",{attrs:{title:"我的通知",name:"3-7"}},[n("Badge",{attrs:{slot:"extra",count:t.sharedState.noticesCount},slot:"extra"})],1):t._e(),t.sharedState.ifLogin?n("Cell",{attrs:{title:"修改密码",label:"待开发",name:"3-3"}}):t._e(),t.sharedState.ifLogin?n("Cell",{attrs:{title:"注销",name:"3-4",label:""}}):t._e()],1),n("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"space-between",align:"middle"}},[n("Col",[n("h3",[t._v("多图模式")])]),n("Col",[n("i-switch",{attrs:{size:"large"},on:{"on-change":t.switchChange},model:{value:t.ifShowImg,callback:function(e){t.ifShowImg=e},expression:"ifShowImg"}},[n("span",{attrs:{slot:"open"},slot:"open"},[t._v("多图")]),n("span",{attrs:{slot:"close"},slot:"close"},[t._v("省流")])])],1)],1),n("Row",{staticClass:"code-row-bg",staticStyle:{"margin-top":"4px"},attrs:{type:"flex",justify:"space-between",align:"middle"}},[n("Col",[n("h3",[t._v("智能推荐")])]),n("Col",[n("i-switch",{attrs:{size:"large"},on:{"on-change":t.switchRecommend},model:{value:t.ifShowRecommend,callback:function(e){t.ifShowRecommend=e},expression:"ifShowRecommend"}},[n("span",{attrs:{slot:"open"},slot:"open"},[t._v("开启")]),n("span",{attrs:{slot:"close"},slot:"close"},[t._v("关闭")])])],1)],1)],1)],1)},staticRenderFns:[]};var h=n("VU/8")(r,c,!1,function(t){n("kIoi")},"data-v-628ffba5",null).exports,l={name:"recommend",components:{MyDishCard:n("KzEK").a},data:function(){return{shareState:i.a.state,recommendDishes:[{imgUrl:""}],i:0,show:!1}},methods:{getRecommend:function(){var t=this;i.a.state.ifLogin&&this.$http.get("/user/recommend").then(function(e){0===e.data.code&&(t.recommendDishes=e.data.data)}).catch(function(t){console.log(t)})},goto:function(){this.i===this.recommendDishes.length-1?this.i=0:this.i++}},created:function(){this.getRecommend()}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.shareState.ifShowRecommend?n("div",{staticClass:"recommend"},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],on:{mouseleave:function(e){t.show=!1}}},[t.shareState.ifLogin?n("MyDishCard",{staticClass:"card",attrs:{slot:"content",dish:t.recommendDishes[t.i],showDetail:!1},on:{goto:t.goto},slot:"content"}):t._e(),t.shareState.ifLogin?t._e():n("Card",{staticStyle:{"margin-bottom":"4px"}},[n("h3",[t._v("登录查看"),n("br"),t._v("推荐哦！")])])],1),n("div",{on:{mouseenter:function(e){t.show=!0},click:function(e){t.show=!t.show}}},[n("Button",{attrs:{type:"error",shape:"circle"}},[t._v("猜你"),n("br"),t._v("喜欢")])],1)]):t._e()},staticRenderFns:[]};var d={name:"App",components:{Foot:s,Nav:h,MyRecommend:n("VU/8")(l,u,!1,function(t){n("Vt90")},"data-v-002ec517",null).exports},data:function(){return{}},methods:{navShow:function(){return 0===i.a.navState}},created:function(){var t=this;i.a.state.ifLogin&&this.$http.get("/login/user",{params:{email:i.a.state.user.email,password:i.a.state.user.password}}).then(function(e){0===e.data.code?(i.a.setIfLoginAction(e.data.data),console.log("已经成功自动登陆"),t.$http.get("/user/notices/notseen").then(function(t){0===t.data.code&&i.a.setNoticesCount(t.data.data.length)}).catch(function(t){console.log(t)})):i.a.clearIfLoginAction()}).catch(function(t){i.a.clearIfLoginAction(),console.log(t)})}},f={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[this.navShow()?e("Nav"):this._e(),this._v(" "),e("router-view",{attrs:{id:"router"}}),this._v(" "),e("Foot"),this._v(" "),e("MyRecommend"),this._v(" "),e("BackTop")],1)},staticRenderFns:[]};var p=n("VU/8")(d,f,!1,function(t){n("GvEz")},null,null).exports,m=n("/ocq");a.default.use(m.a);var g=new m.a({scrollBehavior:function(t,e,n){return{x:0,y:0}},routes:[{path:"/",name:"home",component:function(t){return n.e(0).then(function(){var e=[n("vkyI")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/testshow",name:"testshow",component:function(t){return n.e(12).then(function(){var e=[n("vMYr")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/login",name:"login",component:function(t){return n.e(17).then(function(){var e=[n("rqbd")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/register",name:"register",component:function(t){return n.e(9).then(function(){var e=[n("Iwgb")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/activate-success",component:function(t){return n.e(13).then(function(){var e=[n("I1U3")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/activate-failed",component:function(t){return n.e(19).then(function(){var e=[n("LSIR")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/manager-dish",name:"manager-dish",component:function(t){return n.e(14).then(function(){var e=[n("i8qi")];t.apply(null,e)}.bind(this)).catch(n.oe)},children:[{path:"add",name:"manager-add",component:function(t){return n.e(11).then(function(){var e=[n("5dbc")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"adminLogin",name:"adminLogin",component:function(t){return n.e(20).then(function(){var e=[n("Wm4I")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"adminOperator",name:"adminOperator",component:function(t){return n.e(7).then(function(){var e=[n("8IQb")];t.apply(null,e)}.bind(this)).catch(n.oe)}}]},{path:"/dishes",name:"dishes",component:function(t){return n.e(8).then(function(){var e=[n("+nu7")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dish/:id",name:"dish",component:function(t){return n.e(10).then(function(){var e=[n("mHSH")];t.apply(null,e)}.bind(this)).catch(n.oe)},props:!0},{path:"/search/:sth",name:"search",component:function(t){return n.e(18).then(function(){var e=[n("CTCe")];t.apply(null,e)}.bind(this)).catch(n.oe)},props:!0},{path:"/user/:userId",name:"user",component:function(t){return n.e(1).then(function(){var e=[n("2AnY")];t.apply(null,e)}.bind(this)).catch(n.oe)},props:!0,children:[{path:"notice",component:function(t){return n.e(5).then(function(){var e=[n("07Fj")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"info",component:function(t){return n.e(2).then(function(){var e=[n("rPPq")];t.apply(null,e)}.bind(this)).catch(n.oe)},props:!0},{path:"likes-history",component:function(t){return n.e(4).then(function(){var e=[n("6RSN")];t.apply(null,e)}.bind(this)).catch(n.oe)},props:!0}]},{path:"/edit",name:"edit",component:function(t){return n.e(6).then(function(){var e=[n("7703")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/update-log",name:"update-log",component:function(t){return n.e(15).then(function(){var e=[n("5t4D")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/userOperator",name:"userOperator",component:function(t){return n.e(3).then(function(){var e=[n("j4uf")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/delLink",name:"delLink",component:function(t){return n.e(21).then(function(){var e=[n("bDYx")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/restaurants",name:"restaurants",component:function(t){return n.e(16).then(function(){var e=[n("gJj2")];t.apply(null,e)}.bind(this)).catch(n.oe)}}]}),v=n("mtWM"),w=n.n(v),S=n("Rf8U"),_=n.n(S),y=n("BTaQ"),C=n.n(y);w.a.defaults.baseURL="http://39.97.102.59:8080/qi_back_end",w.a.defaults.withCredentials=!0,a.default.use(_.a,w.a),a.default.use(C.a),a.default.config.productionTip=!1,g.beforeEach(function(t,e,n){n()}),g.beforeEach(function(t,e,n){t.path.indexOf("manager-dish")>=0?i.a.navState=1:i.a.navState=0,n()}),g.beforeEach(function(t,e,n){C.a.LoadingBar.start(),n()}),g.afterEach(function(t){C.a.LoadingBar.finish()}),new a.default({el:"#app",router:g,components:{App:p},template:"<App/>"})},Vt90:function(t,e){},aQXz:function(t,e,n){"use strict";var a={name:"search-component",data:function(){return{searchSth:"",searchAdvice:[]}},methods:{filterMethod:function(t,e){if(""!==t)return-1!==e.indexOf(t)},search:function(){""!==this.searchSth&&(this.$router.push("/search/"+this.searchSth),this.searchSth="",this.$emit("search"))}},created:function(){var t=this;this.$http.get("/dish/get/all").then(function(e){if(0===e.data.code)for(var n=0;n<e.data.data.length;n++)t.searchAdvice.push(e.data.data[n].name)},function(t){console.log(t)}),this.$http.get("/restaurant/get/all").then(function(e){if(0===e.data.code)for(var n=0;n<e.data.data.length;n++)t.searchAdvice.push(e.data.data[n].name)},function(t){console.log(t)})}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("Row",{staticClass:"code-row-bg",attrs:{type:"flex",justify:"center",align:"middle"}},[n("Col",{attrs:{span:"20"}},[n("AutoComplete",{attrs:{data:t.searchAdvice,"filter-method":t.filterMethod,placeholder:"搜索菜菜或餐厅"},model:{value:t.searchSth,callback:function(e){t.searchSth=e},expression:"searchSth"}})],1),n("Col",{attrs:{span:"4"}},[n("Button",{attrs:{type:"primary",icon:"ios-search"},on:{click:t.search}})],1)],1)},staticRenderFns:[]};var s=n("VU/8")(a,o,!1,function(t){n("ug+T")},"data-v-20f72054",null);e.a=s.exports},cRC3:function(t,e){},kIoi:function(t,e){},olkN:function(t,e,n){"use strict";var a=n("mvHQ"),o=n.n(a),s={user:JSON.parse(window.localStorage.getItem("upccaicailoged")),ifLogin:null!==JSON.parse(window.localStorage.getItem("upccaicailoged")),ifShowImg:null===JSON.parse(window.localStorage.getItem("upccaicaiifshowimg"))||JSON.parse(window.localStorage.getItem("upccaicaiifshowimg")),ifShowRecommend:null===JSON.parse(window.localStorage.getItem("upccaicaiifshowrecommend"))||JSON.parse(window.localStorage.getItem("upccaicaiifshowrecommend")),noticesCount:0};e.a={debug:!0,state:s,navState:0,setIfLoginAction:function(t){this.state.user=t,this.state.ifLogin=!0,this.saveLogin(t)},setIfShowImg:function(t){this.state.ifShowImg=t,this.saveShowImg(t)},setIfShowRecommend:function(t){this.state.ifShowRecommend=t,this.saveShowRecommend(t)},setNoticesCount:function(t){this.state.noticesCount=t},clearIfLoginAction:function(){this.state.user="",this.state.ifLogin=!1,this.saveLogin(null)},saveLogin:function(t){window.localStorage.setItem("upccaicailoged",o()(t))},saveSchool:function(t){window.localStorage.setItem("upccaicaischool",o()(t))},saveShowImg:function(t){window.localStorage.setItem("upccaicaiifshowimg",o()(t))},saveShowRecommend:function(t){window.localStorage.setItem("upccaicaiifshowrecommend",o()(t))}}},"ug+T":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.cad3a4d4cb820360f711.js.map