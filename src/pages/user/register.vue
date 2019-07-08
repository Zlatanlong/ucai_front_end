<template>
  <Row type="flex" justify="center" class="register code-row-bg">
    <Col :xs="22" :sm="10" :md="8" :lg="8">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" label-position="top">
        <FormItem label="用户名" prop="username">
          <Input type="text" v-model="formCustom.username" size="large" clearable placeholder="这是能被别人所看到的名字"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input type="text" v-model="formCustom.email" size="large" clearable  placeholder="这是你认证账号的凭证"></Input>
        </FormItem>
        <FormItem label="密码" prop="passwd">
          <Input type="password" v-model="formCustom.passwd" size="large" clearable placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck" size="large" clearable placeholder="请确定密码"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">重填</Button>
          <Button @click="toLogin" style="margin-right: 3%;float: right">直接登录</Button>
        </FormItem>
      </Form>
    </Col>
  </Row>
</template>
<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        // 没有输入密码
        callback(new Error('请输入密码！'))
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认你的密码！'))
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    const validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空！'))
      } else {
        this.$http.get('/register/hasname', {
          params: {
            name: this.formCustom.username
          }
        }).then(res => {
          if (res.data.code === 0) {
            callback()
          } else if (res.data.code === 602) {
            callback(new Error('用户名已被注册'))
          } else {
            callback(new Error('未知错误'))
          }
        }, err => {
          callback(new Error('无法连接服务器'))
          console.log(err)
        })
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('邮箱不能为空！'))
      } else {
        this.$http.get('/register/hasemail', {
          params: {
            email: this.formCustom.email
          }
        }).then(res => {
          if (res.data.code === 0) {
            callback()
          } else if (res.data.code === 601) {
            callback(new Error('邮箱已被注册'))
          } else {
            callback(new Error('未知错误'))
          }
        }, err => {
          callback(new Error('无法连接服务器'))
          console.log(err)
        })
      }
    }

    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        username: '',
        email: ''
      },
      ruleCustom: {
        username: [
          { type: 'string', min: 2, message: '请起个长一点的名字', trigger: 'blur' },
          { validator: validateUserName, trigger: 'blur' }
        ],
        email: [
          { type: 'email', min: 11, max: 11, message: '请输入正确的邮箱地址', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        passwd: [
          { type: 'string', min: 6, message: '请设置大于6位的密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Spin.show()
          this.$http.post('/register/doregister', {
            email: this.formCustom.email,
            password: this.formCustom.passwd,
            name: this.formCustom.username
          }).then(res => {
            this.$Spin.hide()
            if (res.data.code === 0) {
              this.$Modal.success({
                title: '注册成功',
                content: '请前往邮箱激活！',
                onOk: () => {
                  this.$router.push('/login')
                },
                onCancel: () => {
                  this.$router.push('/login')
                }
              })
            } else {
              this.$Message.error('注册失败!')
            }
          }, err => {
            this.$Spin.hide()
            this.$Message.error('注册失败!')
            console.log(err)
          })
        } else {
          this.$Message.error('注册失败!')
          this.$Loading.error()
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    toLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.register{
  height: 500px;
}
</style>
