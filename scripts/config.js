function openPlayerConfig(event) {
  const selectedPlayerId = +event.target.dataset.playerid; //A + operátor számot csinál a stringből
  editedPlayer = selectedPlayerId;
  playerConfigOverlayElement.style.display = "block";
  inputNameElement.focus();
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.classList.remove("error");
  configErrorsOutputElement.classList.remove("error")
  configErrorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername").trim();

  if (!enteredPlayerName) {
    //Ha a trim() eredménye [], az falsy
    event.target.classList.add("error");
    configErrorsOutputElement.classList.add("error")
    configErrorsOutputElement.textContent = "Kérlek, adj meg egy érvényes nevet!";
    return;
  }

  const updatedPlayerDataElement = document.getElementById("player-" + editedPlayer + "-data");
  updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

  players[editedPlayer - 1].name = enteredPlayerName;

  closePlayerConfig();
}
