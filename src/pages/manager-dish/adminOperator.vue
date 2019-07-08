<template>
  <Table stripe :columns="tr" :data="td" height="500" size="small"></Table>
</template>

<script>
export default {
  data () {
    return {
      tr: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '菜名',
          key: 'name'
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '描述',
          key: 'description'
        },
        {
          title: '总评分',
          key: 'totalScore'
        },
        {
          title: '操作',
          key: 'operator',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              // h('Button', {
              //   props: {
              //     type: 'primary',
              //     size: 'small'
              //   },
              //   style: {
              //     marginRight: '5px'
              //   },
              //   on: {
              //     click: () => {
              //       this.show(params.index)
              //     }
              //   }
              // }, 'show'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'delete')
            ])
          }
        }
      ],
      td: []
    }
  },
  created () {
    this.$http.get('/dish/get/bypage', {
      params: {
        start: 1,
        size: 30
      }
    }).then(res => {
      console.log(res)
      this.td = res.data.data
    }, err => {
      this.$Message.error('服务器开小差啦')
      console.log(err)
    })
  },
  methods: {
    remove: function (index) {
      this.$http.delete('/dish-manager/deldish', {
        params: {
          id: this.td[index].id
        }
      }).then(res => {
        if (res.data.code === 0) {
          this.$Message.success('删除成功')
          this.showList()
        } else if (res.data.code === 3) {
          this.$Message.error('请登录菜管!')
          this.$router.push('/manager-dish/adminLogin')
        }
      }, err => {
        console.log(err)
        this.$Message.error('删除失败')
      })
    },
    showList: function () {
      this.$http.get('/dish/get/bypage', {
        params: {
          start: 1,
          size: 30
        }
      }).then(res => {
        this.td = res.data.data
      }, err => {
        console.log(err)
        this.$Message.error('加载失败')
      })
    }
  }
}
</script>

<style>
</style>
