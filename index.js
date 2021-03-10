const search = "cars";

const url = "http://www.splashbase.co/api/v1/images/search?query=" + search;

// generating modals
const generateModals = (images) => {
  images.forEach((element) => {
    let bodyy = document.querySelector("body");
    bodyy.innerHTML += `   <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img class="modal-body-img" src="${element.url}" alt="" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>`;
  });
};
//

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
    generateModals(images);
  }
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
    generateModals(images);
  }
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

window.onload = hideCards;
