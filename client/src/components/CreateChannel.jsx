import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react';
import { CloseCreateChannel } from '../assets'
import {UserList} from './'
const ChannelNameInput=({channelName='',setChannelName})=>{
    const handleChange=(e)=>{
        e.preventDefault()
        setChannelName(e.target.value)
    }
    
    return(
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input value={channelName} onchange={handleChange} placeholder='channel name' type="text" />
            <p>
                Add members
            </p>
        </div>
    )
}
const CreateChannel = ({createType,setIsCreating}) => {
    const {client,setActiveChannel}=useChatContext()
    const [selectedUsers, setSelectedUsers] = useState([client.usereID||''])
    const [channelName,setChannelName]=useState('')
    return (
        <div  className='create-channel__container'>
           <div className="create-channel__header">
               <p>
                   {createType==="team" ? "Create a new channel" :'Send a diect message'}
                   <CloseCreateChannel setIsCreating={setIsCreating} />
               </p>
           </div>
           {createType==='team'&&<ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
           <UserList setSelectedUsers={setSelectedUsers}/>
        </div>
    )
}

export default CreateChannel
