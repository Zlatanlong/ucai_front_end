<template lang="pug">
div
  Row(type="flex" justify="center" class="code-row-bg" align="middle")
    Col(:xs="22" :sm="16" :md="16" :lg="16")
      Tabs(type="card" @on-click="getCurrentRestaurant")
        TabPane(v-for="(item, index) in restaurants"
        :key="index"
        :label="item.name"
        :name="item.id.toString()")
          Row(type="flex" justify="start" class="code-row-bg" align="middle")
            Col(:xs="8" :sm="6" :md="6" :lg="6"
            v-for="(dish, indexDish) in currentDishes" :key="indexDish")
              div(@click="goto(dish.id)")
                Card
                  h4 {{dish.name}}
                  img.img(:src="dish.imgUrl" v-if="sharedState.ifShowImg")
          Row(type="flex" justify="center" class="code-row-bg" align="middle")
            h2(style="margin-top: 20px;") 热门评论
            Col(span="24")
              Card(v-for="(reply, indexReply) in currentRestaurantReplys" :key="indexReply")
                p 菜菜：{{currentRestaurantReplyDishes[indexReply]}}
                h4 神回复: {{reply.content}}
                span 回复时间：{{reply.createTime}}
                span(style="margin-left:20px;") 赞({{reply.likesCount}})
            p(v-if="currentRestaurantReplys.length === 0") 暂无
          h1(style="margin-top: 20px;") 地址：{{item.location}}
          h3 电话：{{item.phonenum}}
</template>

<script>
import Store from '@/store.js'
export default {
  name: 'restaurants',
  data () {
    return {
      restaurants: [],
      currentDishes: [],
      currentRestaurantReplys: [],
      currentRestaurantReplyDishes: [],
      sharedState: Store.state
    }
  },
  methods: {
    getAllRestaurants () {
      this.$http.get('/restaurant/get/page?start=1&size=10').then(
        res => {
          this.restaurants = res.data.data
          this.getCurrentRestaurant(this.restaurants[0].id)
        }
      ).catch(err => console.log(err))
    },
    getCurrentRestaurant (id) {
      this.$http.get('/restaurant/get/alldish', {
        params: {id: id}
      }).then(
        res => {
          this.currentDishes = res.data.data.reverse()
        }
      ).catch(err => console.log(err))
      this.$http.get('/restaurant/get/bestreply', {
        params: {id: id}
      }).then(
        res => {
          if (res.data.code === 0) {
            this.currentRestaurantReplys = res.data.data.reverse()
          } else {
            this.currentRestaurantReplys = []
          }
        }
      ).catch(err => console.log(err))
    },
    goto (id) {
      this.$router.push('/dish/' + id)
    },
    getCurrentRestaurantReplyDish (val, index = 0) {
      this.$http.get('/dish/get/dish', {
        params: {id: val[index].dishId}
      }).then(res => {
        if (res.data.code === 0) {
          this.currentRestaurantReplyDishes.push(res.data.data.name)
          if (index + 1 < val.length) {
            this.getCurrentRestaurantReplyDish(val, index + 1)
          }
        }
      }).catch(err => console.log(err))
    }
  },
  created () {
    this.getAllRestaurants()
  },
  watch: {
    currentRestaurantReplys: {
      handler: function (val, oldVal) {
        this.currentRestaurantReplyDishes = []
        if (val.length > 0) {
          this.getCurrentRestaurantReplyDish(val)
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  .img{
    width 100%
  }
</style>
