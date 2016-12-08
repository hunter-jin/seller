<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{ path: '/goods', query: queryParam}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path: '/ratings', query: queryParam}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ path: '/seller', query: queryParam}">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script type="text/ecmascript-6">
import Header from 'components/header/header';
import {urlParse} from 'common/js/util.js';

// 定义常量
const ERR_OK = 0;

export default {
  name: 'app',
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  components: {
    'v-header': Header
  },
  computed: {
    queryParam() {
      let query = { 'id': this.seller.id };
      return query;
    }
  },
  created() {
    this.$http.get(`/api/seller?id=${this.seller.id}`).then((response) => {
      if (response.body.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.body.data);
      }
    }, (response) => {
    });
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "./common/scss/mixin";

#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, 0.1));

    .tab-item {
      flex: 1;
      text-align: center;

      & > a {
        display: block;
        font-size: 14px;
        font-weight: 700;
        color: rgb(77, 85, 93);

        &.active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
