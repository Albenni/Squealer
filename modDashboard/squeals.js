function isUserLoggedIn() {
  // Return true if logged in, false if not.
  var token = sessionStorage.getItem("token");

  return !(token === null);
}

$(function () {
  $("#nav-placeholder").load("navBar.html");
});
let messagesData = []; // To store the message data

// Function to fetch message data
function fetchMessageData() {
  $.ajax({
    url: `${constants.url}squeals`,
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + sessionStorage.getItem("token")
      );
    },
    success: function (data) {
      messagesData = data;
      populateMessageList(messagesData);
    },
    error: function (xhr, status, error) {
      console.log(status);
      console.log(error);
      alert("Impossibile caricare i messaggi.");
    },
  });
}

// Function to populate the message list
function populateMessageList(messages) {
  const authorFilter = $("#authorFilter").val().toLowerCase();
  const contentTypeFilter = $("#contentTypeFilter").val();
  const dateFilter = new Date($("#dateFilter").val()).toLocaleDateString();
  const receiverFilter = $("#receiverFilter").val().toLowerCase();

  const messageList = $("#messageList");
  messageList.empty();

  messages.forEach(function (message) {
    console.log(message);
    if (
      (authorFilter === "" ||
        message.author.username.toLowerCase().includes(authorFilter)) &&
      (contentTypeFilter === "" || message.contentType === contentTypeFilter) &&
      ($("#dateFilter").val() === "" ||
        new Date(message.createdAt).toLocaleDateString() === dateFilter) &&
      (receiverFilter === "" ||
        message.receivers.some((receiver) =>
          receiver.group?.name?.includes(receiverFilter)
        ) ||
        (receiverFilter === "public" && message.publicSqueal))
    ) {
      messageList.append(
        "<tr><td>" +
          message.author.username +
          "</td><td>" +
          (message.publicSqueal
            ? "Public"
            : message.receivers?.map((item) => {
                return item.groupType === "Channel"
                  ? "§" + item.group?.name
                  : "#" + item.group?.name;
              })) +
          "</td><td>" +
          message.content +
          "</td><td>" +
          message.contentType +
          "</td><td>" +
          message.impression +
          "</td><td>" +
          new Date(message.createdAt).toLocaleDateString() +
          "</td><td>" +
          `<button class='btn btn-primary' onclick='window.location.href="/moddash/squeal.html?id=${message._id}"'>Details</button>` +
          "</td></tr>"
      );
    }
  });
}
$(document).ready(function () {
  if (!isUserLoggedIn()) {
    // Il token non è presente nel sessionStorage, redirect alla pagina di login
    window.location.href = "./";
  }
  // Add event listeners to the filters
  $("#authorFilter, #contentTypeFilter, #dateFilter, #receiverFilter").on(
    "input",
    function () {
      populateMessageList(messagesData);
    }
  );

  // Add an event listener to the "Fetch Messages" button
  $("#fetchMessagesButton").click(function () {
    fetchMessageData();
  });
  // Listener for labels visibility
  $("#authorFilter").change(function () {
    const label = $('label[for="authorFilter"]');
    label.css("visibility", this.value !== "" ? "visible" : "hidden");
  });

  $("#contentTypeFilter").change(function () {
    const label = $('label[for="contentTypeFilter"]');
    label.css("visibility", this.value !== "" ? "visible" : "hidden");
  });

  $("#dateFilter").change(function () {
    const label = $('label[for="dateFilter"]');
    label.css("visibility", this.value !== "" ? "visible" : "hidden");
  });

  $("#receiverFilter").on("input", function () {
    const label = $('label[for="receiverFilter"]');
    label.css("visibility", this.value.trim() !== "" ? "visible" : "hidden");
  });
});
