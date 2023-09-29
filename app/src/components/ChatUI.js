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
  const [conversation, setConversation] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // fetch dei messaggi
    const model = {
      message: "Hello my friend",
      sentTime: "just now",
      sender: "Joe",
      outgoing: false,
    };

    const convomodel = {
      // prendere dati dal db
      name: "Joe",
      lastSenderName: "Joe",
      info: "Ultimo messaggio se abbiamo voglia di farlo",
      unreadCnt: 0,
      active: true,
    };

    setMessages([...messages, model]);
    setConversation(convomodel);
  }, []);

  function handleSendMessage(event) {
    setMessages([
      ...messages,
      {
        message: event,
        sentTime: "just now",
        sender: "MIO USERNAME",
        outgoing: true,
      },
    ]);
  }

  function handleCovoChange(data) {
    // fetch dei messaggi della conversazione cambiata

    setConversation(data);
    setMessages([
      {
        message: "Hello my friend",
        sentTime: "just now",
        sender: data.name,
        outgoing: false,
      },
      {
        message: "Conversazione di Lily",
        sentTime: "just now",
        sender: data.name,
        outgoing: false,
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
              active={conversation.name === "Joe"}
              onClick={() => {
                handleCovoChange({
                  name: "Joe",
                  lastSenderName: "Joe",
                  info: "Ultimo messaggio se abbiamo voglia di farlo",
                  unreadCnt: 0,
                  active: true,
                });
              }}
            >
              <Avatar src="https://picsum.photos/200/300" name="Joe" />
            </Conversation>

            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Ultimo messaggio se abbiamo voglia di farlo"
              unreadCnt={0}
              active={conversation.name === "Lilly"}
              onClick={() => {
                handleCovoChange({
                  name: "Lily",
                  lastSenderName: "Lily",
                  info: "Ultimo messaggio se abbiamo voglia di farlo",
                  unreadCnt: 0,
                  active: true,
                });
              }}
            >
              <Avatar src="https://picsum.photos/200/300" name="Lilly" />
            </Conversation>
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <ConversationHeader>
            <Avatar
              src="https://picsum.photos/300/300"
              name={conversation.name}
            />
            <ConversationHeader.Content userName={conversation.name} />
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
                  direction: message.outgoing ? "outgoing" : "incoming",
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
