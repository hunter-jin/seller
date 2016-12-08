<template>
  <div class="shopcart">
    <div class="content-wrapper">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalQty>0}"><i class="icon-shopping_cart"></i></div>
            <div v-show="totalQty > 0" class="count">{{totalQty}}</div>
          </div>
          <div class="money" :class="{highlight: totalQty>0}">¥{{totalMoney}}</div>
          <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="{engough: totalMoney >= minPrice}" @click.stop.prevent="pay">{{payHint}}</div>
        </div>
      </div>
      <div class="balls-container">
        <template v-for="ball in balls">
          <transition
            name="drop"
            @before-enter="dropBeforeEnter"
            @enter="dropEnter"
            @after-enter="dropAfterEnter"
            :css="true"
          >
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </template>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="showList">
          <div class="list-header">
            <span class="title">购物车</span>
            <span class="empty" @click="emptyCart">清空</span>
          </div>
          <div class="list-content" ref="foods-list-hook">
            <ul>
              <li v-for="item in selectFoods" class="list-item">
                <span class="name">{{item.name}}</span>
                <span class="price">¥{{item.price*item.qty}}元</span>
                <span class="cart-control-wrapper">
              <cart-control :food="item"></cart-control>
            </span>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div v-show="showList" @click="hideList" class="shopcart-list-bg"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BetterScroll from 'better-scroll';
  import CartControl from 'components/cartControl/cartControl';

  export default {
    name: 'shopCart',
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [{
            qty: 2,
            price: 18
          }];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        fold: true,
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        dropBalls: []
      };
    },
    computed: {
      totalQty() {
        let totalQty = 0;
        this.selectFoods.forEach(item => {
          totalQty += item.qty;
        });
        return totalQty;
      },
      totalMoney() {
        let totalMoney = 0;
        this.selectFoods.forEach(item => {
          totalMoney += item.qty * item.price;
        });

        return totalMoney;
      },
      payHint() {
        let hintText;

        if (this.totalMoney === 0) {
          hintText = `¥${this.minPrice}元起送`;
        } else if (this.totalMoney < this.minPrice) {
          let diffMoney = this.minPrice - this.totalMoney;
          hintText = `还差¥${diffMoney}元起送`;
        } else {
          hintText = '去结算';
        }

        return hintText;
      },
      showList() {
        let show = false;
        if (this.totalQty <= 0) {
          this.fold = true;
          return;
        }
        show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.foodScroll) {
              console.log(this.$refs['foods-list-hook'].offsetHeight);
              this.foodScroll = new BetterScroll(this.$refs['foods-list-hook'], { click: true });
            } else {
              console.log(this.$refs['foods-list-hook'].offsetHeight);
              this.foodScroll.refresh();
            }
          });
        }

        return show;
      }
    },
    methods: {
      drop(el) {
        for (let idx = 0; idx < this.balls.length; idx++) {
          let ball = this.balls[idx];
          if (ball.show === false) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      dropBeforeEnter(el) {
        let count = this.dropBalls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
            return;
          }
        }
      },
      dropEnter(el) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3d(0, 0, 0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
          inner.style.transform = 'translate3d(0, 0, 0)';
        });
      },
      dropAfterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          ball.el = null;
          el.style.display = 'none';
        }
      },
      toggleList() {
        if (!this.totalQty) {
          return;
        }
        this.fold = !this.fold;
      },
      hideList() {
        this.fold = true;
      },
      emptyCart() {
        this.selectFoods.forEach(food => {
          food.qty = 0;
        });
      },
      pay() {
        if (this.totalMoney < this.minPrice) {
          return;
        }

        window.alert('付款:' + this.totalMoney);
      }
    },
    components: {
      CartControl
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;

    .content-wrapper {

      .content {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        z-index: 100;
        color: rgba(255, 255, 255, 0.4);

        .content-left {
          flex: 1;
          background: #141d27;
          font-size: 0;

          .logo-wrapper {
            display: inline-block;
            position: relative;
            top: -10px;
            left: 0;
            width: 56px;
            height: 56px;
            padding: 6px;
            margin: 0 8px 0 12px;
            box-sizing: border-box;
            border-radius: 50%;
            background: #141d27;
            .logo {
              width: 44px;
              height: 44px;
              border-radius: 50%;
              background: #2b343d;
              line-height: 44px;
              text-align: center;
              font-size: 24px;

              &.highlight {
                background-color: rgb(0, 160, 220);
                color: #fff;
              }
            }

            .count {
              position: absolute;
              top: 0;
              right: 0;
              width: 24px;
              height: 16px;
              line-height: 16px;
              border-radius: 8px;
              box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
              text-align: center;
              font-size: 9px;
              font-weight: 700;
              background-color: rgb(240, 20, 20);
              color: rgb(255, 255, 255);
            }
          }

          .money {
            display: inline-block;
            margin-top: 16px;
            padding-right: 12px;
            line-height: 16px;
            vertical-align: top;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 16px;
            font-weight: 700;

            &.highlight {
              color: #fff;
            }
          }

          .desc {
            display: inline-block;
            margin-left: 12px;
            height: 48px;
            line-height: 48px;
            vertical-align: top;
            font-size: 12px;
            font-weight: 300;
          }
        }

        .content-right {
          flex: 0 0 105px;
          width: 105px;

          .pay {
            padding: 0 8px;
            box-sizing: border-box;
            height: 48px;
            line-height: 48px;
            background: #2b343d;
            font-size: 16px;
            font-weight: 700;
            text-align: center;

            &.engough {
              background-color: #00b43c;
              color: #fff;
            }
          }
        }
      }

      .balls-container {
        .ball {
          position: fixed;
          left: 32px;
          bottom: 22px;
          z-index: 200;
          &.drop-enter-active {
            transition: all 0.4s cubic-bezier(.08,-0.55,.68,.09);

            .inner {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background-color: rgb(0, 160, 260);
              transition: all 0.4s linear;
            }
          }
        }
      }

      .shopcart-list {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 20;
        transform: translate3d(0, -100%, 0);

        &.fold-enter-active, &.fold-leave-active {
          transition: all .5s;
        }

        &.fold-enter, &.fold-leave-active {
          transform: translate3d(0, 0, 0);
        }

        .list-header {
          height: 40px;
          line-height: 40px;
          padding: 0 18px;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          background-color: #f3f5f7;

          .title {
            float: left;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }

          .empty {
            float: right;
            font-size: 12px;
            color: rgb(0, 160, 220);
            cursor: hand;
          }
        }

        .list-content {
          padding: 0 18px;
          max-height: 217px;
          overflow: hidden;
          background-color: #fff;

          .list-item {
            position: relative;
            height: 24px;
            padding: 12px 0px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            &:last-child {
              border-bottom: none;
            }

            .name {
              position: absolute;
              left: 0;
              top: 12px;
              height: 24px;
              line-height: 24px;
              font-size: 14px;
              color: rgb(7, 17, 27);

              &:first-child {
                font-size: 10px;
              }
            }

            .price {
              position: absolute;
              right: 90px;
              top: 12px;
              line-height: 24px;
              font-size: 14px;
              font-weight: 700;
              color: rgb(240, 20, 20);
            }

            .cart-control-wrapper {
              position: absolute;
              line-height: 48px;
              right: 2px;
              top: 6px;
            }
          }
        }
      }
    }

    .shopcart-list-bg {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: rgba(7, 17, 27, 0.6);
      backdrop-filter: blur(10px);

      &.fade-enter-active, &.fade-leave-active {
        transition: opacify .4s;
        opacity: 1;
      }

      &.fade-enter, &.fade-leave-active {
        opacity: 0;
      }
    }
  }
</style>
