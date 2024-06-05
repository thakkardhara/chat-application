import { useEffect, useRef } from 'react';
import UseGetMsg from '../../hooks/UseGetMsg'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import MsgSingle from './MsgSingle'
import UseListenMesg from '../../hooks/UseListenMesg';

const Messages = () => {
  const {messages,loading} = UseGetMsg();
  UseListenMesg();
  const lastMessageRef = useRef();
useEffect(()=>{
setTimeout(()=>{
  lastMessageRef.current?.scrollIntoView({ behavior:"smooth"})
})

},[messages])
  console.log("Msg=",messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      
      {!loading && messages.length > 0 && messages.map((message)=>(
        <div key={message._id} 
        ref={lastMessageRef}
        >
          <MsgSingle  message={message}/>
          </div>
      ))}


    {loading && [...Array(3)].map((_,idx)=> <MessageSkeleton key={idx} />) }

    {!loading && messages.length === 0 && (
      <p className='text-center'>Send a message to start the conversation 🚀</p>
    )}
     
    </div>
  )
}

export default Messages

