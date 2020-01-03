<template>
<div>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <div class="back" @click="hide">
                        <i class="icon-add_circle"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol @add="addFood" :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect @select="selectRating" @toggle="toggleContent" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <!-- v-show 绑定一个函数进行标签的展示 -->
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" class="ratings-item border-1px" :key="index">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p  class="text">
                                    <span :class="{'icon-arrow_lift':rating.rateType===0,'icon-check_circle':rating.rateType===1}"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</div>

</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import Vue from 'vue';
    import cartcontrol from '../cartcontrol/cartcontrol';
    import split from '../split/split';
    import ratingselect from '../ratingselect/ratingselect';
    // 导入模块 es6语法 导入部分，引入非default时，使用花括号
    import {formatDate} from '../../common/js/date';

    // const POSITIVE = 0;
    // const NEGATIVE = 1;
    const ALL = 2;

    export default{
        components: {
            cartcontrol,
            split,
            ratingselect
        },
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        // 过滤器，数据处理器
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm');
            }
        },
        methods: {
            show() {
                this.showFlag = true;
                // 状态初始化
                this.selectType = ALL;
                this.onlyContent = false;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            hide() {
                this.showFlag = false;
            },
            addFirst(event) {
                if (!event._constructed) {
                    return;
                }
                this.$emit('add', event.target);
                Vue.set(this.food, 'count', 1);
            },
            addFood(target) {
                this.$emit('add', target);
            },
            selectRating(type) {
                this.selectType = type;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            toggleContent() {
                this.onlyContent = !this.onlyContent;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
            needShow(type, text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if (this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin";
    .food
        position:fixed
        left:0
        top: 0
        bottom:48px
        z-index:30
        width:100%
        background:#fff
        &.move-enter-active, &.move-leave-active
            transition:all .2s linear
        &.move-enter, &.move-leave-active
            transform:translate3d(100%,0,0)
        .image-header
            position:relative
            width:100%
            height:0
            //建一个容器，是图片在这个容器中的宽高相等填充容器
            padding-top:100%
            img
                position:absolute
                top:0
                left:0
                width:100%
                height:100%
            .back
                position:absolute
                top:10px
                left:0
                .icon-add_circle
                    display:block
                    padding:10px
                    font-size:20px
                    color:#fff
        .content
            position:relative
            padding:18px
            .title
                line-height:14px
                margin-bottom:8px
                font-size:14px
                font-weight:700
                color:rgb(7,17,27)
            .detail
                margin-bottom:18px
                line-height:10px
                height:10px
                font-size:0
                .sell-count, .rating
                    font-size:10px
                    color:rgb(147,153,159)
                .sell-count
                    margin-right:12px
            .price
                font-weight:700
                line-height:24px
                .now
                    margin-right:8px
                    font-size:14px
                    color:rgb(240,20,20)
                .old
                    text-decoration:line-through
                    font-size:10px
                    color:rgb(147,153,159)
            .cartcontrol-wrapper
                position:absolute
                right:12px
                bottom:12px
            .buy
                position:absolute
                right:18px
                bottom:18px
                z-index:10
                height:24px
                line-height:24px
                padding:0 12px
                box-sizing:border-box
                font-size:10px
                border-radius:12px
                color:#fff
                background:rgb(0,160,220)
                opacity: 1
                &.fade-enter-active, &.fade-leave-active
                    transition: all 0.2s
                &.fade-enter, &.fade-leave-active
                    opacity: 0
                    z-index: -1
        .info
            padding:18px
            .title
                line-height:14px
                margin-bottom:6px
                font-size:14px
                color:rgb(7,17,27)
            .text
                line-height:24px
                padding:0 8px
                font-size:12px
                color:rgb(77,85,93)
        .rating
            padding-top:18px
            .title
                line-height:14px
                margin-left:18px
                font-size:14px
                color:rgb(7,17,27)
            .rating-wrapper
                padding:0 18px
                .ratings-item
                    position:relative
                    padding:16px 0
                    border-1px(rgba(7,17,27,0.1))
                    .user
                        position:absolute
                        right:0
                        top:16px
                        line-height:12px
                        font-size:0
                        .name
                            display:inline-block
                            margin-right:6px
                            vertical-align:top
                            font-size:10px
                            color:rgb(147,153,159)
                        .avatar
                            border-radius:50%
                    .time
                        line-height:12px
                        font-size:10px
                        color:rgb(147,153,159)
                        margin-bottom:6px
                    .text
                        line-height:16px
                        font-size:12px
                        color:rgb(7,17,27)
                        .icon-arrow_lift, .icon-check_circle
                            margin-right:4px
                            line-height:16px
                            font-size:12px
                        .icon-arrow_lift
                            color:rgb(0,160,220)
                        .icon-check_circle
                            color:rgb(147,153,159)
                .no-rating
                    padding:16px
                    font-size:12px
                    color:rgb(147,153,159)
</style>
