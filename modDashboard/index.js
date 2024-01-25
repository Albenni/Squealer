$(document).ready(function () {
  $("#loginForm").submit(function (event) {
    event.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();

    $.ajax({
      url: constants.url + "auth/moderator",
      method: "POST",
      data: { user: username, pwd: password },
      success: function (data) {
        // Salva il token nella sessionStorage

        sessionStorage.setItem("token", data.accessToken);

        // Reindirizza alla dashboard o alla pagina successiva
        window.location.href = "users.html";
      },
      error: function (xhr, status, error) {
        alert("Errore durante il login. Controlla le credenziali e riprova.");
      },
    });
  });
});
