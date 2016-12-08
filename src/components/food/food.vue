<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img class="image" :src="food.image">
          <div class="arrow" @click="hideFood">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content border-1pxw">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cart-control-wrapper" v-show="!showBuy">
            <cart-control :food="food" v-on:cart-add="cartAdd"></cart-control>
          </div>
          <transition name="fade">
            <div class="buy" v-show="showBuy" @click="buy($event)">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select
            :ratings="this.food.ratings"
            :onlyContent="onlyContent"
            :rateType="rateType"
            :rateDesc="desc"
            @rateTypeChanged="rateTypeChanged"
            @onlyContentChanged="onlyContentChanged"
          ></rating-select>
          <div class="rating-wrapper">
            <ul v-if="food.ratings && food.ratings.length" class="ratings">
              <li v-show="isShowRate(item.rateType, item.text)" v-for="item in food.ratings" class="rating-item">
                <div class="time">
                  <span>{{item.rateTime | formatDate}}</span>
                </div>
                <div class="user">
                  <span class="username">{{item.username}}</span>
                  <img class="avatar" :src="item.avatar">
                </div>
                <div class="content">
                  <i v-if="item.rateType===0" class="icon-thumb_up"></i>
                  <i v-if="item.rateType===1" class="icon-thumb_down"></i>
                  <span class="text">{{item.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import CartControl from 'components/cartControl/cartControl';
  import Split from 'components/split/split';
  import RatingSelect from 'components/ratingSelect/ratingSelect';
  import {formatDate} from 'common/js/formatDate';
  import BetterScroll from 'better-scroll';

  const RATE_ALL = 2;

  export default {
    name: 'food',
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        rateType: RATE_ALL,
        onlyContent: false,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      showFood() {
        this.showFlag = true;
        this.rateType = RATE_ALL;
        this.onlyContent = false;
        this._initScroll();
      },
      hideFood() {
        this.showFlag = false;
      },
      buy(event) {
        if (!event._constructed) {
          return;
        }

        if (!this.food.qty) {
          this.$set(this.food, 'qty', 1);
        } else {
          this.food.qty++;
        }

        this.$emit('cart-add', event.srcElement);
      },
      cartAdd(el) {
        this.$emit('cart-add', el);
      },
      rateTypeChanged(rateType) {
        this.rateType = rateType;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      onlyContentChanged(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      isShowRate(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }

        if (this.rateType === RATE_ALL) {
          return true;
        } else {
          return this.rateType === type;
        }
      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BetterScroll(this.$refs['food'], {click: true});
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    components: {
      CartControl,
      Split,
      RatingSelect
    },
    computed: {
      showBuy() {
        return !this.food.qty;
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/scss/mixin";

  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    width: 100%;
    overflow: hidden;
    z-index: 30;
    background: #fff;
    transform: translate3d(0, 0, 0);

    &.move-enter-active, &.move-leave-active {
      transition: all 0.4s;
      opacity: 1;
    }

    &.move-enter, &.move-leave-active {
      transform: translate3d(100%, 0, 0);
      opacity: 0;
    }

    .image-header {
      position: relative;
      left: 0;
      top: 0;
      width: 100%;
      height: 0;
      padding-top: 100%;

      .image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      .arrow {
        position: absolute;
        left: 0;
        top: 0;
        padding: 10px;
        font-size: 0;

        .icon-arrow_lift {
          display: block;
          font-size: 20px;
          color: #fff;
        }
      }


    }

    .content {
      position: relative;
      margin: 18px;

      .title {
        line-height: 14px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7, 17, 27);
      }

      .detail {
        margin-top: 8px;
        line-height: 10px;
        font-size: 0px;
        color: rgb(147, 153, 159);

        .count {
          display: inline-block;
          margin-right: 12px;
          font-size: 10px;
        }

        .rating {
          display: inline-block;
          font-size: 10px;
        }
      }

      .price {
        margin-top: 18px;
        font-size: 0;

        .now {
          display: inline-block;
          margin-right: 12px;
          line-height: 14px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);

          &::first-letter {
            font-size: 10px;
            font-weight: normal;
          }
        }

        .old {
          display: inline-block;
          line-height: 14px;
          font-size: 10px;
          font-weight: 700;
          text-decoration: line-through;
          color: rgb(147, 153, 159);

          &::first-letter {
            font-weight: normal;
          }
        }
      }

      .cart-control-wrapper {
        position: absolute;
        right: 0;
        bottom: 0;
      }

      .buy {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 74px;
        height: 24px;
        line-height: 24px;
        border-radius: 12px;
        background-color: rgb(0, 160, 220);
        text-align: center;
        font-size: 10px;
        color: #fff;

        &.fade-enter-active, &.fade-leave-active {
          transition: opacity .2s;
        }

        &.fade-enter, &.fade-leave-active {
          opacity: 0;
        }
      }
    }

    .info {
      margin: 18px;

      .title {
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .text {
        margin: 6px 8px 0 8px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(77, 85, 93);
      }
    }

    .rating {
      margin: 18px 0;

      .title {
        margin: 0 18px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }

      .rating-wrapper {

        .ratings {
          padding: 0 18px;

          .rating-item {
            position: relative;
            padding-top: 16px;

            .time {
              margin-bottom: 6px;
              line-height: 16px;
              font-size: 12px;
              color: rgb(147, 153, 159);
            }

            .user {
              position: absolute;
              top: 16px;
              right: 0;
              font-size: 0;

              .username {
                display: inline-block;
                margin-right: 6px;
                line-height: 12px;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }

              .avatar {
                display: inline-block;
                width: 12px;
                height: 12px;
                line-height: 12px;
                vertical-align: top;
                border-radius: 50%;
              }
            }

            .content {
              margin: 0;
              padding-bottom: 16px;
              font-size: 0;
              @include border-1px(rgba(7, 17, 27, 0.1));

              .icon-thumb_up, .icon-thumb_down {
                margin-right: 4px;
                line-height: 24px;
                font-size: 12px;
              }

              .icon-thumb_up {
                color: rgb(0, 160, 220);
              }

              .icon-thumb_down {
                color: rgb(147, 153, 159);
              }

              .text {
                line-height: 16px;
                font-size: 12px;
                color: rgb(7, 17, 27);
              }
            }
          }
        }
      }

    }
  }
</style>
