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
  const squealId = urlParams.get("id");
  fetchMessageData(squealId);
  getReactions(squealId);

  $("#deleteBtn").click(() => deleteSqueal(squealId));
});

function addReceiver() {
  // Get values from the form
  var boxId = $("#id").val();
  var groupType = $("#groupType").val();

  const urlParams = new URLSearchParams(window.location.search);
  const squealId = urlParams.get("id");

  const token = sessionStorage.getItem("token");

  // Make the POST request
  $.ajax({
    type: "POST",
    url: `${constants.url}squeals/` + squealId + "/receivers/" + boxId,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
    data: JSON.stringify({
      groupType,
    }),
    success: function (response) {
      console.log("Request sent successfully:", response);
      location.reload();
    },
    error: function (error) {
      console.error("Error sending request:", error);
      alert("ERRORE: receiver non aggiunto");
    },
  });
}

function getReactions(squealId) {
  const token = sessionStorage.getItem("token");

  $.ajax({
    type: "GET",
    url: `${constants.url}squeals/` + squealId + "/reactions",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
    success: function (data) {
      $("#reactionPos").text(
        `Positive reactions: ${2 * data.pos3Reac + data.pos2Reac}`
      );
      $("#reactionNeg").text(
        `Negative reactions: ${2 * data.neg0Reac + data.neg1Reac}`
      );
    },
    error: function (error) {
      console.error("Error sending request:", error);
      alert("ERRORE: impossibile aggiungere reazioni");
    },
  });
}

function addReactions() {
  // Get values from the form
  var reaction = $("#reactionNumber").val();
  var reactionType = $("#reactionType").val();

  const urlParams = new URLSearchParams(window.location.search);
  const squealId = urlParams.get("id");

  const token = sessionStorage.getItem("token");

  // Make the POST request
  $.ajax({
    type: "POST",
    url: `${constants.url}squeals/` + squealId + "/reactions",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
    data: JSON.stringify({
      reaction,
      reactionType,
    }),
    success: function (response) {
      console.log("Request sent successfully:", response);
      location.reload();
    },
    error: function (error) {
      console.error("Error sending request:", error);
      alert("ERRORE: impossibile aggiungere reazioni");
    },
  });
}

function fetchMessageData(squealId) {
  $.ajax({
    url: `${constants.url}squeals?id=${squealId}`,
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + sessionStorage.getItem("token")
      );
    },
    success: function (data) {
      $("#author").text(`Autore: ${data.author.username}`);
      $("#category").text(`Categoria: ${data.category}`);
      $("#content").text(`Contenuto: ${data.content}`);
      $("#contentType").text(`Tipo Contenuto: ${data.contentType}`);
      $("#createdAt").text(`Creato il: ${data.createdAt}`);
      $("#impression").text(`Impression: ${data.impression}`);
      $("#receivers").text(
        `Destinatari: ${
          data.publicSqueal
            ? "Public"
            : data.receivers.map((item) => {
                return item.groupType === "Channel"
                  ? "§" + item.group?.name
                  : "#" + item.group?.name;
              })
        }`
      );
      $("#_id").text(`ID: ${data._id}`);

      if (!data.publicSqueal) {
        document.getElementById("addReceiverDiv").style.display = "block";
      }
    },
    error: function (xhr, status, error) {
      console.log(status);
      console.log(error);
      alert("Impossibile caricare i messaggi.");
    },
  });
}

function deleteSqueal(squealId) {
  const token = sessionStorage.getItem("token");
  const url = `${constants.url}squeals/${squealId}`;

  $.ajax({
    type: "DELETE",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
    success: function (data) {
      console.log("Squeal deleted:", data);
      alert("Squeal eliminato");
      window.location.href = "/moddash/squeals.html";
    },
    error: function (error) {
      alert("error");
      console.error("Error deleting the squeal", error);
    },
  });
}
