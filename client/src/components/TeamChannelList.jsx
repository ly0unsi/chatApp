import React from 'react'
import { AddChannel } from '../assets'
const TeamChannelList = ({children,error=false,loading,type,isCreating,setIsCreating,setcreateType,setIsEditing}) => {
    if (error) {
        return type==='team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection error please try again later
                </p>
            </div>
        ) :null
    }
    if (loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type==='team' ? 'Channels' : 'Messages'} Loading...
                </p>
            </div>
        ) 
        
    }
    return (
        <div className="team-channel-list">
                <p className="team-channel-list__header">
                    <p className="team-channel-list__header__title">
                    {type==='team' ? 'Channels' : 'Direct messages'} 
                    </p>
                    <AddChannel 
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setcreateType={setcreateType}
                        setIsEditing={setIsEditing}
                        type={type==="team" ? "team" :'messaging'}
                     />
                
                    {children}
                </p>
            </div>
    )
}

export default TeamChannelList
