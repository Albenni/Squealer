import theme from "../config/theme";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState, useEffect, useRef } from "react";

import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Search,
  Avatar,
  Conversation,
  ConversationList,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";

import AttachPreview from "./SquealBox/AttachPreview";

import { useMediaQuery } from "react-responsive";

import guesticon from "../assets/guesticon.png";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import config from "../config/config";

function ChatUI({ myself }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const axiosInstance = useAxiosPrivate();

  // Conversations variables
  const [activeconversation, setActiveConversation] = useState({});

  const [conversationslist, setConversationslist] = useState([]);
  const [searchedconversations, setSearchedConversations] = useState([]);

  // Messages variables
  const [messages, setMessages] = useState([]);

  const fileInputRef = useRef(null);
  const [mfile, setMfile] = useState(null);

  // UI variables
  const [showsidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      axiosInstance
        .get(
          config.endpoint.users +
            "/" +
            sessionStorage.getItem("userid") +
            "/conversations"
        )
        .then((res) => {
          // Check if in the response there are conversations
          if (res.status === 204) {
            return;
          }

          // Remove myself from the list of users and keep the data of the other user, rename the field to only have user2 in the name
          res.data = res.data.map((convo) => {
            if (convo.user1._id === myself._id) {
              delete convo.user1;
            } else {
              convo.user2 = convo.user1;
              delete convo.user1;
            }
            return convo;
          });

          setConversationslist(res.data);
          setSearchedConversations(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchConversations();
  }, []);

  function handleSendMessage(event) {
    // setMessages([
    //   ...messages,
    //   {
    //     message: event,
    //     sentTime: "adesso",
    //     sender: "Test 1",
    //     outgoing: true,
    //   },
    // ]);
  }

  function handleCovoChange(cname) {
    cname.user2.profilePic = cname.user2.profilePic
      ? cname.user2.profilePic
      : guesticon;

    setActiveConversation(cname);

    // fetch dei messaggi della conversazione cambiata

    axiosInstance
      .get(
        config.endpoint.users +
          "/" +
          sessionStorage.getItem("userid") +
          "/conversations/" +
          cname._id
      )
      .then((res) => {
        // Check if in the response there are messages
        if (res.status === 204) {
          setMessages([]);
          return;
        }
        console.log(res.data);
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // setConversationslist(
    //   conversationslist.map((convo) => {
    //     if (convo.sender === cname.name) {
    //       convo.nuoviMessaggi = 0;
    //     }
    //     return convo;
    //   })
    // );
  }

  function handleSearch(event) {
    // fetch dei messaggi della conversazione cambiata

    if (event === "") {
      setSearchedConversations(conversationslist);
      return;
    }

    const filteredconvos = conversationslist.filter((convo) => {
      return convo.user2.firstname.toLowerCase().includes(event.toLowerCase());
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
      console.log("Selected file: ", selectedFile);
      setMfile(selectedFile);
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
              placeholder="Cerca..."
              onChange={handleSearch}
              onClearClick={() => {
                setSearchedConversations(conversationslist);
              }}
              className="mb-3"
            />
          </div>
          <ConversationList scrollable>
            {searchedconversations.map((convo, key) => {
              return (
                <Conversation
                  key={key}
                  name={
                    convo.user2?.firstname +
                    " " +
                    convo.user2?.surname +
                    " @" +
                    convo.user2?.username
                  }
                  onClick={() => {
                    setShowSidebar(!showsidebar);
                    handleCovoChange(convo);
                  }}
                  style={{
                    border: "1px solid darkgray",
                    borderRadius: "20px",
                    marginBottom: "10px",
                  }}
                >
                  <Avatar
                    src={
                      convo.user2?.profilePic
                        ? convo.user2.profilePic
                        : guesticon
                    }
                    name={convo.user2?.firstname}
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
                src={
                  activeconversation.user2?.profilePic
                    ? activeconversation.user2.profilePic
                    : guesticon
                }
                name={activeconversation.user2.firstname}
              />

              <ConversationHeader.Content
                userName={activeconversation.user2.firstname}
              />
            </ConversationHeader>

            <MessageList>
              {messages.map((message, index) =>
                // Check if the message is incoming or outgoing, check if the message is a file or a text
                message.contentType === "text" ? (
                  <Message
                    key={index}
                    model={{
                      message: message.content,
                      sender: message.author === myself._id ? "Me" : "Other",
                      sentTime: message.createdAt,
                      direction:
                        message.author === myself._id ? "outgoing" : "incoming",
                    }}
                  >
                    <Avatar
                      src={
                        message.author === myself._id
                          ? myself.profilePic
                          : activeconversation.user2?.profilePic
                      }
                    />

                    <Message.Header sender="Other" sentTime="just now" />
                  </Message>
                ) : null
              )}

              {/* <Message
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
              </Message> */}
            </MessageList>
          </ChatContainer>

          <div
            style={{
              position: "absolute",
              bottom: "60px",
            }}
          >
            <AttachPreview />
          </div>

          <MessageInput
            placeholder="Scrivi qui il tuo messaggio"
            onSend={handleSendMessage}
            onAttachClick={handleAttachmentButtonClick}
            style={{
              position: "absolute",
              bottom: "10px",
              width: "100%",
              backgroundColor: theme.colors.white,
            }}
          />
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
