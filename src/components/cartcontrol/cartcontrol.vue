<template>
    <div class="cartcontrol">
        <transition name="move">
            <!-- 点击事件被穿透了添加click.stop.prevent 阻止冒泡 -->
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
                <div class="inner icon-shopping_cart"></div>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-thumb_down" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';

    export default{
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart(event) {
                if (!event._constructed) {
                    return;
                }
                // console.log('ssf');
                if (!this.food.count) {
                    // 给对象添加count属性
                    Vue.set(this.food, 'count', 1);
                } else {
                    this.food.count++;
                }
                // this.$dispatchEvent('cart.add',event.target);
                // console.log(event.target);
                // let eventTarget = event.target;
                this.$emit('add', event.target);
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return;
                }
                if (this.food.count) {
                    this.food.count--;
                }
            }
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
        font-size:0
        .cart-decrease
            display:inline-block
            padding:6px 0
            .inner
                line-height:24px
                display:inline-block
                font-size:24px
                opacity:1
                color:rgb(0,160,220)
            //动画完成以后，会自动添加move-transition属性
            &.move-enter-active, &.move-leave-active
                //linear 线性
                transition: all .3s linear
            //动画进入和移出的状态
            &.move-enter, &.move-leave-active
                opacity:0
                transform:translate3d(24px,0,0) rotate(180deg)
        .cart-count
            display:inline-block
            vertical-align:top
            width:12px
            padding:6px
            line-height:24px
            text-align:center
            font-size:10px
            color:rgb(147,153,159)
        .cart-add
            display:inline-block
            padding:6px 0
            line-height:24px
            font-size:24px
            color:rgb(0,160,220)
</style>
