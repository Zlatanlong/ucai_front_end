<template lang="pug">
  div
    Row(type="flex" justify="center" class="code-row-bg")
      Col(span="22")
        Row.first-row(type="flex" justify="start" class="code-row-bg")
          Col.dish-col(:xs="12" :sm="8" :md="6" :lg="6"
          v-for="(item, index) in currentDishList"
          :key="index" )
            MyDishCard(:dish="item")
        Row.second-row(type="flex" justify="start" class="code-row-bg")
          Page.page-bigscreen(:total="dishCount"
          show-total
          show-sizer
          :current="currentPage"
          :page-size=onePageSize
          @on-change="showPage"
          @on-page-size-change="changePageSize"
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
import MyDishCard from '@/components/dish-card.vue'
export default {
  name: 'dishes',
  components: {MyDishCard},
  props: ['sth'],
  data () {
    return {
      showSelect: [
        {value: 1, name: '最新发布'},
        {value: 2, name: '评价最高'}
      ],
      currentDishList: [],
      currentPage: 1,
      onePageSize: 10,
      dishCount: 0,
      sharedState: Store.state
    }
  },
  methods: {
    showPage (page) {
      this.currentPage = page
      this.$http.get('/dish/get/search', {
        params: {
          start: page,
          size: this.onePageSize,
          sth: this.sth
        }
      }).then(res => {
        this.currentDishList = res.data.data
      }, err => {
        this.$Message.error('服务器开小差啦')
        console.log(err)
      })
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    changePageSize (size) {
      this.onePageSize = size
      this.showPage(this.currentPage)
    },
    goto (id) {
      this.$router.push('/dish/' + id)
    },
    getCount () {
      this.$http.get('/dish/get/searchcount', {
        params: {
          sth: this.sth
        }
      }).then(res => {
        this.dishCount = res.data.data
      }, err => {
        this.$Message.error('服务器开小差啦')
        console.log(err)
      })
    }
  },
  created () {
    this.getCount()
    this.showPage(1)
  },
  watch: {
    '$route' (to, from) {
      this.showPage(this.currentPage)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .first-row{
    .dish-col{
      .dish-card{
        margin 2px
        .img{
          width 100%
          overflow hidden
        }
      }
    }
  }
  .second-row{
    margin 10px auto
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
