<template>
  <Row type="flex" justify="center" class="code-row-bg" align="middle">
    <Col :xs="22" :sm="10" :md="9" :lg="7">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="email">
          <Input type="text" v-model="formInline.email" placeholder="邮箱" size="large" clearable>
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
          <Button @click="toRegister" style="float: right;margin-right: 4%">前去注册</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>

<script>
import Store from '@/store.js'
export default {
  name: 'login',
  data () {
    return {
      formInline: {
        email: '',
        password: ''
      },
      ruleInline: {
        email: [
          { required: true, message: '请填写邮箱.', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码.', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不会少于6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$http.get('/login/user', {
            params: {
              email: this.formInline.email,
              password: this.formInline.password
            }
          }).then(res => {
            if (res.data.code === 0) {
              this.$Message.success('登录成功!')
              Store.setIfLoginAction(res.data.data)
              this.$router.go(0)
              this.$router.push('/dishes')
              this.$Loading.finish()
            } else if (res.data.code === 104) {
              this.$Message.error('邮箱错误!')
            } else if (res.data.code === 101) {
              this.$Message.error('密码错误!')
            } else if (res.data.code === 102) {
              this.$Message.error('用户未激活，请查看邮箱激活!')
            } else if (res.data.code === 103) {
              this.$Message.error('用户已经被查封')
            } else {
              this.$Message.error('登录失败!')
            }
          }, err => {
            console.log(err)
            this.$Message.error('服务器连接失败!')
          })
        } else {
          this.$Message.error('登录失败!')
          this.$Loading.error()
        }
      })
    },
    toRegister () {
      this.$router.push('/register')
    }
  },
  created () {
    this.$http.get('/user/get').then(
      res => {
        if (res.data.code === 0) {
          this.$router.push('/')
        }
      }
    ).catch(err => { console.log(err) })
  }
}
</script>

<style scoped>
.img-logo{
  width: 100%;
}
</style>
