import UseGetMsg from '../../hooks/UseGetMsg'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import MsgSingle from './MsgSingle'

const Messages = () => {
  const {messages,loading} = UseGetMsg();


  console.log("Msg=",messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      
      {!loading && messages.length > 0 && messages.map((message)=>(
        <MsgSingle key={message._id} message={message}/>
      ))}


    {loading && [...Array(3)].map((_,idx)=> <MessageSkeleton key={idx} />) }

    {!loading && messages.length === 0 && (
      <p className='text-center'>Send a message to start the conversation 🚀</p>
    )}
     
    </div>
  )
}

export default Messages
