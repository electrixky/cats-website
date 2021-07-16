"use strict";

loadCatsData()
displaySortedByPrice()
displaySortedByAge()
subscribtion()


const CATS_PER_PAGE = 6

async function loadCatsData() {
  const response = await fetch("/data.json")
  const cats = await response.json()
  addInfoToArrays(cats)
}

function createCat(cats, array) {
  for (let key in cats) {
    array.push(cats[key]);
  }
}

const allCats = [];
const allCatsDefault = [];

function addInfoToArrays(cats) {

  createCat(cats, allCats);
  createCat(cats, allCatsDefault);

  displayCatsInfo(allCats);
  displayCatsAmount(allCats);
}

function sortCatsByPrice(allCats) {
  allCats.sort((a, b) =>
    a["price"] > b["price"] ? 1 : b["price"] > a["price"] ? -1 : 0
  );
  displayCatsInfo(allCats);
}

function displaySortedByPrice() {
  let sortByPriceClicked = 0;
  document
    .querySelector(".main__sort-price")
    .addEventListener("click", function () {
      if (sortByPriceClicked % 2 === 0) {
        sortCatsByPrice(allCats);
        document.querySelector(".main__sort-price").innerHTML = `Цене
		<i class="fas fa-chevron-up"></i>`;
      } else {
        displayCatsInfo(allCatsDefault);
        document.querySelector(".main__sort-price").innerHTML = `Цене
		<i class="fas fa-chevron-down"></i>`;
      }
      sortByPriceClicked++;
    });
}

function sortCatsByAge(allCats) {
  allCats.sort((a, b) =>
    a["age"] > b["age"] ? 1 : b["age"] > a["age"] ? -1 : 0
  );
  displayCatsInfo(allCats);
}

function displaySortedByAge() {
  let sortByAgeClicked = 0;
  document
    .querySelector(".main__sort-age")
    .addEventListener("click", function () {
      if (sortByAgeClicked % 2 === 0) {
        sortCatsByAge(allCats);
        document.querySelector(".main__sort-age").innerHTML = `Возрасту
		<i class="fas fa-chevron-up"></i>`;
      } else {
        displayCatsInfo(allCatsDefault);
        document.querySelector(".main__sort-age").innerHTML = `Возрасту
		<i class="fas fa-chevron-down"></i>`;
      }
      sortByAgeClicked++;
    });
}

function displayCatsAmount(allCats) {
  document.querySelector(
    ".header__main-title"
  ).textContent = `Найдено ${allCats.length} котов`;
}

let displayableCount = 0

function displayCatsInfo(allCats) {
  let out = "";

  for (let cat of allCats) {
		 out += `
			<div class="item">
						<div class="item__inner">
							<div class="item__photo">
								<img src="${cat["image"]}">
								<div class="${
						 cat["isLiked"] === true ? "item__heart liked" : "item__heart"
					  }" onclick="this.classList.toggle('liked')"></div>
								<div class="${cat["onSale"] === true ? "item__sale" : ""}">
									<span>${cat["onSale"] === true ? "-40%" : ""}</span>
								</div>
							</div>
							<div class="item__content" data-id="${cat}">
								<h3 class="item__title">${cat["name"]}</h3>
								<div class="item__decription">
									<p class="color">${cat["color"]}<br>окрас</p>
									<p class="age"><strong>${cat["age"]} мес.</strong><br>Возраст</p>
									<p class="paw"><strong>${cat["paw"]}</strong><br>Кол-во лап</p>
								</div>
								<p class="item__price">${cat["price"]} руб.</p>
							</div>
							<a class="${cat["isSold"] === false ? "item__button" : "item__button sold"}" onclick="showToast()">${
			cat["isSold"] === false ? "Купить" : "Продано"
		 }</a>
						</div>
					</div>
			`;
  }

  document.querySelector(".main__catalogue").innerHTML = out;
}

function showToast() {
	let toast = document.querySelector('#cart')
	toast.className='show'
	setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkedEmail = re.test(String(email).toLowerCase());
  if (checkedEmail) {
    subscribeModal();
  } else {
    console.log("Email is not correct");
  }
}

function subscribtion() {
  document
    .querySelector(".promo__form-button")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let email = document.querySelector(".promo__form-email").value;
      validateEmail(email);
      document.querySelector(".promo__form-email").value = "";
    });
}

function subscribeModal() {
  let modal = document.querySelector("#myModal");
  let btn = document.querySelector(".promo__form-button");
  let span = document.querySelector(".close");
  btn.onclick = function () {
    modal.style.display = "block";
  };
  span.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
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
