<template>
  <Row type="flex" justify="center">
    <Col span="20">
    <Table stripe :columns="tr" :data="td" height="500"></Table>
    </Col>
  </Row>
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
          title: '姓名',
          key: 'name'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: 'QQ',
          key: 'qq'
        },
        {
          title: '电话号码',
          key: 'phonenum'
        },
        {
          title: '是否激活',
          key: 'activeStatus'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
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
              }, '删除')
            ])
          }
        }
      ],
      td: [],
      td1: []
    }
  },
  created () {
    this.$http.get('/user/get/all').then(res => {
      console.log(res)
      this.td = res.data.data
    }, err => {
      console.log(err)
      this.$Message.error('连接失败')
    })
  },
  methods: {
    remove: function (index) {
      this.$http.delete('/user/deluser', {
        params: {
          id: this.td[index].id
        }
      }).then(res => {
        this.$Message.success('删除成功')
        this.showUser()
      }, err => {
        console.log(err)
        this.$Message.error('删除失败')
      })
    },
    showUser: function () {
      this.$http.get('/user/get/all').then(res => {
        this.td = res.data.data
      }, err => {
        console.log(err)
        this.$Message.error('数据加载失败')
      })
    }
  }
}
</script>

<style>

</style>
