

import Conversation from './Conversation'
import useGetConversations from '../../hooks/UseGetConversations'
import { getRandomEmoji } from '../../utils/Emoji'

const Conversations = () => {
  const { loading, conversations } = useGetConversations()
  console.log("chats:", conversations)
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => {
        return (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1} // last index pachi divider ni aave
          />
        )
      })}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations
