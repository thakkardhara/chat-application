import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

const UseGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [usersRes, groupsRes] = await Promise.all([
                    fetch('/api/users'),
                    fetch('/api/group')
                ]);
                const usersData = await usersRes.json();
                const groupsData = await groupsRes.json();

                if (usersData.error) throw new Error(usersData.error);
                if (groupsData.error) throw new Error(groupsData.error);

                setConversations(usersData);
                setGroups(groupsData);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { loading, conversations, groups };
};

export default UseGetConversations;
