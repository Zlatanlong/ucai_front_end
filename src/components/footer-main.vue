<template>
  <div class="footer">
    <Row type="flex" justify="center" class="code-row-bg">
      <Col :xs="20" :sm="16" :md="12" :lg="8">
        <Row type="flex" justify="center">
          联系客服 • 关于U菜 • 关于我们 • 特别鸣谢
        </Row>
        <Row type="flex" justify="center">
          鲁ICP备18033953号 • <a href="http://www.miitbeian.gov.cn" target="_blank">工信部首页</a> • ALL RIGHTS RESERVED
        </Row>
        <Row type="flex" justify="center">
          UPCTX.CN © 2017-2018
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'footer-main'
}
</script>

<style lang="stylus" scoped>
.footer{
  @media screen and (max-width: 768px){
    font-size: 10px;
  }
  padding: 30px  0;
  font-size: 14px;
}
a {
  color: #515a6e;
}
</style>
