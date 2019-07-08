<template lang="pug">
  div.recommend(v-if="shareState.ifShowRecommend")
    div(@mouseleave="show = false" v-show="show")
      MyDishCard.card(:dish="recommendDishes[i]"
                  slot="content"
                  :showDetail="false"
                  @goto="goto"
                  v-if="shareState.ifLogin")
      Card(style="margin-bottom:4px" v-if="!shareState.ifLogin")
        h3 登录查看</br>推荐哦！
    div(@mouseenter="show=true" @click="show=!show")
      Button(type="error" shape="circle")
        | 猜你</br>喜欢
</template>

<script>
import Store from '@/store.js'
import MyDishCard from '@/components/dish-card.vue'
export default {
  name: 'recommend',
  components: {MyDishCard},
  data () {
    return {
      shareState: Store.state,
      recommendDishes: [
        {
          imgUrl: ''
        }
      ],
      i: 0,
      show: false
    }
  },
  methods: {
    getRecommend () {
      if (Store.state.ifLogin) {
        this.$http.get('/user/recommend').then(
          res => {
            if (res.data.code === 0) {
              this.recommendDishes = res.data.data
            }
          }
        ).catch(err => { console.log(err) })
      }
    },
    goto () {
      this.i === this.recommendDishes.length - 1 ? this.i = 0 : this.i++
    }
  },
  created () {
    this.getRecommend()
  }
}
</script>

<style scoped lang="stylus">
.recommend
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  .card
    width 150px
    margin-bottom 4px
</style>
