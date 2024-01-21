function isUserLoggedIn() {
  // Return true if logged in, false if not.
  var token = sessionStorage.getItem("token");

  return !(token === null);
}
$(function () {
  $("#nav-placeholder").load("navBar.html");
});

let channelsData = []; // To store the channel data

function fetchChannelData() {
  $.ajax({
    url: "http://localhost:3500/api/channels",
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + sessionStorage.getItem("token")
      );
    },
    success: function (data) {
      channelsData = data;
      populateChannelList(channelsData);
    },
    error: function (xhr, status, error) {
      console.log(status);
      console.log(error);
      alert("Impossibile caricare i messaggi.");
    },
  });
}

function populateChannelList(channels) {
  const nameFilter = $("#nameFilter").val().toLowerCase();
  const privateFilter = $("#privateFilter").val();
  const editorialFilter = $("#editorialFilter").val();
  const blockedFilter = $("#blockedFilter").val();
  const adminFilter = $("#adminFilter").val().toLowerCase();
  const squealFilter = $("#squealFilter").val();
  const followerFilter = $("#followerFilter").val();

  const channelList = $("#channelList");
  channelList.empty();

  channels.forEach(function (channel) {
    console.log(channel);
    if (
      (nameFilter === "" || channel.name.toLowerCase().includes(nameFilter)) &&
      (privateFilter === "" || channel.private?.toString() === privateFilter) &&
      (editorialFilter === "" ||
        channel.editorialChannel?.toString() === editorialFilter) &&
      (blockedFilter === "" || channel.blocked?.toString() === blockedFilter) &&
      (adminFilter === "" ||
        channel.admins.some((admin) =>
          admin.userId?.username?.includes(adminFilter)
        )) &&
      (squealFilter === "" || channel.numSqueal >= squealFilter) &&
      (followerFilter === "" || channel.numFollower >= followerFilter)
    ) {
      channelList.append(
        "<tr><td>" +
          channel.name +
          "</td><td>" +
          channel.numSqueal +
          "</td><td>" +
          channel.numFollower +
          "</td><td>" +
          channel.private +
          "</td><td>" +
          channel.editorialChannel +
          "</td><td>" +
          channel.admins.map((item) => item.userId.username) +
          "</td><td>" +
          channel.blocked +
          "</td><td>" +
          `<button class='btn btn-primary' onclick='window.location.href="/channel.html?id=${channel._id}"'>Details</button>` +
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
  $(
    "#nameFilter, #squealFilter, #followerFilter, #adminFilter, #privateFilter, #editorialFilter, #blockedFilter"
  ).on("input", function () {
    populateChannelList(channelsData);
  });

  // Add an event listener to the "Fetch Channels" button
  $("#fetchChannelsButton").click(function () {
    fetchChannelData();
  });

  // Listener for labels visibility
  $("#blockedFilter").change(function () {
    const label = $('label[for="blockedFilter"]');
    label.css("visibility", this.value !== "" ? "visible" : "hidden");
  });

  $("#privateFilter").change(function () {
    const label = $('label[for="privateFilter"]');
    label.css("visibility", this.value !== "" ? "visible" : "hidden");
  });

  $("#editorialFilter").change(function () {
    const label = $('label[for="editorialFilter"]');
    label.css("visibility", this.value !== "" ? "visible" : "hidden");
  });

  $("#nameFilter").on("input", function () {
    const label = $('label[for="nameFilter"]');
    label.css("visibility", this.value.trim() !== "" ? "visible" : "hidden");
  });
  $("#adminFilter").on("input", function () {
    const label = $('label[for="adminFilter"]');
    label.css("visibility", this.value.trim() !== "" ? "visible" : "hidden");
  });
});

function createNewChannel() {
  const urlParams = new URLSearchParams(window.location.search);
  const channelId = urlParams.get("id");

  const token = sessionStorage.getItem("token");
  const url = `http://localhost:3500/api/channels`;

  const channelName = $("#newChannelBox").val()?.toUpperCase();

  $.ajax({
    type: "POST",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
    data: JSON.stringify({
      channelName,
      editorialChannel: "true",
    }),
    success: function (data) {
      console.log("Channel created:", data);
      alert("Channel created");
      window.location.href = "/channels.html";
    },
    error: function (error) {
      alert("error");
      console.error("Error deleting the channel", error);
    },
  });
}
