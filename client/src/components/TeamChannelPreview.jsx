import React from 'react'
import {Avatar,useChatContext} from 'stream-chat-react';
const TeamChannelPreview = ({channel,type,setToggleContainer}) => {
    const {channel:activeChannel,client} =useChatContext()
    const channelPreview=()=>{
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data?.id}
        </p>
    }
    const directPrerview =()=>{
        const members=Object.values(channel.state.members).filter(({user})=>
            user.id!==client.userId
        )
        return(
            <div className="channel-preview__item single">
                <Avatar
                image={members[0]?.user?.image}
                name={members?.user?.fullName}
               /> 
               <p> name={members?.user?.fullName}</p>
            </div>
        )
    }
    return (
        <div className={
            channel?.id===activeChannel?.id ? 'channel-preview__wrapper__selected'
            :'channel-preview__wrapper'
        }
        onClick={()=>{
            console.log('channel')
        }}
        >
            {type==='team' ? <channelPreview/> : <directPrerview/>}
        </div>
    )
}

export default TeamChannelPreview
