<template>
    <header>
        <div class="nav-top-padding" v-if="showTopNav">
            <div class="nav-top">
                <van-nav-bar
                        :title="navTitleWord"
                        left-arrow
                        @click-left="onClickLeft"
                        @click-right="onClickRight"
                />
            </div>
        </div>
    </header>
</template>

<script>
    import { NavBar } from 'vant';
    export default {
        name: 'NavTopBar',
        components: {
            [NavBar.name]: NavBar
        },
        data () {
            return {
                // navTitle: ''
            };
        },
        props: {
            navTitleWord: {
                type: String
            },
            showTopNav: {
                type: Boolean
            }
        },
        methods: {
            onClickLeft () {
                window.history.length > 1 ? this.$router.back() : this.$router.push('/');
            },
            onClickRight () {
                // Toast('按钮');
            }
        }
    };
</script>

<style scoped>

</style>
