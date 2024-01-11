<template>
	<uni-search-bar :style="{backgroundColor:bgcolor}" @confirm="search" cancel-button="none" :focus="true"
		v-model="searchValue">
	</uni-search-bar>
	<view class="catogory">
		<scroll-view class="scroll-view_H" scroll-x="true"  :show-scrollbar="true">
			<template  v-for="(item,index) in articleCats">
				<view class="scroll-view-item_H " :class="{active:index==activeIndex}" v-if="item.showInNav" @click="getArticles(item.id,index)">{{item.catName}}</view>
			</template>
		</scroll-view>
		<uni-icons :type="type" class="more"></uni-icons>
	</view>

</template>

<script>
	import {getRequest} from '@/http/index.js'
	export default {
		data() {
			return {
				searchValue: '',
				bgcolor: '#e43d33',
				frontColor: '#ffffff',
				type: 'bottom',
				articleCats:[],
				activeIndex:5,
				first:true,
			}
		},
		onLoad() {
			uni.setNavigationBarColor({
				backgroundColor: this.bgcolor,
				frontColor: this.fontColor
			})
			
			this.getArticleCats();
		},
		onShow() {
			if(this.articleCats.length==0&&!this.first){
				this.getArticleCats();
			}
		},
		onHide() {
			this.first=false;
		},
		methods: {
			search(e) {
				console.log(e)
			},
			
			
			getArticleCats(){
				getRequest("api/articleCat/all").then(res=>{
					console.log(res);
					if(res.success){
						this.articleCats=res.data.articleCats;
					}
				})
			},
			getArticles(articleCatId,index){
				this.activeIndex=index;
				
			}
			
		}
	}
</script>

<style>
	.catogory {
		position: relative;

	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: 60rpx;
		border-bottom: 1upx solid #ccc;
	}
	/deep/::-webkit-scrollbar{
		display: none;
		width: 0;
		height: 0;
	}


	.scroll-view-item_H {
		display: inline-block;
		padding:0 10rpx;
		line-height: 60rpx;
		text-align: center;
		font-size: 16rpx;
	

	}
	.active{
		background-color: #e43d33;
		color: white;
	}

	.more {
		position: absolute;
		top: 10upx;
		right: 0;
		background-color: #f5f5f5;
	}
</style>