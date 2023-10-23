import theme from "../config/theme";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState, useEffect, useRef } from "react";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Sidebar,
  Search,
  Avatar,
  Conversation,
  ConversationList,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";

import sample from "../assets/conversationsample";

import { useMediaQuery } from "react-responsive";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function ChatUI() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const fileInputRef = useRef(null);
  const axiosInstance = useAxiosPrivate();

  // Conversations variables
  const [sender, setSender] = useState({});
  const [activeconversation, setActiveConversation] = useState({});
  const [conversationslist, setConversationslist] = useState([]);
  const [searchedconversations, setSearchedConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  // UI variables
  const [showsidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const fetchSender = async () => {
      axiosInstance
        .get(config.endpoint.users + "/" + sessionStorage.getItem("userid"))
        .then((res) => {
          const name = res.data.firstname;
          const lastname = res.data.surname;
          setSender({ name, lastname });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const fetchConversations = async () => {
      axiosInstance
        .get(
          config.endpoint.users +
            "/" +
            sessionStorage.getItem("userid") +
            "/conversations"
        )
        .then((res) => {
          setConversationslist(res.data);
          setSearchedConversations(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchSender();
    fetchConversations();

    // setConversationslist(sample.conversations);
    // setSearchedConversations(sample.conversations);
    setMessages([...messages, sample.model]);
    // setActiveConversation(sample.convomodel);
  }, []);

  function handleSendMessage(event) {
    setMessages([
      ...messages,
      {
        message: event,
        sentTime: "adesso",
        sender: "Test 1",
        outgoing: true,
      },
    ]);
  }

  function handleCovoChange(data) {
    // fetch dei messaggi della conversazione cambiata

    setActiveConversation(data);
    setConversationslist(
      conversationslist.map((convo) => {
        if (convo.sender === data.name) {
          convo.nuoviMessaggi = 0;
        }
        return convo;
      })
    );

    setMessages(sample.messagesT1);
  }

  function handleSearch(event) {
    // fetch dei messaggi della conversazione cambiata

    const filteredconvos = conversationslist.filter((convo) => {
      return convo.sender.toLowerCase().includes(event.toLowerCase());
    });

    setSearchedConversations(filteredconvos);
  }

  const handleAttachmentButtonClick = () => {
    // Trigger a click event on the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e) => {
    // Get the selected file
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Do something with the selected file, such as displaying its name
      console.log(`Selected file: ${selectedFile.name}`);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.white,
      }}
    >
      {showsidebar ? (
        <div className={isMobile ? "p-1" : "p-3"}>
          <div
            className="sticky-top"
            style={{
              backgroundColor: theme.colors.white,
            }}
          >
            <Search
              placeholder="Search..."
              onChange={handleSearch}
              onClearClick={() => {
                setSearchedConversations(sample.conversations);
              }}
              className="mb-3 "
            />
          </div>
          <ConversationList scrollable>
            {searchedconversations.map((convo, key) => {
              return (
                <Conversation
                  key={key}
                  name={convo.user1.firstname}
                  // lastSenderName={convo.user1.firstname}
                  // info={convo.lastMessage}
                  // unreadCnt={convo.nuoviMessaggi}
                  active={activeconversation.name === convo.user1.firstname}
                  onClick={() => {
                    setShowSidebar(!showsidebar);
                    handleCovoChange({
                      name: convo.user1.firstname,
                      // lastSenderName: convo.lastSenderName,
                      // info: convo.lastMessage,
                      unreadCnt: 0,
                      active: true,
                    });
                  }}
                  style={{
                    border: "1px solid darkgray",
                    borderRadius: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <Avatar
                    src={
                      convo.user1.profilePicture
                        ? convo.user1.profilePicture
                        : "https://picsum.photos/300/300"
                    }
                    name={convo.sender}
                  />
                </Conversation>
              );
            })}
          </ConversationList>
        </div>
      ) : (
        <div>
          <ChatContainer>
            <ConversationHeader
              style={{
                position: "sticky",
                top: "0",
                zIndex: "1",
              }}
            >
              <ConversationHeader.Back
                onClick={() => setShowSidebar(!showsidebar)}
              />

              <Avatar
                src="https://picsum.photos/300/300"
                name={activeconversation.name}
              />
              <ConversationHeader.Content userName={activeconversation.name} />
            </ConversationHeader>

            <MessageList>
              <Message
                type="custom"
                model={{
                  sentTime: "adesso",
                  sender: "Test 1",
                  direction: "incoming",
                }}
              >
                <Message.CustomContent>
                  <img
                    src="https://picsum.photos/300/300"
                    alt="test"
                    style={{ width: "100%" }}
                  />
                </Message.CustomContent>
              </Message>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  model={{
                    message: message.message,
                    sentTime: message.sentTime,
                    sender: message.sender,
                    direction: message.outgoing ? "outgoing" : "incoming",
                  }}
                />
              ))}
            </MessageList>

            <MessageInput
              placeholder="Scrivi qui il tuo messaggio"
              onSend={handleSendMessage}
              onAttachClick={handleAttachmentButtonClick}
              style={{
                position: "absolute",
                bottom: "0",
                width: "100%",
                backgroundColor: theme.colors.white,
              }}
            />
          </ChatContainer>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        </div>
      )}
    </div>
  );
}

export default ChatUI;
