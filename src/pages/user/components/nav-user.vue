<template lang="pug">
  div.nav
    div.big-screen
      Menu(:theme="theme1" active-name="1" @on-select="goTo")
        MenuItem(name="1") 个人信息
        MenuItem(name="2") 点赞记录
        MenuItem(name="3") 我的通知
    Button(@click="showDrawer = true" type="info" class="nav-drawer-button" size="large" shape="circle") {{userName}}
    Drawer(:closable="false" v-model="showDrawer")
      CellGroup(@on-click="goTo")
        Cell(name="1")
          h4 个人信息
        Cell(name="2")
          h4 点赞记录
        Cell(name="3")
          h4 我的通知
</template>

<script>
export default {
  name: 'nav-user',
  props: ['userId', 'userName'],
  data () {
    return {
      theme1: 'light',
      showDrawer: false
    }
  },
  methods: {
    goTo (name) {
      if (name === '1') {
        this.$router.push(`/user/${this.userId}/info`)
      } else if (name === '2') {
        this.$router.push(`/user/${this.userId}/likes-history`)
      } else if (name === '3') {
        this.$router.push(`/user/${this.userId}/notice`)
      }
      this.showDrawer = false
    }
  }
}
</script>

<style scoped lang="stylus">
.nav{
  .big-screen{
    @media screen and (max-width: 1010px) {
      display none
    }
  }
  .nav-drawer-button{
    position fixed
    z-index 1000
    top: 20px;
    right: 20px;
    @media screen and (min-width: 1011px) {
      display none
    }
  }
}
</style>
