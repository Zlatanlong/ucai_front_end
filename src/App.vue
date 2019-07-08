<template>
  <div id="app">
    <Nav v-if="navShow()"></Nav>
    <router-view id="router"/>
    <Foot></Foot>
    <MyRecommend></MyRecommend>
    <BackTop></BackTop>
  </div>
</template>

<script>
import Foot from './components/footer-main.vue'
import Nav from './components/nav-main.vue'
import MyRecommend from './components/recommend.vue'
import Store from '@/store.js'
export default {
  name: 'App',
  components: {
    Foot,
    Nav,
    MyRecommend
  },
  data () {
    return {}
  },
  methods: {
    navShow () {
      if (Store.navState === 0) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    if (Store.state.ifLogin) {
      this.$http.get('/login/user', {
        params: {
          email: Store.state.user.email,
          password: Store.state.user.password
        }
      }).then(res => {
        if (res.data.code === 0) {
          Store.setIfLoginAction(res.data.data)
          console.log('已经成功自动登陆')
          this.$http.get('/user/notices/notseen').then(
            res => {
              if (res.data.code === 0) {
                Store.setNoticesCount(res.data.data.length)
              }
            }
          ).catch(err => { console.log(err) })
        } else {
          Store.clearIfLoginAction()
        }
      }).catch(err => {
        Store.clearIfLoginAction()
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus">
.icon {
  width: 22px;
  height: 22px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
#router{
  margin: 100px auto;
  @media screen and (max-width: 768px) {
    margin 60px auto
  }
}
</style>
