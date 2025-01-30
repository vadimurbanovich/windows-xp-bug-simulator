"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const ERROR_WINDOW_WIDTH = 300;
  const ERROR_WINDOW_HEIGHT = 125;

  const clock = document.querySelector(".clock");
  const startButton = document.querySelector(".start-button");
  const errorWindow = document.querySelector(".error-window");
  const confirmButton = document.querySelector(".error-window__confirm-button");
  const closeButton = document.querySelector(".error-window__close-button");

  const sound = new Audio("public/error-sound.mp3");

  let windowCounter = 0;
  let cursorCounter = 0;

  let isBuggedWindowEffectActive = false;
  let isBuggedCursorEffectActive = false;

  const getErrorWindowTemplate = () => {
    return `<div class="error-window__header">
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
  };

  const makeBuggedWindowEffect = () => {
    if (windowCounter >= 3) {
      isBuggedWindowEffectActive = true;
    }
  };

  const makeBuggedCursorEffect = () => {
    if (cursorCounter >= 3) {
      isBuggedCursorEffectActive = true;
    }
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const playSound = () => {
    sound.currentTime = 0;
    sound.play();
  };

  const getRandomCoords = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    return {
      x: getRandomNumber(ERROR_WINDOW_WIDTH, windowWidth),
      y: getRandomNumber(ERROR_WINDOW_HEIGHT, windowHeight),
    };
  };

  const getCurrentTime = (element) => {
    const updateTime = () => {
      const currentDate = new Date();

      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");

      element.textContent = `${hours}:${minutes}`;
    };

    updateTime();
    setInterval(() => {
      updateTime
    }, 1000);
  };

  startButton.addEventListener("click", () => {
    playSound();
    errorWindow.classList.remove("hidden");
  });

  const handleWindowInteraction = (counterType) => {
    if (counterType === "window") windowCounter++;
    if (counterType === "cursor") cursorCounter++;

    playSound();
    makeNewErrorWindow();

    if (counterType === "window") makeBuggedWindowEffect();
    if (counterType === "cursor") makeBuggedCursorEffect();
  };

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
    newConfirmButton.addEventListener("click", () =>
      handleWindowInteraction("window")
    );

    const newCloseButton = newErrorWindow.querySelector(
      ".error-window__close-button"
    );
    newCloseButton.addEventListener("click", () =>
      handleWindowInteraction("cursor")
    );
  };

  document.addEventListener("mouseover", (event) => {
    if (isBuggedWindowEffectActive) {
      createElementAt(
        "div",
        "error-window",
        getErrorWindowTemplate(),
        event.clientX,
        event.clientY
      );
    }
    if (isBuggedCursorEffectActive) {
      createElementAt("div", "cursor", event.clientX, event.clientY);
    }
  });

  const createElementAt = (tag, className, innerHTML = "", x, y) => {
    const newElement = document.createElement(tag);

    newElement.classList.add(className);
    newElement.innerHTML = innerHTML;

    newElement.style.left = `${x}px`;
    newElement.style.top = `${y}px`;
    newElement.style.transform = "";

    document.body.appendChild(newElement);
  };

  confirmButton.addEventListener("click", () =>
    handleWindowInteraction("window")
  );

  closeButton.addEventListener("click", () =>
    handleWindowInteraction("cursor")
  );

  getCurrentTime(clock);
});
