<template>
	<div>
		<view-div :webdiv-styles="webdivStyles" :src="articleurl"></view-div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				articleurl:'',
				webdivStyles: {
                    progress: {
                        color: '#FF7200'
                    }
                }
			};
		},
		onLoad(options){
			this.articleurl = '协议网址';
		}
	}
</script>

<style>

</style>
