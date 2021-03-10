let imageLibrary = [];
let imageLibrarySecondary = [];
let imageLibraryForest = [];
let allViewButtons = [];
let allEditButtons = [];
let imageSet_One;

function successAlert(numberOfImages) {
  const alert = document.querySelector(".alert-success");
  alert.classList.remove("d-none");
  alert.classList.remove("slide-out-top");
  alert.classList.add("d-block");
  alert.classList.add("swing-in-top-fwd");
  alert.innerText = `Successfully loaded ${numberOfImages} Images!`;

  setTimeout(function () {
    alert.classList.remove("d-block");
    alert.classList.add("slide-out-top");
  }, 3000);
}

function populateCarousel() {
  const carouselContainer = document.querySelector(".carousel-inner");
  for (let i = 0; i < 8; i++) {
    const newItem = document.createElement("div");
    newItem.classList.add("carousel-item");
    newItem.innerHTML = `        <img
          src="${imageLibraryForest[0][i].url}"
          class="d-block w-100"
          alt="..."
        />`;
    carouselContainer.appendChild(newItem);
  }
  const firstCarouselItem = document.querySelector(".carousel-item");
  firstCarouselItem.classList.add("active");
}

async function loadCarouselImages() {
  const response = await fetch(
    "http://www.splashbase.co/api/v1/images/search?query=forest"
  ).then(async (response) => {
    let data = await response.json();
    imageLibraryForest.push(data.images);
    console.log("Loaded images");
  });

  populateCarousel();
  successAlert("Carousel");
}

async function loadImage() {
  const response = await fetch(
    `http://www.splashbase.co/api/v1/images/latest`
  ).then(async (response) => {
    let data = await response.json();
    imageLibrary.push(data);
  });

  const allImgIDs = document.querySelectorAll("small");
  for (let i = 0; i < allImgIDs.length; i++) {
    allImgIDs[i].innerText = imageLibrary[0].images[i].id;
  }

  imageSet_One = true;
  successAlert(10);
}

async function loadImagesSecondary() {
  for (let i = 0; imageLibrarySecondary.length < 10; i++) {
    const response = await fetch(
      `http://www.splashbase.co/api/v1/images/random`
    ).then(async (response) => {
      let data = await response.json();
      imageLibrarySecondary.push(data);
    });
  }
  const allImgIDs = document.querySelectorAll("small");
  for (let i = 0; i < allImgIDs.length; i++) {
    allImgIDs[i].innerText = imageLibrarySecondary[i].id;
  }
  imageSet_One = false;
  successAlert(10);
}

function openModal() {
  const target = event.currentTarget;

  for (let i = 0; i < allViewButtons.length; i++) {
    if (imageSet_One === true) {
      if (target === allViewButtons[i]) {
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `<img class="w-100" src="${imageLibrary[0].images[i].url}" />`;
      }
    } else {
      if (target === allViewButtons[i]) {
        const modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = `<img class="w-100" src="${imageLibrarySecondary[i].url}" />`;
        console.log("second set");
      }
    }
  }
}

function hideCard() {
  const targetCard =
    event.currentTarget.parentNode.parentNode.parentNode.parentNode;
  targetCard.style.display = "none";
}

function assignButtonIds() {
  const allButtons = document.querySelectorAll(".btn-outline-secondary");

  for (let i = 0; i < allButtons.length; i++) {
    if (i % 2 === 0) {
      allButtons[i].addEventListener("click", openModal);
      allButtons[i].setAttribute("data-toggle", "modal");
      allButtons[i].setAttribute("data-target", "#exampleModal");
      allViewButtons.push(allButtons[i]);
    } else {
      allButtons[i].addEventListener("click", hideCard);
      allEditButtons.push(allButtons[i]);
    }
  }
}

function replaceEditButtons() {
  allEditButtons.forEach((e) => {
    e.innerText = "Hide";
  });
}

function start() {
  assignButtonIds();
  replaceEditButtons();
  loadCarouselImages();
}

window.onload = start();
