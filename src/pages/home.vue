<template>
<div class="home">
  <Row type="flex" justify="center" class="code-row-bg" align="middle">
    <Col :xs="22" :sm="11" :md="10" :lg="10">
      <div class="first-col">
        <h1>想在大学里吃的明白？</h1>
        <br>
        <br>
        <Timeline>
          <TimelineItem>
            <p class="content">记住<span>优菜</span> upctx.cn</p>
          </TimelineItem>
          <TimelineItem>
            <p class="time">搜索</p>
            <MySearchComponent></MySearchComponent>
          </TimelineItem>
          <TimelineItem>
            <p class="content">下顿就吃它了！</p>
          </TimelineItem>
        </Timeline>
        <h3 style="color: red">2018-9-19</h3>
        <h3 style="color: red">新版本0.6.0已经上线！！！</h3>
        <h3 style="color: red">新版本特色：真·智能推荐！</h3>
        <Tag checkable color="primary"><span>快</span></Tag>
        <Tag checkable color="success"><span>香</span></Tag>
        <Tag checkable color="error"><span>易</span></Tag>
        <Tag checkable color="warning"><span>省</span></Tag>
      </div>
    </Col>
    <Col :xs="22" :sm="11" :md="10" :lg="10">
      <img src="./../assets/home1.jpg" alt="" class="img">
    </Col>
    <Col :xs="22" :sm="11" :md="10" :lg="10">
      <img src="./../assets/home2.jpg" alt="" class="img">
    </Col>
    <Col :xs="22" :sm="11" :md="10" :lg="10">
      <div class="second-col">
        <h3>当前版本号： <span style="color: #ff8900;font-size: 24px">0.6.0</span> 18-9-19</h3>
        <h2 style="color: red">新增功能：真·智能推荐</h2>
        <h5>历史版本号： 0.5.0 18-9-7</h5>
        <h4>新增功能：查看回复，通知</h4>
        <h5>历史版本号： 0.4.1 18-9-5</h5>
        <h4>新增功能：上传头像压缩图片</h4>
        <h5>历史版本号： 0.4.0 18-9-4</h5>
        <h4>新增功能：新增功能：头像</h4>
        <h5>历史版本号： 负0.3.0 18-9-2</h5>
        <h4>新增功能：新增功能：给回复点赞</h4>
        <h5>历史版本号： 负0.2.0 18-8-23</h5>
        <h4>新增功能：新增功能：餐厅</h4>
        <h5>历史版本号： 负0.1.0 18-8-17</h5>
        <h4>新增功能：个人信息功能 大幅度优化UI</h4>
        <h5>历史版本号： 负0.0.8 18-8-14</h5>
        <h4>新增功能：压缩网页尺寸，加快加载速度，无图模式优化</h4>
        <h4 style="color: green">感谢upctx13级lhy学长给予宝贵建议！</h4>
        <h5>历史版本号： 负0.0.7 18-8-13</h5>
        <h4>新增功能：点赞菜</h4>
        <h5>历史版本号： 负0.0.6 18-8-12</h5>
        <h4>新增功能：搜索框2.0(智能提示)</h4>
        <h5>历史版本号： 负0.0.5 18-8-11</h5>
        <h4>新增功能：搜索框1.0</h4>
        <h5>历史版本号： 负0.0.4 18-8-10</h5>
        <h4>新增功能：互相回复</h4>
        <h5>历史版本号： 负0.0.3 18-8-9</h5>
        <h4>新增功能：回复系统</h4>
        <h5>历史版本号： 负0.0.2 18-8-8</h5>
        <h4>新增功能：打分系统</h4>
        <h5>历史版本号： 负0.0.1 18-8-7</h5>
        <h4>新增功能：注册登录</h4>
        <p>此版本为开发人员内测版本，各种账户有小概率被删除风险</p>
        <p>各种功能样式并不完善，感谢您的测试！</p>
        <p>再次感谢您的支持！</p>
      </div>
    </Col>
  </Row>
</div>
</template>

<script>
import MySearchComponent from '@/components/search-component'
export default {
  components: {MySearchComponent},
  name: 'home',
  data () {
    return {
      recommendDishes: []
    }
  }
}
</script>

<style lang="stylus" scoped>
.home{
  .img{
    width 100%
    margin-top 28px
  }
  .first-col{
    @media screen and (max-width: 768px){
      font-size 12px
    }
    font-size 16px
    .time{
      @media screen and (max-width: 768px){
        font-size 18px
      }
      font-size 24px
    }
    .content{
      @media screen and (max-width: 768px){
        font-size 22px
      }
      font-size 30px
      span{
        @media screen and (max-width: 768px){
          font-size 22px
        }
        color #fa7c21
        font-size 30px
      }
    }
    span{
      @media screen and (max-width: 768px){
        font-size 14px
      }
      font-size 20px
    }
  }
  .second-col{
    margin 50px
  }
}
</style>
