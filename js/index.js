"use strict";

let catsAmountTitle = document.querySelector(".header__main-title");
let mainCatalogue = document.querySelector(".main__catalogue");
let subscribeModal = document.querySelector("#subscribeModal");
let subscribeBtn = document.querySelector(".promo__form-button");
let closeModalBtn = document.querySelector(".close");
let userEmailForm = document.querySelector(".promo__form-email");
let invalidEmail = document.querySelector("#invalidEmail");
let toast = document.querySelector("#cart");
let arrowPrice = document.querySelector(".arrow--price");
let arrowAge = document.querySelector(".arrow--age");
let sortByPrice = document.querySelector(".main__sort-price");
let sortByPriceAscending = document.querySelector("#sortByPriceAscending");
let sortByPriceDescending = document.querySelector("#sortByPriceDescending");
let sortByAgeAscending = document.querySelector("#sortByAgeAscending");
let sortByAgeDescending = document.querySelector("#sortByAgeDescending");
let sortByAge = document.querySelector(".main__sort-age");
let resetBtn = document.querySelector("#reset");
let loadmoreBtn = document.querySelector(".main__loadmore-button");

const CATS_PER_PAGE = 6;
let cats = [];
let catsOutput = "";
let startShowCats = 0;
let catsDisplayed = 0;
let sortedByPriceAscending = false;
let sortedByAge = false;
let displayableLimit = 6;
let timerId = -1;

sortByPriceAscending.addEventListener("click", sortPriceUp);
sortByPriceDescending.addEventListener("click", sortPriceDown);
sortByAgeAscending.addEventListener("click", sortAgeUp);
sortByAgeDescending.addEventListener("click", sortAgeDown);
loadmoreBtn.addEventListener("click", loadMoreCats);
resetBtn.addEventListener("click", resetCats);
subscribeBtn.addEventListener("click", subscribtion);
closeModalBtn.addEventListener("click", closeSubscribeModal);
window.addEventListener("click", closeModalBackground);

async function loadCatsData() {
  const response = await fetch("/data.json");
  const res = await response.json();
  cats = res;
  showCats(cats);
}

function showCats(cats) {
  showEachCat(cats);
  showCatsAmount(cats);
  showCatsLeft(cats);
}

function markCat(id) {
	const foundCat = cats.find(data => data.id === id);
	const markedCatIndex = cats.findIndex(data => data === foundCat);
	cats.splice(markedCatIndex, 1, {...foundCat, isLiked: !foundCat.isLiked})
}

function showEachCat(cats, startShowCats = 0) {
  for (let i = startShowCats; i < displayableLimit; i++) {
    catsOutput += `
			<div class="item">
						<div class="item__inner">
							<div class="item__photo">
								<img src="${cats[i]["image"]}">
								<div class="${
                  cats[i]["isLiked"] === true
                    ? "item__heart liked"
                    : "item__heart"
                }" onclick="this.classList.toggle('liked'); markCat(${cats[i]["id"]}); showToast()"></div>
								<div class="${cats[i]["onSale"] === true ? "item__sale" : ""}">
									<span>${cats[i]["onSale"] === true ? "-40%" : ""}</span>
								</div>
							</div>
							<div class="item__content">
								<h3 class="item__title">${cats[i]["name"]}</h3>
								<div class="item__decription">
									<p class="color">${cats[i]["color"]}<br>окрас</p>
									<p class="age"><strong>${cats[i]["age"]} мес.</strong><br>Возраст</p>
									<p class="paw"><strong>${cats[i]["paw"]}</strong><br>Кол-во лап</p>
								</div>
								<p class="item__price">${cats[i]["price"]} руб.</p>
							</div>
							<a class="${
                cats[i]["isSold"] === false
                  ? "item__button"
                  : "item__button sold"
              }">${cats[i]["isSold"] === false ? "Купить" : "Продано"}</a>
						</div>
					</div>
			`;

    catsDisplayed += CATS_PER_PAGE;
  }
  mainCatalogue.innerHTML = catsOutput;
}

function showCatsAmount(cats) {
  catsAmountTitle.textContent = `Найдено ${cats.length} котов`;
}

