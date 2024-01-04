function isUserLoggedIn() {
  // Return true if logged in, false if not.
  var token = sessionStorage.getItem("token");

  return !(token === null);
}
$(function () {
  $("#nav-placeholder").load("navBar.html");
});

let usersData = []; // To store the user data
// Function to fetch user data
function fetchUserData() {
  $.get("http://localhost:3500/api/users", function (data) {
    // Store user data and populate the user list

    usersData = data;
    populateUserList(usersData);
  });
}

// Function to populate the user list
function populateUserList(users) {
  const nameFilter = $("#nameFilter").val().toLowerCase();
  const professionalFilter = $("#professionalFilter").val();
  const verifiedFilter = $("#verifiedFilter").val();
  const blockedFilter = $("#blockedFilter").val();

  const userList = $("#userList");
  userList.empty();

  users.forEach(function (user) {
    if (
      (nameFilter === "" || user.username.toLowerCase().includes(nameFilter)) &&
      (professionalFilter === "" ||
        user.professional?.toString() === professionalFilter) &&
      (verifiedFilter === "" || user.verified?.toString() === verifiedFilter) &&
      (blockedFilter === "" || user.blocked?.toString() === blockedFilter)
    ) {
      userList.append(
        "<tr><td>" +
          user.username +
          "</td><td>" +
          user.firstname +
          "</td><td>" +
          user.surname +
          "</td><td>" +
          user.email +
          "</td><td>" +
          user.professional +
          "</td><td>" +
          user.verified +
          "</td><td>" +
          user.dailyChar +
          " - " +
          user.weeklyChar +
          " - " +
          user.monthlyChar +
          "</td><td>" +
          user.blocked +
          "</td><td>" +
          `<button class='btn btn-primary' onclick='actionButtonClick("${user._id}")'>Action</button>` +
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
  $("#nameFilter, #verifiedFilter, #professionalFilter, #blockedFilter").on(
    "input",
    function () {
      populateUserList(usersData);
    }
  );

  // Add an event listener to the "Fetch Users" button
  $("#fetchUsersButton").click(function () {
    fetchUserData();
  });

  // Listener for labels visibility
  $("#professionalFilter").change(function () {
    const label = $('label[for="professionalFilter"]');
    label.css("visibility", this.value !== "" ? "visible" : "hidden");
  });

  $("#verifiedFilter").change(function () {
    const label = $('label[for="verifiedFilter"]');
    label.css("visibility", this.value !== "" ? "visible" : "hidden");
  });

  $("#blockedFilter").change(function () {
    const label = $('label[for="blockedFilter"]');
    label.css("visibility", this.value !== "" ? "visible" : "hidden");
  });

  $("#nameFilter").on("input", function () {
    const label = $('label[for="nameFilter"]');
    label.css("visibility", this.value.trim() !== "" ? "visible" : "hidden");
  });

  //bottoni nel modale
  $("#blockUserBtn").click(function () {
    const user = $("#userModalLabel").data("user");
    changeBlockSblockButton(true);
    blockUser(user._id);
  });
  $("#unblockUserBtn").click(function () {
    const user = $("#userModalLabel").data("user");
    changeBlockSblockButton(false);
    blockUser(user._id);
  });

  $("#add500CharsBtn").click(function () {
    const user = $("#userModalLabel").data("user");
    add500Chars(user._id);
  });

  $("#add1000CharsBtn").click(function () {
    const user = $("#userModalLabel").data("user");
    add1000Chars(user._id);
  });
});

function actionButtonClick(userId) {
  console.log("Button clicked for user ID: " + userId);
  // Popola il contenuto del modal con le informazioni dell'utente
  const user = usersData.find((u) => u._id === userId);

  // Popola il contenuto del modal con le informazioni dell'utente
  $("#userModalLabel").text(
    `${user.username}, ${user.firstname} ${user.surname}`
  );
  // // Imposta l'ID dell'utente come attributo data nell'elemento userModalLabel
  $("#userModalLabel").data("user", user);

  changeBlockSblockButton(user.blocked);

  // $("#userModal").modal("show");
  var myModal = new bootstrap.Modal(document.getElementById("userModal"));
  myModal.show();
}

// Funzione per bloccare l'utente
function blockUser(userId) {
  const token = sessionStorage.getItem("token");
  const url = `http://localhost:3500/api/users/${userId}/blocked`;

  $.ajax({
    type: "PATCH",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    success: function (data) {
      console.log("User blocked successfully:", data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Accesso dell'utente modificato con successo",
      });
    },
    error: function (error) {
      console.error("Error blocking user:", error);
    },
  });
}

// Funzione per aggiungere 500 caratteri
function add500Chars(userId) {
  const token = sessionStorage.getItem("token");
  const url = `http://localhost:3500/api/users/${userId}/charAvailable`;

  const requestBody = {
    char: 500,
  };

  $.ajax({
    type: "POST",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
    data: JSON.stringify(requestBody),
    success: function (data) {
      console.log("500 caratteri aggiunti al profilo:", data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "500 caratteri aggiunti al profilo",
      });
    },
    error: function (error) {
      console.error("Error adding 500 chars:", error);
    },
  });
}

// Funzione per aggiungere 1000 caratteri
function add1000Chars(userId) {
  const token = sessionStorage.getItem("token");
  const url = `http://localhost:3500/api/users/${userId}/charAvailable`;

  const requestBody = {
    char: 1000,
  };

  $.ajax({
    type: "POST",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    contentType: "application/json",
    data: JSON.stringify(requestBody),
    success: function (data) {
      console.log("Added 1000 chars successfully:", data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "1000 caratteri aggiunti al profilo",
      });
    },
    error: function (error) {
      console.error("Error adding 1000 chars:", error);
    },
  });
}

function changeBlockSblockButton(blocked) {
  if (blocked) {
    $("#unblockUserBtn").show();
    $("#blockUserBtn").hide();
  } else {
    $("#unblockUserBtn").hide();
    $("#blockUserBtn").show();
  }
}
