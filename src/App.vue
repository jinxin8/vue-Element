<template>
    <div>
        <v-header :seller="seller"></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link :to="{path:'/goods'}">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link :to="{path:'/ratings'}">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link :to="{path:'/seller'}">商家</router-link>
            </div>
        </div>
        <!-- 保留状态 -->
        <keep-alive>
        <router-view :seller="seller"></router-view>
        </keep-alive>
    </div>
</template>
 <!-- display:flex 弹性布局    flex=1让所有弹性盒模型对象的子元素都有相同的长度，忽略他们内部的内容 -->
<script>
import header from './components/header/header.vue';

const ERR_OK = 0;

export default {
    data() {
        return {
            seller: {}
        };
    },
    // created钩子
    created() {
        this.$http.get('/api/seller').then((response) => {
            response = response.body;
            if (response.errno === ERR_OK) {
                this.seller = response.data;
                // console.log(this.seller);
            }
        });
    },
    components: {
      'v-header': header
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "./common/stylus/mixin.styl"

    .tab
        display:flex
        width:100%
        height:40px
        line-height:40px
        //border-bottom:1px solid rgba(7,17,27,0.1)
        border-1px(rgba(7,17,27,0.1))
        .tab-item
            flex:1
            text-align:center
            & > a
                display:block
                font-size:14px
                color:rgb(77,85,93)
                &.active
                   color:rgb(240,20,20)
</style>
