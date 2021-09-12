import React, { useState } from 'react'
import {useChatContext, userChatContext} from "stream-chat-react"
import { UserList } from '.'
import { CloseCreateChannel } from '../assets'
const ChannelNameInput=({channelName='',setChannelName})=>{
    const handleChange=(e)=>{
        e.preventDefault()
        setChannelName(e.target.value)
    }
    
    return(
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input  onChange={handleChange} placeholder='channel name' type="text" />
            <p>
                Add members
            </p>
        </div>
    )
}
const EditChannel= ({setIsEditing})=>{
   const {channel} = useChatContext()
   const [channelName,setChannelName]=useState(channel?.data?.name)
   const [selectedUsers, setSelectedUsers] = useState([])
   const updateChannel=async(e)=>{
       e.preventDefault()
       const nameChanged=channelName!== (channel.data.name || channel.data.id)
       if (nameChanged) {
           await channel.update({name:channelName},{text:`Channel name is changed to ${channelName}`})
           if (selectedUsers.length) {
               await channel.addMembers(selectedUsers)
           }
           setChannelName(null)
           setIsEditing(null)
           setSelectedUsers([])
       }
   }
    return(
        <div className='edit-channel__conatiner'>
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing}/>
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className='edit-channel__button-wrapper'
            onClick={updateChannel}
            >
                <p>
                    Edit Channel
                </p>
          
            </div>
        </div>
    )
}

export default EditChannel
