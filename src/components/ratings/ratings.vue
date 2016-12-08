<template>
  <div class="ratings" ref="ratings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <h2 class="desc">综合评分</h2>
          <h3 class="rank">高于周边商家{{seller.rankRate}}分</h3>
        </div>
        <div class="overview-right">
          <div class="serviceScore">
            <span class="title">服务态度</span>
            <star class="star":size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="foodScore">
            <span class="title">食物评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="deliveryTime">
            <span class="title">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select
        :ratings="ratings"
        :rate-type="rateType"
        :only-content="onlyContent"
        @rateTypeChanged="rateTypeChanged"
        @onlyContentChanged="onlyContentChanged"
      ></rating-select>
      <div class="rating-wrapper">
        <ul v-if="ratings && ratings.length" class="rating-list">
          <li v-for="rating in ratings" v-show="isShowRate(rating.rateType, rating.text)" class="rating-item">
            <div class="content-left">
              <img class="avatar" width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content-right">
              <div class="username">{{rating.username}}</div>
              <div class="rateTime">{{rating.rateTime | formatDate}}</div>
              <div class="detail">
                <star class="star" :size="24" :score="rating.score"></star>
                <span class="deliveryTime" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div v-if="rating.rateType===0" class="recommend">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="recommend-item">{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from 'components/star/star';
  import Split from 'components/split/split';
  import RatingSelect from 'components/ratingSelect/ratingSelect';
  import BetterScroll from 'better-scroll';
  import {formatDate} from 'common/js/formatDate';

  const ERR_OK = 0;
  const RATE_ALL = 2;

  export default {
    name: 'ratings',
    props: {
      seller: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        ratings: [],
        onlyContent: false,
        rateType: RATE_ALL
      };
    },
    components: {
      Split,
      Star,
      RatingSelect
    },
    methods: {
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
      _initScroll() {
        this.scroll = new BetterScroll(this.$refs['ratings'], {click: true});
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    created() {
      this.$http.get('/api/ratings')
        .then(response => {
          let resp = response.body;
          if (resp.errno === ERR_OK) {
            this.ratings = resp.data;
            this.$nextTick(() => {
              this._initScroll();
            });
          }
        });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .ratings {
    position: fixed;
    top: 174px;
    bottom: 0;
    width: 100%;
    overflow: hidden;

    .rating-content {
      width: 100%;

      .overview {
        display: flex;
        padding: 18px 0;

        .overview-left {
          flex: 0 0 137px;
          width: 137px;
          padding: 6px 0;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          text-align: center;
          @media only screen and (max-width:320px) {
            flex: 0 0 110px;
            width: 110px;
          }

          .score {
            padding-bottom: 6px;
            line-height: 28px;
            font-size: 24px;
            color: rgb(255, 153, 0);
          }

          .desc {
            padding-bottom: 8px;
            line-height: 12px;
            font-size: 12px;
            color: rgb(7, 17, 27);
          }

          .rank {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .overview-right {
          flex: 1;
          padding: 6px 0 6px 24px;
          @media only screen and (max-width:320px) {
            padding-left: 6px;
          }

          .serviceScore {
            margin-bottom: 8px;
            font-size: 0;

            .title {
              display: inline-block;
              margin-right: 12px;
              line-height: 18px;
              font-size: 12px;
              color: rgb(7, 17, 27);
            }

            .star {
              display: inline-block;
              margin-right: 6px;
              line-height: 18px;
              vertical-align: top;
            }

            .score {
              display: inline-block;
              line-height: 18px;
              font-size: 12px;
              color: rgb(255, 153, 0);
            }
          }

          .foodScore {
            margin-bottom: 8px;
            font-size: 0;

            .title {
              display: inline-block;
              margin-right: 12px;
              line-height: 18px;
              font-size: 12px;
              color: rgb(7, 17, 27);
            }

            .star {
              display: inline-block;
              margin-right: 6px;
              line-height: 18px;
              vertical-align: top;
            }

            .score {
              display: inline-block;
              line-height: 18px;
              font-size: 12px;
              color: rgb(255, 153, 0);
            }
          }

          .deliveryTime {
            font-size: 0;

            .title {
              display: inline-block;
              margin-right: 12px;
              line-height: 18px;
              font-size: 12px;
              color: rgb(7, 17, 27);
            }

            .time {
              display: inline-block;
              font-size: 12px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }

      .rating-wrapper {
        width: 100%;

        .rating-list {
          padding: 18px 18px;

          .rating-item {
            display: flex;
            padding: 18px 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            &:last-child {
              border-bottom: none;
            }

            .content-left {
              flex: 0 0 28px;
              width: 28px;

              .avatar {
                border-radius: 50%;
              }
            }

            .content-right {
              position: relative;
              flex: 1;
              padding-left: 12px;

              .username {
                padding-bottom: 4px;
                line-height: 12px;
                font-size: 10px;
                color: rgb(7, 17, 27);
              }

              .rateTime {
                position: absolute;
                top: 0;
                right: 0;
                line-height: 12px;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }

              .detail {
                font-size: 0;

                .star {
                  display: inline-block;
                  padding: 0 6px 6px 0;
                }

                .deliveryTime {
                  display: inline-block;
                  line-height: 12px;
                  font-size: 10px;
                  color: rgb(147, 153, 159);
                }
              }

              .text {
                padding-bottom: 8px;
                line-height: 18px;
                font-size: 12px;
                color: rgb(7, 17, 27);
              }

              .recommend {
                font-size: 0;

                .icon-thumb_up {
                  padding-right: 6px;
                  line-height: 16px;
                  font-size: 12px;
                  color: rgb(0, 160, 220);
                }

                .recommend-item {
                  display: inline-block;
                  margin: 0 8px 6px 0;
                  padding: 0 6px;
                  border: 1px solid rgba(7, 17, 27, 0.1);
                  border-radius: 2px;
                  height: 16px;
                  line-height: 16px;
                  font-size: 9px;
                  color: rgb(147, 153, 159);
                  background: #fff;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
