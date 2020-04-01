<template>

	<div class="content">
		<van-row type="flex" justify="center"  class="header">
<!--			<van-col offset="6" span="6"><van-image-->
<!--					width="100"-->
<!--					height="100"-->
<!--					:src="require('../../assets/logo.png')"-->
<!--			/></van-col>-->
		</van-row>
		<van-cell-group>
			<van-row type="flex" justify="center"  class="list-call">
				<van-col offset="1" span="2"><van-image
						width="24"
						height="24"
						:src="require('../../assets/login/1.png')"
				/></van-col>
				<van-col span="15"><van-field v-model="loginForm.number" placeholder="输入手机号" /></van-col>
			</van-row>
			<van-row type="flex" justify="center"  class="list-call">
				<van-col offset="1" span="2"><van-image
						width="24"
						height="24"
						:src="require('../../assets/login/2.png')"
				/></van-col>
				<van-col span="15"><van-field type="password" v-model="loginForm.password" placeholder="输入密码" /></van-col>
			</van-row>
		</van-cell-group>

		<van-row type="flex" justify="center" style="margin-top: 50px;">

			<van-col span="12"><van-button round  type="primary" size="large"  v-on="bindLogin()">登录</van-button></van-col>

		</van-row>


<!--		<div class="xieyi">-->
<!--			<navigator url="forget" open-type="navigate">忘记密码</navigator>-->
<!--			<text>|</text>-->
<!--			<navigator url="reg" open-type="navigate">注册账户</navigator>-->
<!--		</div>-->
	</div>
</template>

<script>
	import {
		actLogin
	} from "@/api/account/Account.js"
	import {mapMutations} from 'vuex';
	import {Notify} from 'vant'
	export default {
		name: 'Login',
		data() {
			return {
				phoneno:'',
				password:'',
				loginForm:{
					number:'',
					password:''
				}
			};
		},
		methods: {
			...mapMutations(['login']),
			bindLogin() {
				if (this.phoneno.length != 11) {
					Notify({ type: 'warning', message: '手机号不正确' });

					return;
				}

				if (this.password.length < 6) {
					Notify({ type: 'warning', message: '密码不正确' });

					return;
				}
				actLogin({
					phoneno:this.phoneno,
					password:this.password
				}).then(res=>{
						if(res.data.code!=200){
							Notify({ type: 'warning', message: res.data.msg });
						}else{
							// uni.setStorageSync('user_data', JSON.stringify(res.data.data));
							this.login();
							// uni.navigateBack();
						}
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
	}
	.header {
		width:161px;
		height:161px;
		background:rgba(63,205,235,1);
		box-shadow:0px 12px 13px 0px rgba(63,205,235,0.47);
		border-radius:50%;
		margin-top: 20px;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161px;
		height:161px;
		border-radius:50%;
	}

	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50px;
		padding-left: 70px;
		padding-right: 70px;
	}
	.list-call{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 60px;
		color: #333333;
		border-bottom: 1px solid rgba(230,230,230,1);
	}
	.list-call .img{
		width: 40px;
		height: 40px;
	}
	.list-call .biaoti{
		flex: 1;
		text-align: left;
		font-size: 32px;
		line-height: 100px;
		margin-left: 16px;
	}

	.xieyi{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30px;
		margin-top: 80px;
		color: #FFA800;
		text-align: center;
		height: 40px;
		line-height: 40px;
	}
	.xieyi text{
		font-size: 24px;
		margin-left: 15px;
		margin-right: 15px;
	}
</style>
