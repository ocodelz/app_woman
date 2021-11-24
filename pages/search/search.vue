<template>
	<view>
		<u-navbar :is-back="false" :background="background" back-icon-color="#fff" class="navbar" :border-bottom="false">
			<view class="flex flex-1 align-center bg-white rounded-circle  ml-2" style="height: 60rpx;">
				<u-icon class="ml-2" name="search" color="#909399" :size="28"></u-icon>
				<u-input focus v-model="searchValue" placeholder="请输入要搜索商品的信息" placeholder-style="font-size:24rpx;margin-left:10rpx;"
				 class="ml-1" style="font-size: 12rpx;" confirm-type="search" type="text" @confirm="handleConfirm"></u-input>
			</view>
			<view class="flex align-center justify-center" style="width: 100rpx;" @click="handleTapCancel">
				<text class="text-white">取消</text>
			</view>
		</u-navbar>
		<view class="content">
			<view v-if="list.length && !searchValue" class="flex align-center justify-center flex-column mt-2">
				<view class="flex justify-between align-center" style="width: 96%;">
					<text class="font-weight-bold">搜索历史</text>
					<u-icon v-show="closeable == false" name="trash" color="#ccc" size="32" @click="closeable = !closeable"></u-icon>
					<view class="flex justify-end align-center" v-show="closeable == true">
						<text class="text-muted font-small" v-show="closeable == true" @click="handleDeleteAllTag">全部删除 |</text>
						<text class="font-small text-danger" v-show="closeable == true" @click="closeable = !closeable">完成</text>
					</view>
				</view>
				<view class="flex flex-wrap align-center mt-2 justify-start" v-if="list.length" style="width: 96%;">
					<view v-for="(item,index) in list" :key="index" class="flex align-center justify-center px-2 rounded mb-2">
						<u-tag :closeable="closeable" shape="circle" mode="dark" :text="item" bg-color="#efefef" color="#000" @click="handleTapTag(item)"
						 @close="handleDeleteTag(index)" />
					</view>
				</view>
			</view>
			<!-- 数据列表 -->
<!-- 			<view class="flex flex-column w-100 align-center justify-center" v-for="(item,index) in searchList" :key="index">
				<view class="border-bottom bg-white py-2 font-sm" style="width: 94%;" @click="handleTapItem(item)">{{item.e_name}}</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#fc979f',
				},
				closeable: false,
				searchValue: '',
				list: [],
				searchList: []
			}
		},
		onShow() {
			let arr = uni.getStorageSync('tag') || [];
			if (arr !== []) {
				this.list = arr;
			}
		},
		onPageScroll() {
			uni.hideKeyboard();
		},
		methods: {
			handleTapCancel() {
				uni.navigateBack();
			},
			handleTapItem(item) {
				this.searchValue = item.e_name;
				if (this.list.indexOf(this.searchValue) == -1) {
					this.list.unshift(item.e_name);
					uni.setStorageSync('tag', this.list)
					this.$u.route('/pages/productDetail/productDetail?detail=' + item.e_name)
				}
			},
			handleDeleteAllTag() {
				this.list = [];
				uni.setStorageSync('tag', this.list)
			},
			handleDeleteTag(index) {
				this.list.splice(index, 1);
				uni.setStorageSync('tag', this.list)
			},
			handleTapTag(item) {
				this.searchValue = item;
				this.$u.route('/pages/productDetail/productDetail?detail=' + item)
			},
			handleConfirm(e){
				this.searchValue = e
				let data = {
					type: '1',
					name: this.searchValue
				}
				this.$u.post('/GetAllDeviceNew',data).then(res => {
					this.searchList = res.data;
					uni.switchTab({
						url:'../tabbar/purchaseOrLease/purchaseOrLease'
					})
					uni.$emit('search',{detail:this.searchList,type:1})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: calc(100vh - 88px - var(--status-bar-height));
		width: 100%;
		overflow: auto;
	}
</style>
