function isUserLoggedIn() {
  // Return true if logged in, false if not.
  var token = sessionStorage.getItem("token");

  return !(token === null);
}

$(function () {
  $("#nav-placeholder").load("navBar.html");
});
$(document).ready(function () {
  if (!isUserLoggedIn()) {
    // Il token non è presente nel sessionStorage, redirect alla pagina di login
    window.location.href = "./";
  }

  // Ottieni l'id del messaggio dalla query string
  const urlParams = new URLSearchParams(window.location.search);
  const channelId = urlParams.get("id");
  fetchMessageData(channelId);
});

function fetchMessageData(channelId) {
  $.ajax({
    url: `${constants.url}channels/${channelId}`,
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + sessionStorage.getItem("token")
      );
    },
    success: function (data) {
      $("#channelName").text(`Name: ${data.name}`);
      if (data?.description)
        $("#channelDesc").text(`Description: ${data.description}`);
      $("#numFollower").text(`Number of follower: ${data.numFollower}`);
      $("#numSqueal").text(`Number of squeal: ${data.numSqueal}`);
      $("#channelPrivate").text(`private: ${data.private}`);
      $("#channelEditorial").text(`Editorial: ${data.editorialChannel}`);
      $("#channelBlocked").text(`Blocked: ${data.blocked}`);
      $("#channelCreationDate").text(`Created at: ${data.createdAt}`);
      $("#channelId").text(`Id: ${data._id}`);
      $("#channelAdmins").text(
        `Admins: ${data.admins.map((item) => item.userId.username)}`
      );
      $("#_id").text(`ID: ${data._id}`);

      if (data.editorialChannel) {
        document.getElementById("deleteChannelDiv").style.display = "block";
        document.getElementById("deleteChannelDiv").style.display = "block";
      }
    },
    error: function (xhr, status, error) {
      console.log(status);
      console.log(error);
      alert("Impossibile caricare i messaggi.");
    },
  });
}

function changeName() {
  // Get values from the form
  var name = $("#newName").val();

  const urlParams = new URLSearchParams(window.location.search);
  const channelId = urlParams.get("id");

  const token = sessionStorage.getItem("token");

  $.ajax({
    type: "PATCH",
    url: `${constants.url}channels/` + channelId + "/name",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
    data: JSON.stringify({
      name,
    }),
    success: function (response) {
      console.log("Request sent successfully:", response);
      location.reload();
    },
    error: function (error) {
      console.error("Error sending request:", error);
      alert("ERRORE");
    },
  });
}

function changeDescription() {
  // Get values from the form
  var description = $("#newDescription").val();

  const urlParams = new URLSearchParams(window.location.search);
  const channelId = urlParams.get("id");

  const token = sessionStorage.getItem("token");

  $.ajax({
    type: "PATCH",
    url: `${constants.url}channels/` + channelId + "/description",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
    data: JSON.stringify({
      description,
    }),
    success: function (response) {
      console.log("Request sent successfully:", response);
      location.reload();
    },
    error: function (error) {
      console.error("Error sending request:", error);
      alert("ERROR");
    },
  });
}

function deleteChannel() {
  const urlParams = new URLSearchParams(window.location.search);
  const channelId = urlParams.get("id");

  const token = sessionStorage.getItem("token");
  const url = `${constants.url}channels/${channelId}`;

  $.ajax({
    type: "DELETE",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
    success: function (data) {
      console.log("Channel deleted:", data);
      alert("Channel eliminato");
      window.location.href = "/moddash/channels.html";
    },
    error: function (error) {
      alert("error");
      console.error("Error deleting the channel", error);
    },
  });
}

function createSqueal() {
  const urlParams = new URLSearchParams(window.location.search);
  const channel = urlParams.get("id");

  const token = sessionStorage.getItem("token");
  const url = `${constants.url}squeals`;

  const content = $("#squealContent").val();
  const data = JSON.stringify({
    content,
    contentType: "text",
    channel,
  });

  $.ajax({
    type: "POST",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
    data,
    success: function (data) {
      console.log("squeal creato:", data);
      alert("Squeal creato con successo");
    },
    error: function (error) {
      alert("error");
      console.error("Error deleting the channel", error);
    },
  });
}
