<template>
	<view>
		<!-- 基础表单校验 -->
		<uni-forms ref="articleForm" :rules="rules" :modelValue="article">
			<uni-forms-item required name="articleCatId">
				<picker @change="bindArticleCatChange" mode="selector" :value="index" :range="articleCats"
					range-key="catName">
					<uni-easyinput v-model="articleCats[index].catName"></uni-easyinput>
				</picker>
			</uni-forms-item>
			<uni-forms-item required name="title">
				<uni-easyinput v-model="article.title" placeholder="请输入文章标题" />
			</uni-forms-item>

			<uni-forms-item required name="content">
				<bgyxedit @bgyxchange="getbgyxinfo" :showdone="false"
					uploadurl="#" filename="img"></bgyxedit>
			</uni-forms-item>

		</uni-forms>
		<button type="primary" @click="submit('articleForm')">提交</button>
	</view>
</template>

<script>
	import {
		getArticleCats
	} from '@/http/article.js'
	export default {
		data() {
			return {
				article: {
					id: 0,
					articleCatId: 0,
					title: '',
					content: '',
					status: 0,
					userinfoId: 0
				},
				articleCats: [{
					id: 0,
					catName: ''
				}],
				index: 0,
				rules: []


			}
		},
		onLoad() {
			this.getAllArticleCats();
		},
		methods: {
			change(e) {

			},
			getAllArticleCats() {
				const that = this;
				const url = `articleCat/getArticleCatsByField?fields=cat_name,id`;
				getArticleCats(url).then(res => {
					if (res.success) {
						that.articleCats = res.data.data;
					} else {
						uni.showToast({
							title: 'res.msg'
						})
					}

				})
			},
			bindArticleCatChange(e) {
				let index = e.detail.value;
				this.index = index;
				console.log(e);
			},
			getbgyxinfo(e) {
				//获取富文本内容，默认模式拼接的html
				console.log(e.html)
				
			}

		}
	}
</script>

<style>
	.wrapper {
		height: 100%;
	}

	.editor-wrapper {
		height: calc(100vh - var(--window-top) - var(--status-bar-height) - 140px);
		background: #fff;
	}

	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 20px;
	}

	.toolbar {
		box-sizing: border-box;
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}

	.ql-container {
		box-sizing: border-box;
		padding: 12px 15px;
		width: 100%;
		min-height: 30vh;
		height: 100%;
		margin-top: 20px;
		font-size: 16px;
		line-height: 1.5;
	}

	.ql-active {
		color: #06c;
	}
</style>