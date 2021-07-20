"use strict";

let catsAmountTitle = document.querySelector(".header__main-title");
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

const CATS_PER_PAGE = 6;
let cats = [];
let displayableCount = CATS_PER_PAGE;
let sortedByPriceAscending = false;
let sortedByAge = false;


async function loadCatsData() {
  const response = await fetch("/data.json");
  const res = await response.json();
  cats = res;
  showCats(cats);
}

function showCats(cats) {
  showCatsInfo(cats);
  showCatsAmount(cats);
}

function showCatsInfo(cats) {
  let out = "";

  for (let i = 0; i < displayableCount; i++) {
    out += `
			<div class="item">
						<div class="item__inner">
							<div class="item__photo">
								<img src="${cats[i]["image"]}">
								<div class="${
                  cats[i]["isLiked"] === true
                    ? "item__heart liked"
                    : "item__heart"
                }" onclick="this.classList.toggle('liked'); showToast()"></div>
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
  }

  document.querySelector(".main__catalogue").innerHTML = out;
}

function showCatsAmount(cats) {
  catsAmountTitle.textContent = `Найдено ${cats.length} котов`;
}

function sortCats(cats, criteria, order) {
  if (order === "ascending") {
    cats.sort((a, b) =>
      a[criteria] > b[criteria] ? 1 : b[criteria] > a[criteria] ? -1 : 0
    );
  } else {
    cats.sort((b, a) =>
      a[criteria] > b[criteria] ? 1 : b[criteria] > a[criteria] ? -1 : 0
    );
  }
  showCatsInfo(cats);
}

sortByPriceAscending.addEventListener("click", function () {
  let catsCopy = JSON.parse(JSON.stringify(cats));
  sortByPrice.classList.add("blue-text")
  resetBtn.style.visibility = "visible"

    sortCats(catsCopy, "price", "ascending");
    //sortedByPriceAscending = true;
		 arrowPrice.classList.add("transform");
});

sortByPriceDescending.addEventListener("click", function () {
	let catsCopy = JSON.parse(JSON.stringify(cats));
	sortByPrice.classList.add("blue-text")
  resetBtn.style.visibility = "visible"
 
	arrowPrice.classList.remove("transform");
	  sortCats(catsCopy, "price", "descending");
	  //sortedByPriceAscending = false;
 });

sortByAgeAscending.addEventListener("click", function () {
	let catsCopy = JSON.parse(JSON.stringify(cats));
	sortByAge.classList.add("blue-text")
  resetBtn.style.visibility = "visible"

	  sortCats(catsCopy, "age", "ascending");
	  arrowAge.classList.add("transform");
	  //sortedByAge = true;
 });

 sortByAgeDescending.addEventListener("click", function () {
	let catsCopy = JSON.parse(JSON.stringify(cats));
	sortByAge.classList.add("blue-text")
  resetBtn.style.visibility = "visible"
 
	  sortCats(catsCopy, "age", "descending");
	  arrowAge.classList.remove("transform");
	  //sortedByAge = true;
 });

 resetBtn.addEventListener("click", function() {
	showCatsInfo(cats);
	resetBtn.style.visibility = "hidden"
	sortByAge.classList.remove("blue-text")
	sortByPrice.classList.remove("blue-text")
	arrowAge.classList.remove("transform");
	arrowPrice.classList.remove("transform");
 })

function showToast() {
  toast.classList = "show";

  let timerId = setInterval(function () {
    toast.classList.toggle("show");
  }, 3000);

  setTimeout(() => {
    clearInterval(timerId);
  }, 3000);
}

function isValid(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkedEmail = regex.test(String(email).toLowerCase());
  return checkedEmail;
}

subscribeBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (isValid(userEmailForm.value)) {
    showSubscribeModal();
    userEmailForm.value = "";
    invalidEmail.style.display = "none";
    userEmailForm.style.border = "none";
  } else {
    invalidEmail.style.display = "inline";
    userEmailForm.style.border = "3px solid rgb(255, 0, 0)";
  }
});

closeModalBtn.addEventListener("click", function () {
  subscribeModal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == subscribeModal) {
    subscribeModal.style.display = "none";
  }
});

function showSubscribeModal() {
  subscribeModal.style.display = "block";
}

(function () {
  function trackScroll() {
    let scrolled = window.pageYOffset;
    let coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add("back_to_top-show");
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove("back_to_top-show");
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }

  let goTopBtn = document.querySelector(".back_to_top");

  window.addEventListener("scroll", trackScroll);
  goTopBtn.addEventListener("click", backToTop);
})();

loadCatsData();
