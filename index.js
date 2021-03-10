const search = "cars";

const url = "http://www.splashbase.co/api/v1/images/search?query=" + search;

// generating modals
const generateModals = ({ images }) => {
  images.forEach((element) => {
    console.log(element);
  });
};
//

const fetchImages = () => {
  fetch(url)
    .then((res) => res.json())
    .then(loadImages)
    .then(generateModals)
    .catch((err) => console.log(err));
};
function loadImages({ images }) {
  let cards = document.querySelectorAll(".card");
  for (let i = 0; i < cards.length; i++) {
    let list = cards[i];

    list.firstElementChild.remove();
    let imgs = document.createElement("img");
    imgs.classList.add("img-fluid");
    imgs.style.height = "250px";
    imgs.src = images[i].url;
    list.innerHTML = imgs.outerHTML + " " + list.innerHTML;
  }
  hideCards();
}
const search2 = "trees";

const url2 = "http://www.splashbase.co/api/v1/images/search?query=" + search2;

const fetchImages2 = () => {
  fetch(url2)
    .then((res) => res.json())
    .then(loadImages2)
    .catch((err) => console.log(err));
};
const cards = document.querySelectorAll(".card");
function loadImages2({ images }) {
  for (let i = 0; i < cards.length; i++) {
    let list = cards[i];
    list.firstElementChild.remove();
    let imgs = document.createElement("img");
    imgs.classList.add("img-fluid");
    imgs.style.height = "250px";
    imgs.src = images[i].url;
    list.innerHTML = imgs.outerHTML + " " + list.innerHTML;
  }
  hideCards();
}

const hideCards = () => {
  let btn = document.querySelectorAll("#hide");
  btn.forEach((element) => {
    element.addEventListener("click", function hidestuff(e) {
      const targetCard =
        e.currentTarget.parentNode.parentNode.parentNode.parentNode;
      targetCard.style.display = "none";
    });
  });
};
