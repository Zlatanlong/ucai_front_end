<template lang="pug">
  div(@click="goto(dish.id)")
    Card.dish-card
      div.img-box
        img.img(:src="dish.imgUrl===null?'':dish.imgUrl" v-if="sharedState.ifShowImg")
      h3 {{dish.name}}
      div(v-if="showDetail")
        p
          span 餐厅：{{dish.restaurantName}}
          span(style="float:right;") ¥ {{dish.price}}
            Icon(type="ios-pricetag-outline")
        p
          span 总评： {{dish.evaluationTimes === 0 ? '暂无' : parseFloat(dish.totalScore.toFixed(1))}}
          span(style="float:right;")
            svg(class="icon icon-zan" aria-hidden="true" style="width: 16px;height: 16px;")
              use(xlink:href="#icon-zan")
            | ({{dish.likesCount}})
</template>

<script>
import Store from '@/store.js'
export default {
  name: 'dish-card',
  props: {
    dish: {
      type: Object,
      default: null
    },
    showDetail: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      sharedState: Store.state
    }
  },
  methods: {
    goto (id) {
      this.$router.push('/dish/' + id)
      this.$emit('goto')
    }
  }
}
</script>

<style lang="stylus">
.ivu-card-body
  padding 6px
.dish-card
  margin 2px
  .img
    width 100%
    overflow hidden
</style>
