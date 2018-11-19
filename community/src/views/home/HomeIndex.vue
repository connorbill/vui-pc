<template>
    <div class="home-hot">
        <div class="change-tab">
            <van-tabs v-model="$store.state.homeNav"  :lineWidth="65" sticky @click="changeTab">
                <van-tab  :title="homeTopTab[0]"   class="change-tab">
                    <!--{{ item }}-->
                </van-tab>
                <van-tab  :title="homeTopTab[1]"   class="change-tab">
                    <!--{{ item }}-->
                </van-tab>
            </van-tabs>
        </div>
        <!--<keep-alive>-->
            <!--<router-view v-if="$route.meta.keepAlive"/>-->
        <!--</keep-alive>-->
        <!--<router-view v-if="!$route.meta.keepAlive"/>-->
        <router-view />
    </div>
</template>

<script>
    import { Tab, Tabs } from 'vant';
    export default {
        name: 'HomeIndex',
        components: {
            [Tabs.name]: Tabs,
            [Tab.name]: Tab
        },
        data () {
            return {
                // active: this.$store.state.homeNav,
                homeTopTab: ['热门', '钱香动态'],
                activeName: 'first'
            };
        },
        created () {
            // this.changeRouterState();
        },
        methods: {
            // changeRouterState () {
            //     if (this.$route.path === '/home' || this.$route.path === '/home/') {
            //         this.$store.commit('changeHomeNav', 0);
            //         this.$store.commit('changeBottomNav', '/home');
            //     } else {
            //         this.$store.commit('changeHomeNav', 1);
            //         this.$store.commit('changeBottomNav', '/home/dynamic');
            //     }
            // },
            changeTab: function (item, index) {
                if (item === 0) {
                    this.$router.replace('/home');
                    this.$store.commit('changeBottomNav', '/home');
                } else {
                    this.$router.replace('/home/dynamic');
                    this.$store.commit('changeBottomNav', '/home/dynamic');
                }
                this.$store.commit('changeHomeNav', item);
                // this.$store.commit('changeBottomActive', 0);
            }
        },
        watch: {
            '$route.meta': function (newVal, oldVal) {
                // console.log(this.$route)
            }
        }
    };
</script>

<style lang="scss" >
    @import "../../assets/style/lib/vant-tab";
    @import "../../assets/style/home/home";
    .normal-item-bottom{
        margin-bottom: 34px;
        &:last-child{
            margin-bottom: 0;
        }
    }

</style>
