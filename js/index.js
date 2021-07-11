"use strict"

loadCatsData()


async function loadCatsData() {
	const response = await fetch('/data.json')
	const cats = await response.json()
	printCatsInfo(cats)
}

function printCatsAmount(cats) {
	document.querySelector('.header__main-title').textContent=`Найдено ${Object.keys(cats).length} котов`
}

function printCatsInfo(cats) {

	printCatsAmount(cats)

	let out = ''

	for (let key in cats) {
		out+=`
		<div class="item">
					<div class="item__inner">
						<div class="item__inner-photo">
							<img src="${cats[key]['image']}">
							<div class="item__inner-heart"></div>
							<div class="item__inner-sale" data-sale="${cats[key]['onDiscount']}">
								<span>-40%</span>
							</div>
						</div>
						<div class="item__inner-content" data-id="${key}">
							<h3 class="item__inner-title">${cats[key]['name']}</h3>
							<div class="item__inner-decription">
								<p class="color">${cats[key]['color']}<br>окрас</p>
								<p class="age"><strong>${cats[key]['age']}</strong><br>Возраст</p>
								<p class="paw"><strong>${cats[key]['paw']}</strong><br>Кол-во лап</p>
							</div>
							<p class="item__inner-price">${cats[key]['price']} руб.</p>
						</div>
						<a class="item__inner-button">Купить</a>
					</div>
				</div>
		`
		
	}
	
	document.querySelector('.main__catalogue').innerHTML = out
	//addDiscount()
	
	//addEventToButtons(cats)

// 	const main = document.querySelector('main')

// main.onclick = (event) => {
// 	if(event.target.className === 'item__inner-button')
// 	document.querySelector('.header__cart').style.visibility='visible'
// }
}

// function addDiscount() {
// 	let onSale = document.querySelectorAll("[data-sale]")
// 	console.log(onSale)
// }



// function addEventToButtons(cats) {
// 	for (let i = 0; i < cats.length; i++) {
// 		document.querySelectorAll('.item__inner-button').addEventListener('click', addToCart())
// 	}
// }

// function addToCart() {
// 	document.querySelector('#addToCart').style.visibility = "visible"
// 	setTimeout(hideCartText, 2000);
// }

// function hideCartText() {
// 	document.querySelector('#addToCart').style.visibility = "hidden"
// }

// let loadMoreClicked = 0
// document.querySelector('.main__loadmore-button').addEventListener('click', function(){
// 	loadMoreClicked++
// })


(function() {
 
	function trackScroll() {
	  let scrolled = window.pageYOffset;
	  let coords = document.documentElement.clientHeight;
 
	  if (scrolled > coords) {
		 goTopBtn.classList.add('back_to_top-show');
	  }
	  if (scrolled < coords) {
		 goTopBtn.classList.remove('back_to_top-show');
	  }
	}
 
	function backToTop() {
	  if (window.pageYOffset > 0) {
		 window.scrollBy(0, -80);
		 setTimeout(backToTop, 0);
	  }
	}
 
	let goTopBtn = document.querySelector('.back_to_top');
 
	window.addEventListener('scroll', trackScroll);
	goTopBtn.addEventListener('click', backToTop);
 })();

