import Conversation from "../models/ConversationModel.js";

export const createGroup = async (req, res) => {
    try {
        const { groupName, members } = req.body;
        const adminId = req.user._id;

        if (!groupName || !members || !Array.isArray(members) || members.length < 2) {
            return res.status(400).json({ error: "Group name and at least 2 members are required" });
        }

        // Add admin to members if not already included
        if (!members.includes(adminId.toString())) {
            members.push(adminId);
        }

        const group = await Conversation.create({
            groupName,
            participants: members,
            isGroup: true,
            groupAdmin: adminId
        });

        res.status(201).json(group);
    } catch (error) {
        console.log("Error in creating group:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getGroups = async (req, res) => {
    try {
        const groups = await Conversation.find({ isGroup: true, participants: req.user._id });
        res.status(200).json(groups);
    } catch (error) {
        console.log("Error in getting groups:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};