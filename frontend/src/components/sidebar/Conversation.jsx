
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/UseConversation'

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = selectedConversation?._id === conversation._id;
  console.log(conversation.profilePic);

  const {onlineUsers} = useSocketContext();
  const isOnlie = onlineUsers.includes(conversation._id)

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-red-400 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-red-400" : ""}
      `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnlie ? "online" : ""}`}>
          <div className='w-12 rounded-full'>
            <img
              src={conversation.profilePic}
              alt='user avatar'
            />


          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200"> {conversation.fullname}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  )
}

export default Conversation
