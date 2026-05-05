export type FollowUserType = {
    followerId:number
    followingId:number
}

export type UnFollowUserType = {
    followerId:number
    followingId:number
}

export type GetFollowersType={
    userId:number
    username: string
}

export type GetFollowingType = {
    userId:number
    username:string
}

export type FollowButtonType = {
    isFollowing:boolean,
    onFollow?:()=>void
    onUnfollow?:()=>void
}
