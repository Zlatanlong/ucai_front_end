<template lang="pug">
div
  Row(type="flex" justify="center" class="code-row-bg")
    Col
      MyNavUser(:user-id="userId"
                :user-name="shareStore.user.name.substring(0,1)")
    Col(:xs="22" :sm="{span:16,offset:1}")
      router-view
</template>
<script>
import Store from '@/store.js'
import MyNavUser from '@/pages/user/components/nav-user.vue'
export default {
  name: 'user',
  props: ['userId'],
  data () {
    return {
      user: {},
      shareStore: Store.state
    }
  },
  methods: {
    matchUser () {
      if (Store.state.ifLogin) {
        if (Store.state.user.id.toString() !== this.userId) {
          this.$router.push('/')
        } else {
          return true
        }
      } else {
        this.$router.push('/')
      }
      return false
    }
  },
  created () {
    this.matchUser()
  },
  components: { MyNavUser }
}
</script>

<style lang="stylus" scoped>
  .tab-one{
    p{
      margin 20px auto
    }
    .button{
      margin-top 20px
    }
  }
  .tab-two{
    .tab-two-card{
      margin 2px
      img{
        width 100%
      }
    }
    .page-bigscreen{
      @media screen and (max-width: 1010px) {
        display none
      }
    }
    .page-smallscreen{
      @media screen and (min-width: 1011px) {
        display none
      }
    }
  }
</style>
