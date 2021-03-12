import request from '@/utils/request'
// import store from '@/store'
// 登录方法
export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}
// 发送验证码
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}

export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user`,
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}

export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/channels`
    })
}