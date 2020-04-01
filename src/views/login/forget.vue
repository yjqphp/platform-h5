<template>
	<div class="content">

		<div class="list">
			<div class="tishi">若您忘记了密码，可在此重新设置新密码。</div>
			<div class="list-call">
				<image class="img" src="/static/shilu-login/1.png"></image>
				<input class="biaoti" type="number" v-model="phoneno" maxlength="11" placeholder="请输入手机号" />
			</div>
			<div class="list-call">
				<image class="img" src="/static/shilu-login/2.png"></image>
				<input class="biaoti" type="text" v-model="password" maxlength="32" placeholder="请输入新密码" :password="!showPassword" />
				<image class="img" :src="showPassword?'/static/shilu-login/op.png':'/static/shilu-login/cl.png'" @tap="display"></image>
			</div>
			<div class="list-call">
				<image class="img" src="/static/shilu-login/3.png"></image>
				<input class="biaoti" type="number" v-model="code" maxlength="4" placeholder="验证码" />
				<div class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</div>
			</div>
		</div>
		<div class="dlbutton" hover-class="dlbutton-hover" @tap="bindLogin()">
			<text>修改密码</text>
		</div>

	</div>
</template>

<script>
	var tha,js;
	export default {
		data() {
			return {
				phoneno:'',
				second:0,
				code:"",
				showPassword:false,
				password:''
			}
		},
		onLoad(){
			tha = this;
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
			getcode(){
				if(this.second>0){
					return;
				}

				uni.request({
				    url: 'http://***/getcode.html', //仅为示例，并非真实接口地址。
				    data: {phoneno:this.phoneno,code_type:'reg'},
					method: 'POST',
					dataType:'json',
				    success: (res) => {
						if(res.data.code!=200){
							uni.showToast({title:res.data.msg,icon:'none'});
							tha.second = 0;
						}else{
							uni.showToast({title:res.data.msg});
							tha.second = 60;
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
				if (this.phoneno.length != 11) {
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
				    url: 'http://***/forget.html',
				    data: {
						phoneno:this.phoneno,
						password:this.password,
						code:this.code
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
		justify-content: center;
	}
	.tishi {
		color: #999999;
		font-size: 28px;
		line-height: 50px;
		margin-bottom: 50px;
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
	.yzm {
		color: #FF7D13;
		font-size: 24px;
		line-height: 64px;
		padding-left: 10px;
		padding-right: 10px;
		width:auto;
		height:64px;
		border:1px solid rgba(255,131,30,1);
		border-radius: 50px;
	}
	.yzms {
		color: #999999 !important;
		border:1px solid #999999;
	}
</style>
