<template>
  <Row type="flex" justify="center" class="code-row-bg" align="middle">
    <Col :xs="22" :sm="10" :md="9" :lg="7">
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="username">
        <Input type="text" v-model="formInline.username" placeholder="用户名" size="large" clearable>
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="密码" size="large" clearable>
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')" style="margin-left: 4%">登录</Button>
      </FormItem>
    </Form>
    </Col>
  </Row>
</template>

<script>
// import Store from '@/store.js'
export default {
  name: 'login',
  data () {
    return {
      formInline: {
        username: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入用户名...', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码...', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.get('/login/dishmanager', {
            params: {
              account: this.formInline.username,
              password: this.formInline.password
            }
          }).then(res => {
            if (res.data.code === 0) {
              this.$Message.success('登录成功！')
              this.$router.push('/manager-dish/adminOperator')
            }
          }, err => {
            console.log(err)
            this.$Message.error('服务器请求失败')
          })
        } else {
          this.$Message.error('登录失败')
        }
      })
    }
  }
}
</script>
