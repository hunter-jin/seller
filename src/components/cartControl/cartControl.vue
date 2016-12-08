<template>
  <div class="cart-control">
    <transition name="move">
      <div v-show="food.qty > 0" class="dec" @click.stop.prevent="decQty($event)">
        <div class="inner">
          <i class="icon-remove_circle_outline"></i>
        </div>
      </div>
    </transition>
    <div v-show="food.qty > 0" class="qty">{{food.qty}}</div>
    <div class="inc" @click.stop.prevent="incQty($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'cartControl',
    props: {
      food: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data () {
      return {};
    },
    methods: {
      decQty(event) {
        if (!event._constructed) {
          return;
        }

        if (!this.food.qty) {
          this.$set(this.food, 'qty', 0);
        } else {
          this.food.qty--;
        }
      },
      incQty(event) {
        if (!event._constructed) {
          return;
        }

        if (!this.food.qty) {
          this.$set(this.food, 'qty', 1);
        } else {
          this.food.qty++;
        }

        this.$emit('cart-add', event.srcElement);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .cart-control {
    font-size: 0;

    .dec {
      display: inline-block;
      padding: 6px;
      height: 24px;
      vertical-align: top;

      .inner {
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
      }

      &.move-enter-active, &.move-leave-active {
        transition: all .5s linear;
        transform: translate3d(0, 0, 0);
        .inner {
          transition: all .5s linear;
          transform: rotate(0deg);
        }
      }

      &.move-enter, &.move-leave-active {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner {
          transform: rotate(180deg);
        }
      }
    }

    .qty {
      display: inline-block;
      width: 12px;
      padding: 6px 0;
      line-height: 24px;
      text-align: center;
      vertical-align: top;
      font-size: 12px;
      font-weight: 200;
      color: rgb(147, 153, 159);
    }

    .inc {
      display: inline-block;
      padding: 6px;
      height: 24px;
      line-height: 24px;
      vertical-align: top;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }

  }
</style>
