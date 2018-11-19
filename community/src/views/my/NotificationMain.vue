<template>
    <div class="">
        <div class="change-tab">
            <van-tabs v-model="tabActive" :lineWidth="65" sticky @click="changeTab">
                <van-tab :title="topTab[0]" class="change-tab">
                    <!--{{ item }}-->
                </van-tab>
                <van-tab :title="topTab[1]" class="change-tab">
                    <!--{{ item }}-->
                </van-tab>
            </van-tabs>
        </div>
        <router-view />
    </div>
</template>

<script>
    import { Tab, Tabs } from 'vant';

    export default {
        name: 'NotificationMain',
        components: {
            [Tabs.name]: Tabs,
            [Tab.name]: Tab
        },
        data () {
            return {
                // tabActive: this.$store.state.homeNav,
                tabActive: 0,
                topTab: ['评论', '点赞']
            };
        },
        created () {
            if (this.$route.name === 'NotificationChat') {
                this.tabActive = 0;
            } else {
                this.tabActive = 1;
            }
        },
        methods: {
            changeTab: function (item, index) {
                if (item == 0) {
                    this.$router.replace({ name: 'NotificationChat' });
                } else {
                    this.$router.replace({ name: 'NotificationLike' });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>
