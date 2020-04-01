import request from '@/lib/request'

//销售员登陆
export function login(data) {
	return request({
		url: '/auth/login',
		method: 'post',
		data
	})
}
export function auth(data) {
	return request({
		url: '/wechat/cp/oath2Url',
		method: 'post',
		data
	})
}
export function captcha(data) {
	return request({
		url: '/test/captcha',
		method: 'get',
		data
	})
}
// 销售所有客户及客户统计
export function getUserOrAgentCustomerAndTotals(data) {
	return request({
		url: '/agent/customer-agent/getUserOrAgentCustomerAndTotals',
		method: 'post',
		data
	})
}
// 销售带状态及参数客户查询
export function getUserOrAgentCustomer(data) {
	return request({
		url: '/agent/customer-agent/getUserOrAgentCustomer',
		method: 'post',
		data
	})
}
// 行为记录统计求和查询
export function operationLogSum(data) {
	return request({
		url: '/customer/operation-log/operationLogSum',
		method: 'post',
		data
	})
}
// 查询客户订单
export function selectCustomerOrder(data) {
	return request({
		url: '/agent/customer-order/selectCustomerOrder',
		method: 'post',
		data
	})
}
// 查询订单详细（进度）
export function selectOrderDetail(data) {
	return request({
		url: '/agent/customer-order/selectOrderDetail',
		method: 'post',
		data
	})
}
//修改客户信息
export function updateCustomer(data) {
	return request({
		url: '/customer/customer/updateCustomer',
		method: 'post',
		data
	})
}
//修改订单信息
export function updateCustomerOrder(data) {
	return request({
		url: '/agent/customer-order/updateCustomerOrder',
		method: 'post',
		data
	})
}
//销售新增用户统计
export function selectCustomerStatistics(data) {
	return request({
		url: '/customer/sys-customer-extradate/selectCustomerStatistics',
		method: 'post',
		data
	})
}
//销售基本信息
export function getUserInformation(data) {
	return request({
		url: '/sys/getUserInformation',
		method: 'post',
		data
	})
}
//修改销售基本信息
export function updateUserInformation(data) {
	return request({
		url: '/sys/updateUser',
		method: 'post',
		data
	})
}
//获取二维码
export function getUsergetQRCode(data){
	return request({
		url:'/mnp/getQRCode',
		method:'post',
		data
	})
}
//查询客户标签
export function getCustomerTags(data) {
	return request({
		url: '/customer/customer/getCustomerTags',
		method: 'post',
		data
	})
}

//微信小程序生成二维码，返回文件相对路径
export function getQrCodeFile(data) {
	return request({
		url: '/mnp/getQrCodeFile',
		method: 'post',
		data
	})
}
/**
 * 通过原密码修改密码
 * @param {Object} data
 */
export function editUserPasswordByOldPassword(data) {
	return request({
		url: '/sys/editUserPasswordByOldPassword',
		method: 'post',
		data
	})
}