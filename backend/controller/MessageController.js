

import Conversation from '../models/ConversationModel.js';
import Message from "../models/MessageModel.js";
import { getReceiverSocketId, io } from '../socket/Socket.js';

export const sendMsg = async (req, res) => {
  try {
    const { message } = req.body; // getting msg as input
    const { id: receiverId } = req.params; // get user-id or receiver-id
    const senderId = req.user._id; // sending-id coming from req.user because of protected routes

    // Find conversation between two participants
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If conversation doesn't exist, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

  

    // Push the new message ID into the conversation's messages array
    if(newMessage){
      conversation.messages.push(newMessage._id);
    }
  


    await Promise.all([conversation.save(),newMessage.save()])

        // socket code aiya 
        const recevierSocketId= getReceiverSocketId(receiverId);
        if(recevierSocketId){
          io.to(recevierSocketId).emit("newmsg:",newMessage) // send events to specific client
        }

    res.status(201).json(newMessage);

    console.log("Message sent to:", req.params.id);
  } catch (error) {
    console.log("Error in sending message", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


//total msg of 1 sender and 1 reciver using that same reciver id 
export const  getMsg = async(req,res)=>{
  try {
    const {id:userToChatId}= req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants:{$all:[senderId,userToChatId]}
    }).populate("messages"); // msg aape

    if(!conversation) return res.status(200).json([]);
    const messages = conversation.messages

    res.status(200).json(messages);
    
  } catch (error) {
    console.log("Error in getting message", error.message);
    res.status(500).json({ error: "Internal server error" });
    
  }
}

// export const deleteMsg = async(req,res)=>{
//   try {
//     const {id:msgId}= req.params;
//     const senderId = req.user._id;
//     const conversation = await Conversation.findOne({
//       participants:{$all:[senderId,msgId]}
//       }).populate("messages");
//       const message = conversation.messages.id(msgId);
//       message.remove();
//       await conversation.save();

    
//   } catch (error) {
//     console.log("Error in deleting message",error.message)
//     res.status(500).json({error:"Internal server Error"})
    
//   }
// }

