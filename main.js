"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const clock = document.querySelector(".clock");
  const startButton = document.querySelector(".start-button");
  const errorWindow = document.querySelector(".error-window");
  const confirmButton = document.querySelector(".error-window__confirm-button");
  const closeButton = document.querySelector(".error-window__close-button");

  const sound = new Audio("public/error-sound.mp3");

  let counter = 0;
  let cursorCounter = 0;
  
  let isBuggedWindowEffectActive = false;
  let isBuggedCursorEffectActive = false;

  const getErrorWindowTemplate = () => {
    `<div class="error-window__header">
        <div class="error-window__wrapper">
          <div class="error-window__corner"></div>
          <div class="error-window__title">Fatal Error</div>
        </div>
        <div class="error-window__close-button"></div>
      </div>
      <div class="error-window__body">
        <div class="error-window__content">
          <img src="public/error-icon.png" alt="error-windows" class="error-window__icon" />
          <div class="error-window__text">
            System process “svchost.exe” has unexpectedly stopped. Your system is unstable and must be restarted.
          </div>
        </div>
        <button class="error-window__confirm-button">OK</button>
      </div>`;
  }

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const playSound = () => {
    sound.currentTime = 0;
    sound.play(); 
  }

  const getRandomCoords = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight; 

    const ERROR_WINDOW_WIDTH = 300;
    const ERROR_WINDOW_HEIGTH = 120;

    return {
      x: getRandomNumber(ERROR_WINDOW_WIDTH, windowWidth),
      y: getRandomNumber(ERROR_WINDOW_HEIGTH, windowHeight),
    };
  };

  const getCurrentTime = (element) => {
    const currentDate = new Date();

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    element.textContent = `${hours}:${minutes}`;

    setTimeout(() => {
      getCurrentTime(element);
    }, 1000);
  };

  startButton.addEventListener("click", () => {
    playSound();
    errorWindow.classList.remove("hidden");
  });

  const makeNewErrorWindow = () => {
    const { x, y } = getRandomCoords();
    const newErrorWindow = document.createElement("div");

    newErrorWindow.classList.add("error-window");
    newErrorWindow.innerHTML = getErrorWindowTemplate();

    newErrorWindow.style.left = `${x}px`;
    newErrorWindow.style.top = `${y}px`;

    document.body.appendChild(newErrorWindow);

    const newConfirmButton = newErrorWindow.querySelector(
      ".error-window__confirm-button"
    );
    newConfirmButton.addEventListener("click", () => {
      counter++;
      playSound();
      makeNewErrorWindow();
      makeBuggedWindowEffect();
    });

    const newCloseButton = newErrorWindow.querySelector(
      ".error-window__close-button"
    );
    newCloseButton.addEventListener("click", () => {
      cursorCounter++;
      playSound();
      makeNewErrorWindow();
      makeBuggedCursorEffect();
    });
  };

  const makeBuggedWindowEffect = () => {
    if (counter >= 3) {
      document.addEventListener("mouseover", (event) => {
        const xCoord = event.clientX;
        const yCoord = event.clientY;
        const newErrorWindow = document.createElement("div");

        newErrorWindow.classList.add("error-window");
        newErrorWindow.innerHTML = getErrorWindowTemplate();
      
        newErrorWindow.style.left = `${xCoord}px`;
        newErrorWindow.style.top = `${yCoord}px`;
        newErrorWindow.style.transform = "";

        document.body.appendChild(newErrorWindow);
      });
    }
  };

  const makeBuggedCursorEffect = () => {
    if (cursorCounter >= 3) {
      document.addEventListener("mouseover", (event) => {
        const xCoord = event.clientX;
        const yCoord = event.clientY;
        const newCursorBugDiv = document.createElement("div");

        newCursorBugDiv.classList.add("cursor");

        newCursorBugDiv.style.left = `${xCoord}px`;
        newCursorBugDiv.style.top = `${yCoord}px`;

        document.body.appendChild(newCursorBugDiv);
      });
    }
  };

  confirmButton.addEventListener("click", () => {
    counter++;
    playSound();
    makeNewErrorWindow();
    makeBuggedWindowEffect();
  });

  closeButton.addEventListener("click", () => {
    cursorCounter++;
    playSound();
    makeNewErrorWindow();
    makeBuggedCursorEffect();
  });

  getCurrentTime(clock);
});