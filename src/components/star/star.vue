<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" class="star-item" :class="itemClass"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_HALF = 'half';
  const CLS_OFF = 'off';

  export default {
    name: 'star',
    props: {
      size: {
        type: Number,
        default: 48
      },
      score: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {};
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let s = Math.floor(this.score * 2) / 2;
        let sInteger = Math.floor(s);
        let sDecimal = s % 1;
        let classes = [];

        for (var i = 0; i < sInteger; i++) {
          classes.push(CLS_ON);
        }

        if (sDecimal !== 0) {
          classes.push(CLS_HALF);
        }

        while (classes.length < LENGTH) {
          classes.push(CLS_OFF);
        }

        return classes;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/scss/mixin";

  .star {
    font-size: 10px;

    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
      font-size: 0;
    }

    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }

        &.on {
          @include background-img(star48_on);
        }

        &.half {
          @include background-img(star48_half);
        }

        &.off {
          @include background-img(star48_off);
        }
      }
    }

    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 8px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0;
        }

        &.on {
          @include background-img(star36_on);
        }

        &.half {
          @include background-img(star36_half);
        }

        &.off {
          @include background-img(star36_off);
        }
      }
    }

    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 2px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0;
        }

        &.on {
          @include background-img(star24_on);
        }

        &.half {
          @include background-img(star24_half);
        }

        &.off {
          @include background-img(star24_off);
        }
      }
    }
  }
</style>
