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
  InfoButton,
} from "@chatscope/chat-ui-kit-react";

import sample from "../assets/conversationsample";

function ChatUI() {
  const fileInputRef = useRef(null);

  const [activeconversation, setActiveConversation] = useState({});
  const [conversationslist, setConversationslist] = useState([]);
  const [searchedconversations, setSearchedConversations] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setConversationslist(sample.conversations);
    setSearchedConversations(sample.conversations);
    setMessages([...messages, sample.model]);
    setActiveConversation(sample.convomodel);
  }, []);

  function handleSendMessage(event) {
    setMessages([
      ...messages,
      {
        message: event,
        sentTime: "adesso",
        sender: "TEST MESSAGGIO",
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
    <div className="container-fluid" style={{ height: "100%" }}>
      <MainContainer>
        <Sidebar position="left" scrollable={true}>
          <Search
            placeholder="Search..."
            onChange={handleSearch}
            onClearClick={() => {
              setSearchedConversations(sample.conversations);
            }}
          />
          <ConversationList>
            {searchedconversations.map((convo, key) => {
              return (
                <Conversation
                  key={key}
                  name={convo.sender}
                  lastSenderName={convo.lastSenderName}
                  info={convo.lastMessage}
                  unreadCnt={convo.nuoviMessaggi}
                  active={activeconversation.name === convo.sender}
                  onClick={() => {
                    handleCovoChange({
                      name: convo.sender,
                      lastSenderName: convo.lastSenderName,
                      info: convo.lastMessage,
                      unreadCnt: 0,
                      active: true,
                    });
                  }}
                >
                  <Avatar src={convo.senderAvatar} name={convo.sender} />
                </Conversation>
              );
            })}
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <ConversationHeader>
            <Avatar
              src="https://picsum.photos/300/300"
              name={activeconversation.name}
            />
            <ConversationHeader.Content userName={activeconversation.name} />
          </ConversationHeader>

          <MessageList>
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
          </MessageList>

          <MessageInput
            placeholder="Scrivi qui il tuo messaggio"
            onSend={handleSendMessage}
            onAttachClick={handleAttachmentButtonClick}
          />
        </ChatContainer>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
      </MainContainer>
    </div>
  );
}

export default ChatUI;
