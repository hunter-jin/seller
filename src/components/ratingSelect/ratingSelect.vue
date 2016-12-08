<template>
  <div class="rating-select">
    <div class="ratetype">onlyContent
      <span class="block positive" :class="{'active':selectType===2}" @click="setRateType($event, 2)">
        {{rateDesc.all}}
        <span class="count">{{countAll}}</span>
      </span>
      <span class="block positive" :class="{'active':selectType===0}" @click="setRateType($event, 0)">
        {{rateDesc.positive}}
         <span class="count">{{countPositive}}</span>
      </span>
      <span class="block negative" :class="{'active':selectType===1}" @click="setRateType($event, 1)">
        {{rateDesc.negative}}
        <span class="count">{{countNegative}}</span>
      </span>
    </div>
    <div class="rating-switch" :class="{'on':selectOnlyContent }" @click="toggleSwitch($event)">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const RATE_POSITIVE = 0;
  const RATE_NEGATIVE = 1;
  const RATE_ALL = 2;

  export default {
    name: 'ratingSelect',
    props: {
      onlyContent: {
        type: Boolean,
        default: false
      },
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      rateType: {
        type: Number,
        default: RATE_ALL
      },
      rateDesc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    data () {
      return {
        selectType: this.rateType,
        selectOnlyContent: this.onlyContent
      };
    },
    methods: {
      setRateType(event, type) {
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        this.$emit('rateTypeChanged', type);
      },
      toggleSwitch(event) {
        if (!event._constructed) {
          return;
        }
        this.selectOnlyContent = !this.selectOnlyContent;
        this.$emit('onlyContentChanged', this.selectOnlyContent);
      }
    },
    computed: {
      countAll() {
        return this.ratings.length;
      },
      countPositive() {
        return this.ratings.filter(item => {
          return item.rateType === RATE_POSITIVE;
        }).length;
      },
      countNegative() {
        return this.ratings.filter(item => {
          return item.rateType === RATE_NEGATIVE;
        }).length;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/scss/base.scss";
  @import "../../common/scss/mixin.scss";
  .rating-select {

    .ratetype {
      margin: 0 18px;
      padding: 18px 0;
      font-size: 0;
      @include border-1px(rgba(7, 17, 27, 0.1));

      .block {
        display: inline-block;
        margin-right: 8px;
        display: inline-block;
        padding: 8px 12px;
        line-height: 16px;
        border-radius: 2px;
        font-size: 12px;

        &.positive {
          background-color: rgba(0, 160, 220, 0.2);
          color: rgb(77, 85, 93);

          &.active {
            background-color: rgb(0, 160, 220);
            color: rgb(255, 255, 255);
          }
        }

        &.negative {
          background-color: rgba(77, 85, 93, 0.2);
          color: rgb(77, 85, 93);

          &.active {
            background-color: rgb(77, 85, 93);
            color: rgb(255, 255, 255);
          }
        }
      }
    }

    .rating-switch {
      padding: 12px 18px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 0;
      color: rgb(147, 153, 159);
      &.on {
        .icon-check_circle {
          color: #00c850;
        }
      }

      .icon-check_circle {
        display: inline-block;
        padding-right: 4px;
        height: 24px;
        line-height: 24px;
        vertical-align: middle;
        font-size: 24px;
      }

      .text {
        display: inline-block;
        height: 24px;
        line-height: 24px;
        vertical-align: middle;
        font-size: 12px;
      }
    }
  }
</style>
