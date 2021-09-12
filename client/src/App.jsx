import './App.css';
import 'stream-chat-react/dist/css/index.css'
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelContainer, ChannelListContainer,Auth } from './components';
import { useState } from 'react';
function App() {
  const apiKey='ryajdve62n8d'
  const client =StreamChat.getInstance(apiKey);
  const cookies = new Cookies()
  const authToken=cookies.get("token")
  if (authToken) {
    client.connectUser({
      name:cookies.get('username'),
      fullname:cookies.get('fullname'),
      id:cookies.get('userId'),
      phoneNumber:cookies.get('phoneNumber'),
      image:cookies.get('avatarUrl'),
      hashedPassword:cookies.get('hashedPassword'),
    },authToken);
  }
  const [createType, setcreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  if (!authToken) {
    return(<Auth/>)
  }else{
  return (
    <div className="app__wrapper">
     <Chat client={client} theme="team light">
       <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setcreateType={setcreateType}
          setIsEditing={setIsEditing}
       />
       <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
       />
     </Chat>
    </div>
  );
}
}

export default App;
