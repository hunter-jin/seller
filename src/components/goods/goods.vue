<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul class="menu">
        <li v-for="(item, index) in goods" class="menu-item border-1px" :class="{current: currentFoodsListIndex === index}" @click="selectMenu(index, $event)">
          <span class="text">
            <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="foods-list foods-list-hack">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food, $event)">
              <div class="icon">
                <img :src="food.icon" >
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售:{{food.sellCount}}份</span>
                  <span>好评率:{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now"><span class="rmb">¥</span>{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice.length > 0"><span class="rmb">¥</span>{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" v-on:cart-add="cartAdd"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <food ref="food" :food="selectedFood" v-on:cart-add="cartAdd"></food>
    <shop-cart ref="shopcart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :select-foods="selectedFoods"></shop-cart>
  </div>
</template>
<script type="text/ecmascript-6">
  import BetterScroll from 'better-scroll';
  import ShopCart from 'components/shopCart/shopCart';
  import CartControl from 'components/cartControl/cartControl';
  import Food from 'components/food/food';

  const ERR_OK = 0;

  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        goods: [],
        scrollY: 0,
        foodsListHeights: [],
        selectedFood: {}
      };
    },
    components: {
      ShopCart,
      CartControl,
      Food
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BetterScroll(this.$refs['menu-wrapper'], { click: true });
        this.foodsScroll = new BetterScroll(this.$refs['foods-wrapper'], { probeType: 3, click: true });

        this.foodsScroll.on('scroll', pos => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calcGoodsListHeight() {
        let goodsWrapper = this.$refs['foods-wrapper'];
        let foodsList = goodsWrapper.getElementsByClassName('foods-list-hack');
        let height = 0;
        let foodsListHeights = [];

        foodsListHeights.push(height);
        for (let i = 0; i < foodsList.length; i++) {
          height += foodsList[i].offsetHeight;
          foodsListHeights.push(height);
        }

        this.foodsListHeights = foodsListHeights;
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }

        let foodsLists = this.$refs['foods-wrapper'].getElementsByClassName('foods-list-hack');
        this.foodsScroll.scrollToElement(foodsLists[index]);
      },
      cartAdd(el) {
        this.$refs['shopcart'].drop(el);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs['food'].showFood();
      }
    },
    computed: {
      currentFoodsListIndex() {
        for (let i = 0; i < this.foodsListHeights.length - 1; i++) {
          let height1 = this.foodsListHeights[i];
          let height2 = this.foodsListHeights[i + 1];

          if (this.scrollY >= height1 && this.scrollY < height2) {
            return i;
          }
        }
        return 0;
      },
      selectedFoods() {
        let selectedFoods = [];

        this.goods.forEach(item => {
          item.foods.forEach(food => {
            if (food.qty && food.qty > 0) {
              selectedFoods.push(food);
            }
          });
        });

        return selectedFoods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/goods').then((response) => {
        let res = response.body;
        if (res.errno === ERR_OK) {
          this.goods = res.data;

          this.$nextTick(() => {
            this._initScroll();
            this._calcGoodsListHeight();
          });
        }
      });
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/scss/mixin";

  .goods {
    display: flex;
    position: absolute;
    left: 0;
    top: 174px;
    bottom: 48px;
    width: 100%;
    overflow: hidden;

    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      height: 100%;
      background: #f3f5f7;

      .menu {

        .menu-item {
          display: table;
          width: 56px;
          height: 54px;
          padding: 0 12px 0 12px;
          line-height: 14px;
          @include border-1px(rgba(7, 17, 27, 0.1));

          &.current {
            margin-top: -1px;
            background-color: rgb(255, 255, 255);
            font-weight: 700;
          }

          .text {
            display: table-cell;
            height: 56px;
            line-height: 14px;
            vertical-align: middle;
            font-size: 12px;

            .icon {
              display: inline-block;
              width: 12px;
              height: 12px;
              margin-right: 2px;
              vertical-align: top;
              background-size: 12px 12px;
              background-repeat: no-repeat;

              &.decrease {
                @include background-img(decrease_3);
              }

              &.discount {
                @include background-img(discount_3);
              }

              &.special {
                @include background-img(special_3);
              }

              &.invoice {
                @include background-img(invoice_3);
              }

              &.guarantee {
                @include background-img(guarantee_3);
              }
            }
          }
        }

      }
    }

    .foods-wrapper {
      flex: 1;

      .foods-list {
        .title {
          height: 26px;
          line-height: 26px;
          padding-left: 14px;
          border-left: 1px solid #d9dde1;
          font-size: 12px;
          color: rgb(147, 157, 139);
          background-color: #f3f5f7;
        }

        .food-item {
          display: flex;
          margin: 18px 18px 0 18px;
          padding-bottom: 18px;
          @include border-1px(rgba(7, 17, 27, 0.1));
          &:last-child {
            @include border-none;
          }

          .icon {
            flex: 0 0 57px;
            margin-right: 10px;
            border-radius: 2px;

            & > img {
              width: 57px;
              height: 57px;
            }
          }

          .content {
            flex: 1;

            .name {
              margin-top: 2px;
              font-size: 14px;
              line-height: 14px;
              color: rgb(7, 17, 27);
            }

            .desc {
              margin-top: 8px;
              line-height: 20px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }

            .extra {
              margin-top: 8px;
              line-height: 10px;
              font-size: 0px;

              & > span {
                line-height: 10px;
                font-size: 10px;
                color: rgb(147, 153, 159);

                &:first-child {
                  margin-right: 8px;
                }
              }
            }

            .price {
              .now {
                line-height: 24px;
                font-size: 14px;
                font-weight: 700;
                color: rgb(240, 20, 20);

                & > .rmb {
                  font-size: 10px;
                  font-weight: normal;
                }
              }

              .old {
                text-decoration: line-through;
                line-height: 24px;
                font-size: 10px;
                font-weight: 700;
                color: rgb(147, 153, 159);

                & > .rmb {
                  font-size: 10px;
                  font-weight: normal;
                }
              }
            }

            .cart-control-wrapper {
              position: absolute;
              bottom: 10px;
              right: 0;
            }
          }
        }
      }
    }
  }
</style>
