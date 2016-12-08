<template>
  <div class="sub-title">
    <div class="line"></div>
    <div class="text">{{text}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'subTitle',
    props: {
      text: String
    },
    data () {
      return {
        msg: 'hello'
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .sub-title {
    display: flex;
    width: 80%;
    margin: 28px auto 24px auto;

    .line {
      flex: 1;
      position: relative;
      top: -6px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .text {
      padding: 0 12px;
      height: 14px;
      line-height: 14px;
      font-size: 14px;
      font-weight: 700;
    }
  }
</style>
