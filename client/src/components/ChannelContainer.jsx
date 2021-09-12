import React from 'react'
import { Channel,useChatContext,useCHatContext,MessageTeam } from 'stream-chat-react'
import {ChannelInner,CreateChannel,EditChannel} from './'
const ChannelContainer = ({isCreating,setIsCreating,isEditing,setIsEditing,createType}) => {
    const {channel}=useChatContext()
    if (isCreating) {
        return(
            <div className='channel__container'>
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }
    if (isEditing) {
        return(
            <div className='channel__container'>
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        )
    }
    const emptyState=()=>(
        <div className='channel-empty__container'>
            <p className="channel-empty__first">
                this is the beginnig of your chat hsitory
            </p>
            <p className='channel-empty__second'>Send Messages</p>
        </div>
    )
    return (
        <div className='channel__container'>
            <Channel
                EmptyStateIndicator={emptyState}
                Message={(messageProps,i)=><MessageTeam key={i} {...messageProps}/>}
            >
                <ChannelInner setIsEditing={setIsEditing}/>
            </Channel>
        </div>
    )
}

export default ChannelContainer
