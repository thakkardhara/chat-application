import Conversation from './Conversation'
import UseGetConversations from '../../hooks/UseGetConversations'
import { getRandomEmoji } from '../../utils/Emoji'
import useConversation from '../../zustand/UseConversation'

const Conversations = () => {
  const { loading, conversations, groups } = UseGetConversations();
  const { selectedConversation, setSelectedConversation } = useConversation();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {/* Users */}
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1 && groups.length === 0}
        />
      ))}

      {/* Separator for groups */}
      {groups.length > 0 && (
        <>
          <hr className="my-2 border-t-2 border-red-400" />
          <div className="text-center text-red-400 font-bold mb-2">Groups</div>
        </>
      )}

      {/* Groups */}
      {groups.map((group, idx) => (
        <div
          key={group._id}
          className={`flex flex-col gap-1 p-2 hover:bg-red-400 rounded cursor-pointer
            ${selectedConversation?._id === group._id ? "bg-red-400" : ""}
          `}
          onClick={() => setSelectedConversation({
            ...group,
            fullname: group.groupName, // for display in header
            isGroup: true
          })}
        >
          <div className="font-bold text-gray-200">{group.groupName}</div>
          <div className="text-xs text-gray-300">
            Members: {group.participants.length}
          </div>
        </div>
      ))}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations;
