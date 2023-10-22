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

const conversations = [
  {
    sender: "Test 1",
    lastSenderName: "Test 1",
    lastMessage: "Ultimo messaggio",
    nuoviMessaggi: 0,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 2",
    lastSenderName: "Test 2",
    lastMessage: "Ultimo messaggio 2",
    nuoviMessaggi: 3,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
  {
    sender: "Test 3",
    lastSenderName: "Test 3",
    lastMessage: "Ultimo messaggio 3",
    nuoviMessaggi: 45,
    senderAvatar: "https://picsum.photos/200",
  },
];

const messagesT1 = [
  {
    message: "Hello my friend 1",
    sentTime: "just now",
    sender: "Joe",
    outgoing: false,
  },
  {
    message: "Hello my friend 2",
    sentTime: "just now",
    sender: "Joe",
    outgoing: false,
  },
  {
    message: "Hello my friend 3",
    sentTime: "just now",
    sender: "Joe",
    outgoing: false,
  },
];

const sampledata = {
  model,
  convomodel,
  conversations,
  messagesT1,
};

export default sampledata;
