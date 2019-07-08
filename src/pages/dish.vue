<template lang="pug">
Row.first-row(type="flex" justify="center" class="code-row-bg")
  Col.dish-col(:xs="22" :sm="7" :md="7" :lg="7")
    Card.dish-card
      img.img(:src="dish.imgUrl" v-if="sharedState.ifShowImg")
      h2 {{this.dish.name}}
      svg(class="icon icon-zan1" aria-hidden="true" v-if="!ifLikesDish" @click="likeDish(false)")
        use(xlink:href="#icon-zan1")
      svg(class="icon icon-zan" aria-hidden="true" v-if="ifLikesDish" @click="likeDish(false)")
        use(xlink:href="#icon-zan")
      p 餐厅：{{dish.restaurantName}}
      p 价格：¥ {{dish.price}}
        Icon(type="ios-pricetag-outline")
      p 描述：{{dish.description}}
      p 发布时间：{{dish.createTime}}
      p 收藏次数：（{{dish.collectionCount}}）
      p 点赞数：（{{dish.likesCount}}）
      p 评价次数：（{{dish.evaluationTimes}}）
      div(v-if="dish.evaluationTimes !== 0")
        p 大众评分：
        div
          span 总评
          Rate(disabled allow-half :value="parseFloat(dish.totalScore.toFixed(1))" show-text)
        div
          Rate(disabled allow-half :value="parseFloat(dish.saltyScore.toFixed(1))" show-text character="咸")
        div
          Rate(disabled allow-half :value="parseFloat(dish.sourScore.toFixed(1))" show-text character="酸")
        div
          Rate(disabled allow-half :value="parseFloat(dish.hotScore.toFixed(1))" show-text character="辣")
        div
          Rate(disabled allow-half :value="parseFloat(dish.sweetScore.toFixed(1))" show-text character="甜")
  Col#reply.reply-col(:xs="{span:22,order:3}" :sm="{span:7, offset:1, order:2}")
    Card.reply-card(ref="reply")
      p 添加评论:
      Tag(color="success" closable v-if="replyWhoName !== null" @on-close="resetReplySb") 回复：@{{replyWhoName}}
      Input(v-model="myReply" type="textarea" :autosize="{minRows: 3,maxRows: 3}" placeholder="吃过这个菜？写个回复吧")
      Row(type="flex" justify="end" class="code-row-bg")
        Button(@click="handleReply" type="primary" icon="ios-undo" style="margin-top:3px;") 评论
    div(v-for="(item, index) in currentReplyList" :key="index")
      Card.reply-card
        Avatar(size="large"
              :src="currentReplyFromHeadUrl[index]"
              style="color: #f56a00;background-color: #fde3cf;") {{currentReplyFromName[index].substring(0,1)}}
        h4(style="display:inline;margin-left:8px;") {{currentReplyFromName[index]}}:
        div(v-if="item.toReplyId !== null")
          p(style="") 回复 --->>>
          Card
            h5 {{currentReplyToName[index]}}
            h5(v-if="currentReplyTo2Name[index] !== null") 回复@{{currentReplyTo2Name[index]}}
            p 内容：{{currentReplyToContent[index]}}
        p {{item.content}}
        h6(style="color:#cccccc;") 发布于 {{item.createTime}}
        Badge(dot :offset="[10, 20]" v-if="!currentReplyIfLike[index]")
          Button(@click="likeReply(item.id, index)" style="display:inline" type="text") 赞（{{item.likesCount}}）
        p(v-if="currentReplyIfLike[index]" style="display:inline;color:#ff9898;") 已赞（{{item.likesCount}}）
        Button(type="text" @click="replySb(item.id, currentReplyFromName[index])" icon="ios-undo") 回复
      Divider(type="vertical")
    Page(:total="replyCount" size="small" show-total @on-change="showPage")
  Col.evaluation-col(:xs="{span:22,order:2}" :sm="{span:7, offset:1, order:2}")
    Card.evaluation-card
      p(slot="title") 我的评分
      div(v-if="!ifEvaluation")
        p 请评价
        p tips： 总评5星为最佳 其它3星为口味正好
        div
          span 总评
          Rate(v-model="myScore.totalScore" show-text)
        div
          Rate(v-model="myScore.saltyScore" show-text character="咸")
        div
          Rate(v-model="myScore.sourScore" show-text  character="酸")
        div
          Rate(v-model="myScore.hotScore" show-text  character="辣")
        div
          Rate(v-model="myScore.sweetScore" show-text  character="甜")
        div.evaluation-submit
          Button(@click="handleScore") 提交
      div(v-if="ifEvaluation")
        p 我的评价
        div
          span 总评
          Rate(disabled allow-half v-model="myScore.totalScore" show-text)
        div
          Rate(disabled allow-half v-model="myScore.saltyScore" show-text character="咸")
        div
          Rate(disabled allow-half v-model="myScore.sourScore" show-text  character="酸")
        div
          Rate(disabled allow-half v-model="myScore.hotScore" show-text  character="辣")
        div
          Rate(disabled allow-half v-model="myScore.sweetScore" show-text  character="甜")
