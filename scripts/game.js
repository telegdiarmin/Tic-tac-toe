function resetGameStatus() {
  activePlayer = 0;
  currentRound = 0;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML = "Te nyertél, <span id=\"winner-name\">JÁTÉKOS</span>!"; //Itt lehet még hiba!
  gameOverElement.style.display = "none";
  
  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = ""
      gameBoardItemElement.classList.remove("disabled")
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    startupErrorsOutputElement.classList.add("error");
    startupErrorsOutputElement.textContent =
      "Kérlek, adj meg érvényes neveket a játékosok számára!";
    return;
  } else {
    startupErrorsOutputElement.classList.remove("error");
    startupErrorsOutputElement.textContent = "";

    resetGameStatus();

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = "block";
  }
}

function switchPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver === true) {
    return;
  }
  const selectedField = event.target;

  const selectedColumn = selectedField.dataset.col;
  const selectedRow = selectedField.dataset.row;

  if (gameData[selectedRow - 1][selectedColumn - 1] !== 0) {
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow - 1][selectedColumn - 1] = activePlayer + 1;
  console.log(gameData);
  currentRound++;

  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  switchPlayer();
}

function checkForGameOver() {
  //Sorok ellenőrzése
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  //Oszlopok ellenőrzése
  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[1][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  //Átló ellenőrzése (bal felső -> jobb alsó)
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  //Átló ellenőrzése (jobb felső -> bal alsó)
  if (
    gameData[0][2] > 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[1][1] === gameData[2][0]
  ) {
    return gameData[0][2];
  }

  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "Döntetlen!";
  }
}
