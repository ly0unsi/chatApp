import React ,{useState} from 'react'
import {ChannelList,useChatContext,Avatar} from 'stream-chat-react'
import {ChannelSearch,TeamChannelList,TeamChannelPreview} from './'
import HospitalIcon from "../assets/hospital.png"
import LogoutIcon from "../assets/logout.png"
import Cookies from 'universal-cookie'
const cookies=new Cookies()
const SideBar=({logout})=>{
    const { client } = useChatContext();
    const user=client.user
    
    return(
        <div className="channel-list__sidebar">
            <div className="channel-list__sidebar__icon1">
                <div className="icon1__inner">
                    <img src={HospitalIcon} alt="Hispital" width="30" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2">
                <div className="icon2__inner">
                    <img onClick={logout} src={LogoutIcon} alt="Logout" width="30" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon1" >
                <div className="user-item__name-wrapper">
                    <Avatar image={user.image} name={user.name || user.id} size={45} />
                </div>
            </div>
           
            
        </div>
    )
}
const CompanyHeader =()=>{
    return(
        <div className="channel-list__header">
            <p className="channel-list__header__text">Medical Pager</p>
        </div>
    )
}
const teamChannelFilter=(channels)=>{
    return channels.filter((channel)=>channel.type==='team')
}
const messagingChannelFilter=(channels)=>{
    return channels.filter((channel) => channel.type === 'messaging');
}
const ChannelListContent = ({isCreating,setIsCreating,setcreateType,setIsEditing,setToggleContainer}) => {
    const logout=()=>{
        cookies.remove('token')
        cookies.remove('username')
        cookies.remove('fullname')
        cookies.remove('userId')
        cookies.remove('phoenNumber')
        cookies.remove('avatarUrl')
        cookies.remove('hashedPassword',)
        window.location.reload()
    }
    const { client } = useChatContext();
    const filters = { members: { $in: [client.userID] } };
    return (
        <>
            <SideBar logout={logout}/>
            <div className="channel-list__list__wrapper">
                <CompanyHeader/>
                <ChannelSearch setToggleContainer={setToggleContainer}/>
                {/* Teem channel list */}
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={teamChannelFilter}
                   
                    List={(listProps)=>(
                        <TeamChannelList
                            {...listProps}
                            type='team'
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setcreateType={setcreateType}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    preview={(previewProps)=>(
                        <TeamChannelPreview 
                        {...previewProps}
                        type="team"
                        setToggleContainer={setToggleContainer}
                        />
                    )}
                />
                 {/* Messages channel list */}
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={messagingChannelFilter}
                    List={(listProps)=>(
                        <TeamChannelList
                            {...listProps}
                            type='messaging'
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setToggleContainer={setToggleContainer}
                            setcreateType={setcreateType}
                            setIsEditing={setIsEditing}
                        />
                    )}
                    preview={(previewProps)=>(
                        <TeamChannelPreview 
                            {...previewProps}
                            type="messaging"
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                />
            </div>
        </>
    )
}
const ChannelListContainer = ({ setcreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
              <ChannelListContent 
                setIsCreating={setIsCreating} 
                setcreateType={setcreateType} 
                setIsEditing={setIsEditing} 
              />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
               <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent 
                setIsCreating={setIsCreating} 
                setcreateType={setcreateType} 
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
              />
            </div>
        </>
    )

}


export default ChannelListContainer

