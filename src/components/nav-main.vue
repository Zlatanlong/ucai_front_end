<template lang="pug">
  div.nav-main
    Menu(mode="horizontal" :theme="theme1" active-name="1" @on-select="goTo" class="nav-nav")
      Row(type="flex" justify="space-between" class="code-row-bg" align="middle")
        Col(span="2")
          MenuItem(name="4" to="/" style="font-size:20px;")
            svg(class="icon icon-longxia" aria-hidden="true")
              use(xlink:href="#icon-longxia")
            | 优菜
        Col(span="2")
          i-switch(v-model="ifShowImg" size="large" @on-change="switchChange")
            span(slot="open") 多图
            span(slot="close") 省流
        Col(span="3")
          span 智能推荐
          i-switch(v-model="ifShowRecommend" size="large" @on-change="switchRecommend")
            span(slot="open") 开启
            span(slot="close") 关闭
        Col(span="6" offset="0")
          MySearchComponent
        Col.nav-right(span="9" offset="0")
          div(style="float:right")
            MenuItem(name="1" to="/" style="font-size:20px;")
              svg(class="icon icon-shouye" aria-hidden="true")
                use(xlink:href="#icon-shouye")
              | 主页
            MenuItem(name="4" to="/restaurants" style="font-size:20px;")
              svg(class="icon icon-canting" aria-hidden="true")
                use(xlink:href="#icon-canting")
              | 餐厅
            MenuItem(name="2" to="/dishes" style="font-size:20px;")
              svg(class="icon icon-guo" aria-hidden="true")
                use(xlink:href="#icon-guo")
              | 菜菜们
            Submenu(name="3")
              template(slot="title")
                Avatar(v-if="sharedState.ifLogin" :src="sharedState.user.userHeadUrl") {{sharedState.user === null? null : sharedState.user.name.substring(0,1)}}
                span(v-if="!sharedState.ifLogin") 请登录
              MenuGroup(title="个人" v-if="sharedState.ifLogin")
                MenuItem(name="3-1") 个人信息
                MenuItem(name="3-7")
                  Badge(:count="sharedState.noticesCount") 我的通知
              MenuGroup(title="账号" v-if="sharedState.ifLogin")
                MenuItem(name="3-3") 修改密码
                MenuItem(name="3-4") 注销
              MenuGroup(title="请登录" v-if="!sharedState.ifLogin")
                MenuItem(name="3-5") 登录
                MenuItem(name="3-6") 注册
    Button(@click="showDrawer = true" type="primary" class="nav-drawer-button" size="large" shape="circle" icon="md-menu") U菜
    Drawer(:closable="false" placement="left" v-model="showDrawer")
      MySearchComponent(slot="header" @search="showDrawer = false")
      CellGroup(@on-click="goTo")
        Cell( to="/")
          h3 主页
        Cell(label="菜菜们都等不及被吃了"  to="/dishes")
          h3 菜菜们
        Cell(label=""  to="/restaurants")
          h3 餐厅
        Cell(v-if="sharedState.ifLogin")
          p 尊敬的：
          h3 {{sharedState.user.name}}
        Cell(title="登录" label=""  to="/login" v-if="!sharedState.ifLogin")
        Cell(title="注册" label=""  to="/register" v-if="!sharedState.ifLogin")
        Cell(title="个人信息" name="3-1" v-if="sharedState.ifLogin")
        Cell(title="我的通知" name="3-7" v-if="sharedState.ifLogin")
          Badge(:count="sharedState.noticesCount" slot="extra")
        Cell(title="修改密码" label="待开发"  name="3-3" v-if="sharedState.ifLogin")
        Cell(title="注销" name="3-4" label="" v-if="sharedState.ifLogin")
      Row(type="flex" justify="space-between" class="code-row-bg" align="middle")
        Col
          h3 多图模式
        Col
          i-switch(v-model="ifShowImg" size="large" @on-change="switchChange")
            span(slot="open") 多图
            span(slot="close") 省流
      Row(type="flex" justify="space-between" class="code-row-bg" align="middle" style="margin-top:4px")
        Col
          h3 智能推荐
        Col
          i-switch(v-model="ifShowRecommend" size="large" @on-change="switchRecommend")
            span(slot="open") 开启
            span(slot="close") 关闭
</template>
<script>
import Store from '@/store.js'
import MySearchComponent from '@/components/search-component'
export default {
  components: {MySearchComponent},
  data () {
    return {
      theme1: 'light',
      sharedState: Store.state,
      showDrawer: false,
      ifShowImg: true,
      ifShowRecommend: true
    }
  },
  methods: {
    goTo (name) {
      if (name === '3-4') {
        this.logOut()
        this.$router.push('/')
      } else if (name === '3-5') {
        this.$router.push('/login')
      } else if (name === '3-6') {
        this.$router.push('/register')
      } else if (name === '3-1') {
        this.$router.push('/user/' + this.sharedState.user.id + '/info')
      } else if (name === '3-7') {
        this.$router.push('/user/' + this.sharedState.user.id + '/notice')
      } else if (name === '4') {
        this.$router.push('/restaurants')
      }
      this.showDrawer = false
    },
    logOut () {
      this.$http.get('/login/out/user').then(
        res => {
          if (res.data.code === 0) {
            Store.clearIfLoginAction()
            this.$Message.success('注销成功！')
          }
        }
      )
    },
    switchChange (status) {
      Store.setIfShowImg(status)
    },
    switchRecommend (status) {
      Store.setIfShowRecommend(status)
    }
  },
  created () {
    this.ifShowImg = this.sharedState.ifShowImg
    this.ifShowRecommend = this.sharedState.ifShowRecommend
  }
}
</script>

<style lang="stylus" scoped>
.nav-main {
  @media screen and (max-width: 1010px) {
    top: 14px;
    left: 20px;
  }
  font-size 28px
  position: fixed;
  width: 100%;
  top: 0;
  right: 0;
  z-index: 1000;
  .nav-nav{
    @media screen and (max-width: 1010px) {
      display none
    }
  }
  .nav-drawer-button{
    top: 20px;
    left: 20px;
    @media screen and (min-width: 1011px) {
      display none
    }
  }
}
</style>
