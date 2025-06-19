import Conversation from '../models/ConversationModel.js';
import Message from "../models/MessageModel.js";
import { getReceiverSocketId, io } from '../socket/Socket.js';

export const sendMsg = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const senderId = req.user._id;
    const isGroup = req.query.isGroup === "true";

    let conversation;
    if (isGroup) {
      conversation = await Conversation.findById(id);
      if (!conversation || !conversation.isGroup) {
        return res.status(404).json({ error: "Group not found" });
      }
    } else {
      conversation = await Conversation.findOne({
        participants: { $all: [senderId, id] },
        isGroup: false
      });
      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, id],
          isGroup: false
        });
      }
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId: isGroup ? undefined : id,
      conversationId: conversation._id,
      message,
    });

    // Pehle message save karo
    await newMessage.save();

    // Fir conversation me message push karo
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Socket emit
    if (isGroup) {
      conversation.participants.forEach((participantId) => {
        const receiverSocketId = getReceiverSocketId(participantId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }
      });
    } else {
      const receiverSocketId = getReceiverSocketId(id);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
    }

    res.status(201).json(newMessage);

    console.log("Message sent to:", req.params.id);
  } catch (error) {
    console.log("Error in sending message", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


//total msg of 1 sender and 1 reciver using that same reciver id 
export const getMsg = async(req, res) => {
  try {
    const { id: conversationId } = req.params;
    const isGroup = req.query.isGroup === "true";
    let conversation;

    if (isGroup) {
      // Group conversation fetch karo
      conversation = await Conversation.findOne({
        _id: conversationId,
        isGroup: true
      }).populate("messages");
    } else {
      // One-to-one conversation fetch karo
      const senderId = req.user._id;
      conversation = await Conversation.findOne({
        participants: { $all: [senderId, conversationId] },
        isGroup: false
      }).populate("messages");
    }

    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    res.status(200).json(messages);

  } catch (error) {
    console.log("Error in getting message", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteChat = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const isGroup = req.query.isGroup === "true";

    if (isGroup) {
      // Group conversation delete karo
      await Conversation.findByIdAndDelete(conversationId);
    } else {
      // One-to-one conversation delete karo
      const senderId = req.user._id;
      await Conversation.findOneAndDelete({
        _id: conversationId,
        participants: { $all: [senderId, req.query.receiverId] },
        isGroup: false
      });
    }

    res.status(200).json({ message: "Conversation deleted successfully" });
  } catch (error) {
    console.log("Error in deleting conversation", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}