<template lang="pug">
div
  div(v-if="likeDishes === null") 没有喜欢的菜哦，快去浏览吧！
  div.tab-two(v-else)
    Row(type="flex" justify="start" class="code-row-bg" align="middle")
      Col(:xs="8" :sm="6" :md="6" :lg="6" v-for="(item, index) in currentDishList" :value="item.id" :key="index")
        div(@click="goto(item.id)")
          Card.tab-two-card
            h4 {{item.name}}
            img.img(:src="item.imgUrl" v-if="sharedState.ifShowImg")
    Row(type="flex" justify="start" class="code-row-bg")
      Page.page-bigscreen(:total="dishCount"
      show-total
      :current="currentPage"
      :page-size=onePageSize
      @on-change="showPage"
      show-elevator)
      Page.page-smallscreen(:total="dishCount"
      simple
      :current="currentPage"
      :page-size=onePageSize
      @on-change="showPage"
      )
</template>

<script>
import Store from '@/store.js'
export default {
  name: '',
  props: ['userId'],
  data () {
    return {
      likeDishes: [],
      currentDishList: [],
      currentPage: 1,
      onePageSize: 12,
      dishCount: 0,
      sharedState: Store.state
    }
  },
  methods: {
    getUser () {
      this.$http.get('/user/get').then(res => {
        if (res.data.code === 0) {
          this.user = res.data.data
        } else {
          this.$Message.error('未知错误')
        }
      }, err => {
        console.log(err)
        this.$Message.error('服务器开小差了')
      })
    },
    getLikeDishes () {
      this.$http.get('/user/getLikes/dish').then(res => {
        if (res.data.code === 0) {
          this.likeDishes = res.data.data.reverse()
          this.currentDishList = this.likeDishes.slice(0, this.onePageSize - 1)
          this.dishCount = this.likeDishes.length
        } else if (res.data.code === 202) {
          this.likeDishes = null
        }
      }, err => {
        console.log(err)
        this.$Message.error('服务器开小差了')
      })
    },
    showPage (page) {
      this.currentDishList = this.likeDishes.slice((page - 1) * this.onePageSize, page * this.onePageSize)
    },
    goto (id) {
      this.$router.push('/dish/' + id)
    }
  },
  created () {
    this.getLikeDishes()
  }
}
</script>

<style scoped lang="stylus">
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
