<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star class="star" :size="36" :score="seller.score"></star>
          <span class="ratingcount">({{seller.ratingCount}})</span>
          <span class="sellcount">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="price"><span class="stress">{{seller.minPrice}}</span>元</div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="price"><span class="stress">{{seller.deliveryPrice}}</span>元</div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="price"><span class="stress">{{seller.deliveryTime}}</span>分钟</div>
          </li>
        </ul>
        <div class="fav">
          <i class="icon-favorite" :class="{'favorited': favorited}" @click="toggleFav($event)"></i>
          <span class="text">{{favoritedText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin-wrapper">
        <h1 class="title">公告与活动</h1>
        <div class="bulletin border-1px">
          <p class="text">{{seller.bulletin}}</p>
        </div>
        <ul class="supports">
          <li v-for="item in seller.supports" class="support border-1px">
            <i class="icon" :class="classMap[item.type]"></i>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pic-wrapper">
        <h1 class="title">商家实景</h1>
        <div class="pics" ref="pics">
          <ul class="pic-list" ref="pic-list">
            <li v-for="pic in seller.pics" class="pic-item">
              <img :src="pic">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="other">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li v-for="item in seller.infos" class="info border-1px">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from 'components/star/star';
  import Split from 'components/split/split';
  import {saveToLocal, loadFromLocal} from 'common/js/store';
  import BetterScroll from 'better-scroll';

  export default {
    name: 'seller',
    props: {
      seller: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        favorited: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    components: {
      Star,
      Split
    },
    computed: {
      favoritedText() {
        return this.favorited ? '已收藏' : '收藏';
      }
    },
    methods: {
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BetterScroll(this.$refs['seller'], { click: true });
        } else {
          this.scroll.refresh();
        }
      },
      _initPicScroll() {
        if (!this.seller || !this.seller.pics) {
          return;
        }

        let picWidth = 120;
        let picMargin = 6;
        let width = this.seller.pics.length * (picWidth + picMargin) - picMargin;
        this.$refs['pic-list'].style.width = `${width}px`;

        if (!this.picScroll) {
          this.picScroll = new BetterScroll(this.$refs['pics'], {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        } else {
          this.picScroll.refresh();
        }
      },
      toggleFav(event) {
        if (!event._constructed) {
          return;
        }
        this.favorited = !this.favorited;
        saveToLocal(this.seller.id, 'favorite', this.favorited);
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    mounted() {
      console.log('mounted...');
      this.$nextTick(() => {
        this._initScroll();
        this._initPicScroll();
      });
    },
    updated() {
      console.log('updated...');
      this.$nextTick(() => {
        this._initScroll();
        this._initPicScroll();
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/scss/base";
  @import "../../common/scss/mixin";

  .seller {
    position: fixed;
    left: 0;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: hidden;

    .seller-content {
      width: 100%;

      .overview {
        position: relative;
        padding: 18px;

        .title {
          margin-bottom: 8px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc {
          padding-bottom: 18px;
          @include border-1px(rgba(7, 17, 27, 0.1));
          font-size: 0;
          color: rgb(77, 85, 93);

          .star {
            display: inline-block;
            height: 18px;
            margin-right: 8px;
            vertical-align: top;
          }

          .ratingcount {
            display: inline-block;
            margin-right: 12px;
            line-height: 18px;
            vertical-align: top;
            font-size: 10px;
          }

          .sellcount {
            display: inline-block;
            line-height: 18px;
            font-size: 10px;
            vertical-align: top;
          }

        }

        .remark {
          display: flex;
          margin-top: 18px;

          .block {
            flex: 1;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            text-align: center;

            &:last-child {
              border-right: none;
            }

            .title {
              padding-bottom: 4px;
              height: 10px;
              line-height: 10px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }

            .price {
              height: 24px;
              line-height: 24px;
              font-size: 10px;
              color: rgb(7, 17, 27);

              .stress {
                font-size: 24px;
                font-weight: 200;
              }
            }
          }

        }

        .fav {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 36px;
          text-align: center;

          .icon-favorite {
            display: block;
            margin-bottom: 4px;
            line-height: 24px;
            font-size: 24px;
            color: #d4d6d9;

            &.favorited {
              color: rgb(240, 20, 20);
            }
          }

          .text {
            display: block;
            line-height: 10px;
            height: 10px;
            font-size: 10px;
            color: rgb(77, 85, 93);
          }
        }
      }

      .bulletin-wrapper {
        padding: 18px 18px 0 18px;

        .title {
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .bulletin {
          padding: 8px 12px 16px 12px;
          @include border-1px(rgba(7, 17, 27, 0.1));

          .text {
            line-height: 24px;
            font-size: 12px;
            color: rgb(240, 20, 20);
          }
        }

        .supports {
          .support {
            padding: 16px 12px;
            @include border-1px(rgba(7, 17, 27, 0.1));
            font-size: 0;
            &:last-child {
              @include border-none;
            }

            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              background-size: 16px 16px;
              background-repeat: no-repeat;

              &.decrease {
                @include background-img(decrease_4);
              }

              &.discount {
                @include background-img(discount_4);
              }

              &.special {
                @include background-img(special_4);
              }

              &.invoice {
                @include background-img(invoice_4);
              }

              &.guarantee {
                @include background-img(guarantee_4);
              }
            }

            .text {
              margin-left: 6px;
              line-height: 16px;
              font-size: 12px;
              vertical-align: top;
              color: rgb(7, 17, 27);
              font-weight: 200;
            }
          }
        }
      }

      .pic-wrapper {
        padding: 18px;

        .title {
          margin-bottom: 12px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .pics {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;

          .pic-list {
            font-size: 0;

            .pic-item {
              display: inline-block;
              width: 120px;
              height: 90px;
              margin-right: 6px;
              &:last-child {
                margin-right: 0;
              }

              & > img {
                width: 120px;
                height: 90px;
              }
            }
          }
        }
        }

      .other {
        margin: 18px 18px 0 18px;

        .title {
          padding-bottom: 12px;
          line-height: 14px;
          @include border-1px(rgba(7, 17, 27, 0.1));
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .info {
          padding: 16px 12px;
          line-height: 16px;
          @include border-1px(rgba(7, 17, 27, 0.1));
          font-size: 12px;
          color: rgb(7, 17, 27);

          &:last-child {
            @include border-none;
          }

        }
      }
    }
  }
</style>
