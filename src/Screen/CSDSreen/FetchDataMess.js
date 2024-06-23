import { getAllUsers } from "../../services/apiUser";
import { getChat, getOneChat } from "../../services/apiChat";
import Swal from "sweetalert2";

const FetchDataMess = async (
  accessToken,
  uid,
  role,
  navigate,
  setUserList,
  setFilteredUserList,
  chatId,
  setCurrentChat
) => {
  if (role === "User") {
    Swal.fire({
      icon: "info",
      text: "You do not have permission to access this site",
    });
    navigate("/");
  } else {
    try {
      const chatdata = await getChat(accessToken, uid);
      const allUsers = await getAllUsers(accessToken);

      const allMembers = chatdata.reduce((members, chat) => {
        const membersInChat = chat.members.filter(
          (memberId) => memberId !== uid
        );
        return [...members, ...membersInChat];
      }, []);
      const uniqueMembers = Array.from(new Set(allMembers));
      const usersInChat = allUsers.filter((user) =>
        uniqueMembers.includes(user._id)
      );
      const updatedUsers = usersInChat.map((user) => {
        const userChats = chatdata.filter((chat) =>
          chat.members.includes(user._id)
        );
        const chatIds = userChats.map((chat) => chat._id);
        return { ...user, chats: chatIds };
      });
      setUserList(updatedUsers);
      setFilteredUserList(updatedUsers);
      if (chatId !== "CustomerMessages") {
        const chat = await getOneChat(accessToken, chatId, uid);
        setCurrentChat(chat.chat);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default FetchDataMess;
