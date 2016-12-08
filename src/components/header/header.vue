<template>
  <div id="header" class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width=64 height=64 :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-icon"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div v-show="detaShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <sub-title text="优惠信息"></sub-title>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item, index) in seller.supports" class="support">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="name">{{item.description}}</span>
              </li>
            </ul>
            <sub-title text="商家公告"></sub-title>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from 'components/star/star';
  import SubTitle from 'components/subTitle/subTitle';

  export default {
    name: 'header',
    props: {
      seller: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        detaShow: false
      };
    },
    methods: {
      showDetail() {
        this.detaShow = true;
      },
      hideDetail() {
        this.detaShow = false;
      }
    },
    components: {
      Star,
      SubTitle
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../common/scss/mixin";

  .header {
    position: relative;
    color: rgb(255, 255, 255);
    background-color: rgba(7, 17, 27, 0.6);

    .content-wrapper {
      position: relative;
      height: 64px;
      padding: 24px 12px 18px 24px;
      font-size: 0;

      .avatar {
        display: inline-block;
        margin-right: 16px;

        & > img {
          border-radius: 2px;
        }
      }

      .content {
        display: inline-block;
        vertical-align: top;

        .title {
          margin-top: 2px;

          .brand {
            display: inline-block;
            width: 30px;
            height: 20px;
            margin-right: 6px;
            background-size: 30px 18px;
            background-repeat: no-repeat;
            @include background-img(brand);
          }

          .name {
            display: inline-block;
            height: 18px;
            line-height: 18px;
            vertical-align: top;
            font-size: 16px;
            font-weight: bold;
          }
        }

        .desc {
          margin-top: 8px;
          font-size: 12px;
        }

        .supports {
          margin-top: 10px;

          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;

            &.decrease {
              @include background-img(decrease_1);
            }

            &.discount {
              @include background-img(discount_1);
            }

            &.special {
              @include background-img(special_1);
            }

            &.invoice {
              @include background-img(invoice_1);
            }

            &.guarantee {
              @include background-img(guarantee_1);
            }
          }

          .text {
            font-size: 10px;
            line-height: 12px;
            vertical-align: top;
          }
        }
      }

      .support-count {
        position: absolute;
        right: 12px;
        bottom: 20px;
        height: 24px;
        padding: 0px 8px;
        line-height: 24px;
        border-radius: 14px;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.2);

        .count {
          font-size: 10px;
          vertical-align: top;
        }

        .icon-keyboard_arrow_right {
          margin-left: 2px;
          font-size: 10px;
          line-height: 24px;
        }
      }

    }

    .bulletin-wrapper {
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 24px 0 12px;
      background: rgba(7, 17, 27, 0.2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 10px;

      .bulletin-icon {
        display: inline-block;
        width: 22px;
        height: 12px;
        margin-top: 8px;
        margin-right: 4px;
        vertical-align: top;
        background-size: 22px 12px;
        background-repeat: no-repeat;
        @include background-img(bulletin)
      }

      .icon-keyboard_arrow_right {
        position: absolute;
        right: 12px;
        top: 0;
        line-height: 28px;
      }

    }

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: -1;
      filter: blur(10px);

      & > img {
        width: 100%;
        height: 100%;
      }

    }

    .detail {
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(7, 17, 27, 0.8);
      backdrop-filter: blur(10px);

      &.fade-enter-active, &.fade-leave-active {
        transition: opacity .5s;
      }

      &.fade-enter, &.fade-leave-active {
        opacity: 0;
      }

      .detail-wrapper {
        width: 100%;
        min-height: 100%;

        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;

          .name {
            font-size: 16px;
            line-height: 16px;
            font-weight: 700;
            text-align: center;
          }

          .star-wrapper {
            height: 24px;
            margin-top: 16px;
            text-align: center;
          }

          .supports {
            width: 80%;
            margin: 0 auto;
            font-size: 0;

            .support {
              margin: 0 12px 12px 12px;
              font-size: 0;

              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 6px;
                vertical-align: top;
                background-size: 16px 16px;
                background-repeat: no-repeat;

                &.decrease {
                  @include background-img('decrease_2');
                }

                &.discount {
                  @include background-img(discount_2);
                }

                &.special {
                  @include background-img(special_2);
                }

                &.invoice {
                  @include background-img(invoice_2);
                }

                &.guarantee {
                  @include background-img(guarantee_2);
                }
              }

              .name {
                display: inline-block;
                vertical-align: top;
                line-height: 16px;
                font-size: 12px;
                font-weight: 200;
              }
            }
          }

          .bulletin {
            width: 80%;
            margin: 0 auto;
            font-size: 0;

            .content {
              display: block;
              padding: 0 12px 0 12px;
              line-height: 24px;
              font-size: 12px;
              font-weight: 200;
            }
          }
        }
      }

      .detail-close {
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
</style>
