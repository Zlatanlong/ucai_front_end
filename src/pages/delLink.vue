<template>
  <Row type="flex" justify="center">
    <Col span = "12">
      <Button type="success" long @click="toAdminOperator">查看全部用户</Button>
      <Button type="success" long @click="toUserOperator">查看全部菜品</Button>
    </Col>
  </Row>
</template>
<script>
export default {
  name: 'delLink',
  data () {
    return {}
  },
  methods: {
    toAdminOperator: function () {
      this.$router.push({path: '/adminOperator'})
    },
    toUserOperator () {
      this.$router.push('/userOperator')
    }
  }
}
</script>
