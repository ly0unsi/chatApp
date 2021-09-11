import './App.css';
import {StreamChat} from 'stream-chat'
import {Chat} from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelContainer, ChannelListContainer,Auth } from './components';
function App() {
  const apiKey='ryajdve62n8d'
  const client =StreamChat.getInstance(apiKey);
  const cookies = new Cookies()
  const authToken=cookies.get("token")
  if (authToken) {
    client.connectUser({
      name:cookies.get('userName'),
      fullname:cookies.get('fullname'),
      id:cookies.get('userId'),
      phoneNumber:cookies.get('phoneNumber'),
      image:cookies.get('avatarUrl'),
      hashedPassword:cookies.get('hashedPassword'),
    },authToken);
  }
  if (!authToken) {
    return(<Auth/>)
  }else{
  return (
    <div className="app__wrapper">
     <Chat client={client} theme="team light">
       <ChannelListContainer/>
       <ChannelContainer/>
     </Chat>
    </div>
  );
}
}

export default App;
