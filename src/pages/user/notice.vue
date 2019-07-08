<template lang="pug">
  div
    Tabs()
      TabPane(:label="label")
        Row(type="flex" justify="center" class="code-row-bg")
          Col(span="23")
            Button.but(@click="handleSelectAll(true)") 全选
            Button.but(@click="handleSelectAll(false)") 取消全选
            Button.but(@click="handleSee") 设为已读
            Table(:columns="columnNotSeen"
                  :data="notices.notSeen"
                  :show-header="false"
                  ref="selection"
                  @on-selection-change="changeSelection")
      TabPane(label="已读通知")
        Row(type="flex" justify="center" class="code-row-bg")
          Col(span="23")
            Table(:columns="columnSeen" :data="notices.seen"
                  :show-header="false")
</template>

<script>
import Store from '@/store.js'
export default {
  name: 'notice',
  data () {
    return {
      columnNotSeen: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '用户',
          key: 'fromUserName'
        },
        {
          title: '类型',
          width: 60,
          align: 'center',
          key: 'typeName'
        },
        {
          title: '我的评论',
          key: 'toReply'
        },
        {
          title: '时间',
          key: 'time'
        }
      ],
      columnSeen: [
        {
          title: '用户',
          key: 'fromUserName'
        },
        {
          title: '类型',
          width: 60,
          align: 'center',
          key: 'typeName'
        },
        {
          title: '我的评论',
          key: 'toReply'
        },
        {
          title: '时间',
          key: 'time'
        }
      ],
      notices: {
        notSeen: [],
        seen: []
      },
      selection: [],
      label: (h) => {
        return h('div', [
          h('span', '未读通知'),
          h('Badge', {
            props: {
              count: this.notices.notSeen === null ? 0 : this.notices.notSeen.length
            }
          })
        ])
      }
    }
  },
  methods: {
    getNoteces (ifRefresh = false) {
      this.$http.get('/user/notices/notseen').then(
        res => {
          if (res.data.code === 0) {
            this.notices.notSeen = res.data.data
            this.handleTransNotice()
          } else if (res.data.code === 207) {
            this.notices.notSeen = []
          }
          this.$http.get('/user/notices/seen').then(
            res => {
              if (res.data.code === 0) {
                this.notices.seen = res.data.data
                this.handleTransNotice()
              } else {
                this.notices.seen = []
              }
              Store.setNoticesCount(this.notices.notSeen.length)
              if (ifRefresh) {
                // this.$router.go(0)
              }
            }
          ).catch(err => { console.log(err) })
        }
      ).catch(err => { console.log(err) })
    },
    handleTransNotice () {
      if (this.notices.notSeen !== null) {
        this.notices.notSeen.forEach(notice => {
          if (notice.type === 0) {
            notice.typeName = '点赞'
          } else if (notice.type === 1) {
            notice.typeName = '回复'
          }
        })
      }
      if (this.notices.seen !== null) {
        this.notices.seen.forEach(notice => {
          if (notice.type === 0) {
            notice.typeName = '点赞'
          } else if (notice.type === 1) {
            notice.typeName = '回复'
          }
        })
      }
    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    changeSelection (selection) {
      this.selection = selection
    },
    handleSee () {
      this.$http.put('/user/notices', this.selection).then(
        res => {
          if (res.data.code === 0) {
            this.$Message.success('操作成功！')
            this.getNoteces(true)
          }
        }
      ).catch(err => { console.log(err) })
    }
  },
  created () {
    this.getNoteces()
  }
}
</script>

<style scoped lang="stylus">
.but
  margin 4px
</style>
