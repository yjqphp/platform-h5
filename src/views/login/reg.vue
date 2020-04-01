<template>
	<div class="content">
		<div class="header">
			<image src="../../assets/login/logo.png"></image>
		</div>

		<div class="list">
			<div class="list-call">
				<image class="img" src="../../assets/login/1.png"></image>
				<input class="biaoti" v-model="phoneno" type="number" maxlength="11" placeholder="手机号" />
			</div>
			<div class="list-call">
				<image class="img" src="../../assets/login/2.png"></image>
				<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="登录密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</div>
			<div class="list-call">
				<image class="img" src="../../assets/login/3.png"></image>
				<input class="biaoti" v-model="code" type="number" maxlength="4" placeholder="验证码" />
				<div class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</div>
			</div>
			<div class="list-call">
				<image class="img" src="../../assets/login/4.png"></image>
				<input class="biaoti" v-model="invitation" type="text" maxlength="12" placeholder="邀请码" />
			</div>

		</div>

		<div class="dlbutton" hover-class="dlbutton-hover" @tap="bindLogin">
			<text>注册</text>
		</div>

		<div class="xieyi">
			<image @tap="xieyitong" :src="xieyi==true?'../../assets/login/ty1.png':'../../assets/login/ty0.png'"></image>
			<text @tap="xieyitong"> 同意</text>
			<navigator url="blog?id=1" open-type="navigate">《软件用户协议》</navigator>
		</div>
	</div>
</template>

<script>
	var tha,js;
	export default {
		onLoad(){
			tha = this;

		},
		onUnload(){
			clearInterval(js)
			this.second = 0;
		},
		data() {
			return {
				phoneno:'',
				password:'',
				code:'',
				invitation:'',
				xieyi:true,
				showPassword:false,
				second:0
			};
		},
		computed:{
			yanzhengma(){
				if(this.second==0){
					return '获取验证码';
				}else{
					if(this.second<10){
						return '重新获取0'+this.second;
					}else{
						return '重新获取'+this.second;
					}
				}
			}
		},
		methods: {
			display() {
			    this.showPassword = !this.showPassword
			},
			xieyitong(){
				this.xieyi = !this.xieyi;
			},
			getcode(){
				if(this.second>0){
					return;
				}
				this.second = 60;
				uni.request({
				    url: 'http://***/getcode.html', //仅为示例，并非真实接口地址。
				    data: {phoneno:this.phoneno,code_type:'reg'},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						if(res.data.code!=200){
							uni.showToast({title:res.data.msg,icon:'none'});
						}else{
							uni.showToast({title:res.data.msg});
							js = setInterval(function(){
								tha.second--;
								if(tha.second==0){
									clearInterval(js)
								}
							},1000)
						}
				    }
				});
			},
		    bindLogin() {
				if (this.xieyi == false) {
				    uni.showToast({
				        icon: 'none',
				        title: '请先阅读《软件用户协议》'
				    });
				    return;
				}
				if (this.phoneno.length !=11) {
				    uni.showToast({
				        icon: 'none',
				        title: '手机号不正确'
				    });
				    return;
				}
		        if (this.password.length < 6) {
		            uni.showToast({
		                icon: 'none',
		                title: '密码不正确'
		            });
		            return;
		        }
				if (this.code.length != 4) {
				    uni.showToast({
				        icon: 'none',
				        title: '验证码不正确'
				    });
				    return;
				}
				uni.request({
				    url: 'http://***/reg.html',
				    data: {
						phoneno:this.phoneno,
						password:this.password,
						code:this.code,
						invitation:this.invitation
					},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						if(res.data.code!=200){
							uni.showToast({title:res.data.msg,icon:'none'});
						}else{
							uni.showToast({title:res.data.msg});
							setTimeout(function(){
								uni.navigateBack();
							},1500)
						}
				    }
				});

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
		margin-top: 30px;
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
		height: 100px;
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
	.yzm {
		color: #FF7D13;
		font-size: 24px;
		line-height: 64px;
		padding-left: 10px;
		padding-right: 10px;
		width:auto;
		height:64px;
		border:1px solid #FFA800;
		border-radius: 50px;
	}
	.yzms {
		color: #999999 !important;
		border:1px solid #999999;
	}
	.dlbutton {
		color: #FFFFFF;
		font-size: 34px;
		width:470px;
		height:100px;
		background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(188,226,158,1));
		box-shadow:0px 0px 13px 0px rgba(164,217,228,0.2);
		border-radius:50px;
		line-height: 100px;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100px;
	}
	.dlbutton-hover {
		background:linear-gradient(-90deg,rgba(63,205,235,0.9),rgba(188,226,158,0.9));
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
	.xieyi image{
		width: 40px;
		height: 40px;
	}
</style>