</template>

<script>
import Store from '@/store.js'
export default {
  name: 'dish',
  props: ['id'], // 路由传参
  data () {
    return {
      dish: {
        id: null,
        createTime: '',
        updateTime: '',
        ifDel: 0,
        name: '',
        price: null,
        imgUrl: '',
        description: '',
        point: null,
        totalScore: 0,
        saltyScore: 0,
        sourScore: 0,
        hotScore: 0,
        sweetScore: 0,
        evaluationTimes: 0,
        likesCount: 0,
        collectionCount: 0,
        restaurantId: null,
        restaurantName: '',
        createMangerId: null,
        updateMangerId: null,
        deleteMangerId: null
      },
      ifEvaluation: false,
      ifLikesDish: false,
      myScore: {
        totalScore: 5,
        saltyScore: 3,
        sourScore: 3,
        hotScore: 3,
        sweetScore: 3
      },
      myReply: '', // 回复的内容
      replyWhich: null, // 回复的id
      replyWhoName: null, // 回复的人的name
      currentReplyList: [],
      currentReplyFromName: [],
      currentReplyFromHeadUrl: [],
      currentReplyToName: [],
      currentReplyTo2Name: [],
      currentReplyToContent: [],
      currentReplyIfLike: [],
      replyCount: 0,
      currentPage: 1,
      sharedState: Store.state
    }
  },
  methods: {
    refresh () {
      this.myReply = null
      this.replyWhich = null
      this.replyWhoName = null
      this.currentReplyList = null
      this.currentReplyFromName = null
      this.currentReplyFromHeadUrl = null
      this.currentReplyToName = null
      this.currentReplyIfLike = null
      this.currentReplyTo2Name = null
      this.currentReplyToContent = null
      this.ifEvaluation = false
      this.ifLikesDish = false
    },
    handleScore () {
      if (Store.state.ifLogin) {
        this.$http.post('/score/dish/add', {
          dishId: this.id,
          totalScore: this.myScore.totalScore,
          saltyScore: this.myScore.saltyScore,
          sourScore: this.myScore.sourScore,
          hotScore: this.myScore.hotScore,
          sweetScore: this.myScore.sweetScore
        }).then(res => {
          if (res.data.code === 0) {
            this.$Message.success('提交成功')
            this.ifEvaluation = true
            this.$http.get('/dish/get/dish', {
              params: {
                id: this.id
              }
            }).then(res => {
              if (res.data.code === 0) {
                this.dish = res.data.data
              }
            }, err => {
              this.$Message.error('服务器开小差了')
              console.log(err)
            })
          } else {
            this.$Message.failed('提交失败，请重试')
          }
        }, err => {
          this.$Message.error('服务器开小差了')
          console.log(err)
        })
      } else {
        this.$Message.error('请登录再打分')
      }
    },
    handleReply () {
      if (Store.state.ifLogin) {
        if (this.myReply.length < 5) {
          this.$Message.error('评论请超过5个字！')
          return
        }
        this.$http.post('/user/reply', {
          dishId: this.id,
          content: this.myReply,
          toReplyId: this.replyWhich
        }).then(res => {
          if (res.data.code === 0) {
            this.$Message.success('提交成功')
            this.replyCount++
            this.showPage(1)
            this.myReply = ''
            this.resetReplySb()
          } else if (res.data.code === 1) {
            this.$Message.error('请登录再评论')
          } else {
            this.$Message.failed('提交失败，请重试')
          }
        }, err => {
          this.$Message.error('服务器开小差了')
          console.log(err)
        })
      } else {
        this.$Message.error('请登录再评论')
      }
    },
    showPage (page, ifBackTop = true) {
      // ifBackTop 切换数据后是否滚回top
      this.currentPage = page
      this.$http.get('/reply/get/page', {
        params: {
          dishid: this.id,
          start: this.currentPage,
          size: 10
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.currentReplyList = res.data.data.reply
          this.currentReplyFromName = res.data.data.fromName
          this.currentReplyFromHeadUrl = res.data.data.fromHeadUrl
          this.currentReplyToName = res.data.data.toName
          this.currentReplyIfLike = res.data.data.ifUserLike
          this.currentReplyTo2Name = res.data.data.to2Name
          this.currentReplyToContent = res.data.data.toContent
        }
      }, err => {
        this.$Message.error('服务器开小差了')
        console.log(err)
      })
      if (ifBackTop) {
        document.getElementById('reply').scrollIntoView()
      }
    },
    replySb: function (id, name) {
      this.replyWhich = id
      this.replyWhoName = name
      document.getElementById('reply').scrollIntoView()
      document.body.scrollTop -= 70
      document.documentElement.scrollTop -= 70
    },
    resetReplySb () {
      this.replyWhoName = null
      this.replyWhoName = null
    },
    likeDish () {
      if (Store.state.ifLogin) {
        this.$http.post('/likes/dish', {
          dishid: parseInt(this.id)
        }).then(res => {
          if (res.data.data.ifDel === 0) {
            this.ifLikesDish = true
            this.dish.likesCount += 1
          } else {
            this.ifLikesDish = false
            this.dish.likesCount -= 1
          }
        }, err => {
          this.$Message.error('服务器开小差了')
          console.log(err)
        })
      } else {
        this.$Message.error('请登录再点赞')
      }
    },
    likeReply (replyId, index) {
      if (Store.state.ifLogin) {
        this.$http.post('/likes/reply', {
          replyid: replyId
        }).then(res => {
          if (res.data.code === 0) {
            this.showPage(this.currentPage, false)
          } else {
          }
        }, err => {
          this.$Message.error('服务器开小差了')
          console.log(err)
        })
      } else {
        this.$Message.error('请登录再点赞')
      }
    },
    getlikeDish () {
      // 获得当前用户点赞菜信息
      if (Store.state.ifLogin) {
        this.$http.get('/likes/get/dish', {
          params: {
            dishid: parseInt(this.id)
          }
        }).then(res => {
          if (res.data.code === 0) {
            if (res.data.data.ifDel === 0) {
              this.ifLikesDish = true
            } else {
              this.ifLikesDish = false
            }
          }
        }, err => {
          this.$Message.error('服务器开小差了')
          console.log(err)
        })
      }
    },
    getDishInfo () {
      // 当前菜信息
      this.$http.get('/dish/get/dish', {
        params: {
          id: this.id
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.dish = res.data.data
        }
      }, err => {
        this.$Message.error('服务器开小差了')
        console.log(err)
      })
    },
    getReplyCount () {
      // 回复总数
      this.$http.get('/reply/get/count', {
        params: {
          dishid: this.id
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.replyCount = res.data.data
        }
      }, err => {
        this.$Message.error('服务器开小差了')
        console.log(err)
      })
    },
    getScore () {
      // 获得当前用户打分的信息
      if (Store.state.ifLogin) {
        this.$http.get('/score/dish/getscore', {
          params: {
            dishid: this.id
          }
        }).then(res => {
          if (res.data.code === 0) {
            this.ifEvaluation = true
          } else {
            this.ifEvaluation = false
          }
        }, err => {
          this.$Message.error('服务器开小差了')
          console.log(err)
        })
      }
    }
  },
  created () {
    this.getDishInfo()
    this.getReplyCount()
    // 当前页回复
    this.showPage(1, false)
    this.getlikeDish()
    this.getScore()
  },
  watch: {
    ifLikesDish: {
      handler: function (val, oldVal) {
      },
      deep: true
    },
    '$route' (to, from) {
      this.refresh()
      this.getDishInfo()
      this.getReplyCount()
      this.showPage(1, false)
      this.getlikeDish()
      this.getScore()
    }
  }
}
</script>

<style lang="stylus" scoped>
.first-row{
  .dish-col{
    .dish-card{
      .img{
        width 100%
        /*height 150px*/
      }
    }
  }
}
</style>
