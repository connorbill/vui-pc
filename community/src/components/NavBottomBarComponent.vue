<template>
    <footer>
        <div class="nav-bottom-padding" v-show="showBottomNav">
            <div class="nav-bottom" >
                <van-tabbar v-model="tabbar.active">
                    <van-tabbar-item :to="tabbar.list[0].to"  @click="changeTabbar(0)" icon="home-normal">
                        <span>社区</span>
                        <!--<img slot="icon" slot-scope="props" v-if="props.active" src="https://pic.qianxiangbank.com/waps/images/bottom-nav-main-act.png" alt="">-->
                        <!--<img slot="icon" slot-scope="props" v-if="!props.active" src="https://pic.qianxiangbank.com/waps/images/bottom-nav-main.png" alt="">-->
                        <!--<img-->
                                <!--slot="icon"-->
                                <!--slot-scope="props"-->
                                <!--:src="props.active ? tabbar.list[0].icon.active : tabbar.list[0].icon.normal"-->
                        <!--&gt;-->
                        <!--<van-icon name="home-normal" />-->
                    </van-tabbar-item>
                    <van-tabbar-item :to="tabbar.list[1].to"  @click="changeTabbar(1)" icon="topic-normal">
                        <span>话题</span>
                        <!--<img-->
                                <!--slot="icon"-->
                                <!--slot-scope="props"-->
                                <!--:src="props.active ? tabbar.list[1].icon.active : tabbar.list[1].icon.normal"-->
                        <!--&gt;-->
                    </van-tabbar-item>
                    <van-tabbar-item :to="tabbar.list[2].to" @click="changeTabbar(2)" icon="my-normal">
                        <span>我的</span>
                        <!--<img-->
                                <!--slot="icon"-->
                                <!--slot-scope="props"-->
                                <!--:src="props.active ? tabbar.list[2].icon.active : tabbar.list[2].icon.normal"-->
                        <!--&gt;-->
                    </van-tabbar-item>
                </van-tabbar>
            </div>
        </div>
    </footer>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vant';
    export default {
        name: 'NavBottomBar',
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
            // [Icon.name]: Icon
            // Tabbar,
            // TabbarItem
        },
        props: {
            tabbar: {
                type: Object
            },
            showBottomNav: {
                type: Boolean
            }
        },
        methods: {
            changeTabbar (num) {
                this.$store.commit('changeBottomActive', num);
            }
        }
    }
</script>

<style scoped>
</style>