function showCatsLeft(cats) {
  if (cats.length - startShowCats < CATS_PER_PAGE) {
    loadmoreBtn.textContent = `Показать еще ${cats.length - startShowCats}`;
  } else {
    loadmoreBtn.textContent = `Показать еще ${cats.length - CATS_PER_PAGE}`;
  }
}

function loadMoreCats() {
  startShowCats += CATS_PER_PAGE;

  if (displayableLimit > cats.length - startShowCats) {
    displayableLimit = cats.length;
  } else {
    displayableLimit += 6;
  }
  showEachCat(cats, startShowCats);
  loadmoreBtn.textContent = `Показать еще ${
    cats.length - CATS_PER_PAGE - startShowCats
  }`;

  if (startShowCats >= cats.length - CATS_PER_PAGE) {
    loadmoreBtn.style.display = "none";
  }
}

function sortCats(cats, criteria, order) {
  catsOutput = "";
  mainCatalogue.innerHTML = "";
  displayableLimit = cats.length;
  loadmoreBtn.style.display = "none";

  if (order === "ascending") {
    cats.sort((a, b) =>
      a[criteria] > b[criteria] ? 1 : b[criteria] > a[criteria] ? -1 : 0
    );
  } else {
    cats.sort((b, a) =>
      a[criteria] > b[criteria] ? 1 : b[criteria] > a[criteria] ? -1 : 0
    );
  }
  showEachCat(cats, 0);
}

function sortPriceUp() {
  let catsCopy = JSON.parse(JSON.stringify(cats));
  sortByPrice.classList.add("blue-text");
  sortByAge.classList.remove("blue-text");
  resetBtn.style.visibility = "visible";

  sortCats(catsCopy, "price", "ascending");
  arrowPrice.classList.add("transform");
}

function sortPriceDown() {
  let catsCopy = JSON.parse(JSON.stringify(cats));
  sortByPrice.classList.add("blue-text");
  resetBtn.style.visibility = "visible";

  arrowPrice.classList.remove("transform");
  sortByAge.classList.remove("blue-text");
  sortCats(catsCopy, "price", "descending");
}

function sortAgeUp() {
  let catsCopy = JSON.parse(JSON.stringify(cats));
  sortByAge.classList.add("blue-text");
  sortByPrice.classList.remove("blue-text");
  resetBtn.style.visibility = "visible";

  sortCats(catsCopy, "age", "ascending");
  arrowAge.classList.add("transform");
}

function sortAgeDown() {
  let catsCopy = JSON.parse(JSON.stringify(cats));
  sortByAge.classList.add("blue-text");
  sortByPrice.classList.remove("blue-text");
  resetBtn.style.visibility = "visible";

  sortCats(catsCopy, "age", "descending");
  arrowAge.classList.remove("transform");
}

function resetCats() {
  catsOutput = "";
  mainCatalogue.innerHTML = "";
  showCatsLeft(cats);
  showEachCat(cats);
  resetBtn.style.visibility = "hidden";
  sortByAge.classList.remove("blue-text");
  sortByPrice.classList.remove("blue-text");
  arrowAge.classList.remove("transform");
  arrowPrice.classList.remove("transform");
}

function showToast() {
  if (timerId > -1) {
    clearTimeout(timerId);
    refreshTimer();
    timerId = -1;
  } else {
    refreshTimer();
  }
}

function refreshTimer() {
  toast.classList = "show";
  timerId = setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

function isValidEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkedEmail = regex.test(String(email).toLowerCase());
  return checkedEmail;
}

function subscribtion(event) {
  event.preventDefault();

  if (isValidEmail(userEmailForm.value)) {
    showSubscribeModal();
    userEmailForm.value = "";
    invalidEmail.style.display = "none";
    userEmailForm.style.border = "none";
  } else {
    invalidEmail.style.display = "inline";
    userEmailForm.style.border = "3px solid rgb(255, 0, 0)";
  }
}

function showSubscribeModal() {
  subscribeModal.style.display = "block";
}

function closeSubscribeModal() {
  subscribeModal.style.display = "none";
}

function closeModalBackground(event) {
  if (event.target == subscribeModal) {
    subscribeModal.style.display = "none";
  }
}

(function () {
  function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add("back-to-top-show");
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove("back-to-top-show");
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }

  let goTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", trackScroll);
  goTopBtn.addEventListener("click", backToTop);
})();

loadCatsData();
