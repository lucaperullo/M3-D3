const search = "cars";

const url = "http://www.splashbase.co/api/v1/images/search?query=" + search;

const fetchImages = () => {
  fetch(url)
    .then((res) => res.json())
    .then(loadImages)
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
}
