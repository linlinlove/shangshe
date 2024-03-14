<template>
	<view class="container">
		<!-- 选择类别 -->
		<view class="item">
			<text>选择类别：</text>
			<picker :value="categoryIndex" mode="selector" :range="categoryOptions" @change="onCategoryChange">
				<view class="picker">{{ categoryOptions[categoryIndex] }}</view>
			</picker>
		</view>
		<!-- 选择基地/产地 -->
		<view class="item">
			<text>选择基地/产地：</text>
			<picker :value="baseIndex" mode="selector" :range="baseOptions" @change="onBaseChange">
				<view class="picker">{{ baseOptions[baseIndex] }}</view>
			</picker>
		</view>
		<!-- 产品名称 -->
		<view class="item" style="height: 200px;">
			<text>产品名称：</text>
			<input v-model="productName" placeholder="请输入产品名称" />
		</view>
		<!-- 上传图片 -->
		<view class="item">
			<text>产品图片：</text>
			<image :src="productImage" mode="aspectFill" />
			<button  @click="uploadImage">上传图片</button>
		</view>
		<!-- 产品价格 -->
		<view class="item">
			<text>产品价格：</text>
			<input v-model="productPrice" type="number" placeholder="请输入产品价格" />
		</view>
		<!-- 产品单位 -->
		<view class="item">
			<text>产品单位：</text>
			<input v-model="productUnit" placeholder="请输入产品单位" />
		</view>
		<!-- 产品介绍 -->
		<view class="item">
			<text>产品介绍：</text>
			<textarea v-model="productDescription" placeholder="请输入产品介绍"></textarea>
		</view>
		<!-- 信息有效期 -->
		<view class="item">
			<text>信息有效期：</text>
			<picker :value="validityIndex" mode="selector" :range="validityOptions" @change="onValidityChange">
				<view class="picker">{{ validityOptions[validityIndex] }}</view>
			</picker>
		</view>
		<!-- 提交和清空按钮 -->
		<view class="btn-group">
			<button @click="submit">提交</button>
			<button @click="clear">清空</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			categoryOptions: ['现货', '临新出品'],
			categoryIndex: 0,
			baseOptions: ['基地1', '基地2', '基地3'],
			baseIndex: 0,
			productName: '',
			productImage: '',
			productPrice: '',
			productUnit: '',
			productDescription: '',
			validityOptions: ['1天', '2天', '3天'],
			validityIndex: 2,
		};
	},
	methods: {
		onCategoryChange(e) {
		  this.categoryIndex = e.detail.value;
		},
		onBaseChange(e) {
		  this.baseIndex = e.detail.value;
		},
		onValidityChange(e) {
		  this.validityIndex = e.detail.value;
		},
		uploadImage() {
		  // 上传图片逻辑，可以使用uni.uploadFile等方法
		  // 上传成功后，将图片路径赋值给productImage
		},
		submit() {
		  console.log('提交数据：', {
		    category: this.categoryOptions[this.categoryIndex],
		    base: this.baseOptions[this.baseIndex],
		    productName: this.productName,
		    productImage: this.productImage,
		    productPrice: this.productPrice,
		    productUnit: this.productUnit,
		    productDescription: this.productDescription,
		    validity: this.validityOptions[this.validityIndex],
		}); 
		},
		clear() {
			// 清空表单数据
			this.categoryIndex = 0;
			this.baseIndex = 0;
			this.productName = '';
			this.productImage = '';
			this.productPrice = '';
			this.productUnit = '';
			this.productDescription = '';
			this.validityIndex = 2;
		},
	},
};
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		margin: 20px;
	}
	.title {
		font-size: 18px;
		font-weight: bold;
		margin: 20px 0;
		text-align: center;
	}
	text{
		font-size: 16px;
	}
	.item {
		margin-bottom: 15px;
		display: flex;
	}
	
	.picker {
		border: 1px solid #ccc;
		padding: 5px;
		border-radius: 5px;
	}
		
	textarea{
		width: 250px;
		height: 150px;
	}
	.btn-group {
		display: flex;
		justify-content: space-between;
	}
	image{
		width: 100px;
		height: 100px;
	}
	button {
		background-color: #409eff;
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		height: 35px;
		width: 100px;
		text-align: center;
		line-height: 35px;
	}
</style>
