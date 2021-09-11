import React ,{useState,useEffect} from 'react'
import {useChatContext} from 'stream-chat-react'
import {SearchIcon} from '../assets'
const ChannelSearch = () => {
    const [query, setquery] = useState('')
    const [loading, setloading] = useState(false)
    const getChannels=async(text)=>{
        try {
            //TODO:fetch channels
        } catch (error) {
            setquery('')
        }
    }
    const onSearch=(e)=>{
        e.prevenbtDefault()
        setloading(true)
        setquery(e.target.value)
        getChannels(e.target.value)
    }
    return (
        <div className="channel-search__container">
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon/>
                </div>
                <input className="channel-search__input__text" placeholder="search" type="text" value={query} onChange={onSearch}/>
            </div>
        </div>
    )
}

export default ChannelSearch
