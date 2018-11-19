<template>
    <div class="recommend-list">
        <div class="recommend-item " v-for="(item, index) in recommendList" :key="index">
            <div class="item-img" v-if="item.picArr.length > 0">
                <router-link :to="{ name: 'detail', params: { id: item.id }}">
                    <img :src="item.picArr" alt="">
                </router-link>
            </div>
            <div class="item-con">

                <router-link :to="{ name: 'detail', params: { id: item.id }}">

                    <div class="item-title">{{item.title}}</div>
                </router-link>
                <!--<div class="item-title">{{item.title}}</div>-->
                <div class="item-has-look">
                    <router-link :to="{ name: 'detail', params: { id: item.id }}">
                        <div class=" dy-talk-box">
                            <div class="person-talk dy-read-info">
                                <div class="talk-item">
                                    <span class="talk-icon look-normal-icon icon-look-num"></span>
                                    <span class="talk-number ">{{item.viewTimes | NumInt}}</span>
                                </div>
                                    <div class="talk-item">
                                        <span class="talk-icon talk-normal-icon icon-talk-num"></span>
                                        <span class="talk-number ">{{item.replyTotal | NumInt}}</span>
                                    </div>
                                <div class="talk-item" :class="item.isLike ? 'active' : '' ">
                                    <span class="talk-icon like-normal-iocn icon-like-num"></span>
                                    <span class="talk-number ">{{item.zanTotal | NumInt}}</span>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'DynamicCardComponent',
		props: ['recommendList']
	}
</script>

<style scoped>

</style>
