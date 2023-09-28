import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useState, useEffect } from "react";

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

function ChatUI() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // fetch dei messaggi
    const model = {
      message: "Hello my friend",
      sentTime: "just now",
      sender: "Joe",
    };

    setMessages([...messages, model]);
  }, []);

  function handleSendMessage(event) {
    setMessages([
      ...messages,
      {
        message: event,
        sentTime: "just now",
        sender: "MIO USERNAME",
      },
    ]);
  }

  return (
    <div className="container-fluid" style={{ height: "100%" }}>
      <MainContainer>
        <Sidebar position="left" scrollable={true}>
          <Search placeholder="Search..." />
          <ConversationList>
            <Conversation
              name="Joe"
              lastSenderName="Joe"
              info="Ultimo messaggio se abbiamo voglia di farlo"
              unreadCnt={0}
              active={true}
              onClick={() => {
                console.log("Clicked on conversation");
              }}
            >
              <Avatar src="https://picsum.photos/200/300" name="Joe" />
            </Conversation>

            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Ultimo messaggio se abbiamo voglia di farlo"
              unreadCnt={0}
              active={false}
              onClick={() => {
                console.log("Clicked on conversation");
              }}
            >
              <Avatar src="https://picsum.photos/200/300" name="Lilly" />
            </Conversation>
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <ConversationHeader>
            <Avatar src="https://picsum.photos/300/300" name="Joe" />
            <ConversationHeader.Content userName="Joe" />
            <ConversationHeader.Actions>
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>

          <MessageList>
            {messages.map((message, index) => (
              <Message
                key={index}
                model={{
                  message: message.message,
                  sentTime: message.sentTime,
                  sender: message.sender,
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Scrivi qui il tuo messaggio"
            onSend={handleSendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default ChatUI;
