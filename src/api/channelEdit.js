import request from '@/utils/request'

export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels'
    })
}

export const addUserChannel = channel => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}

export const delUserChannel = channelId => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${channelId}`,
    })
}