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
		if (key==='7') break;
		out+=`
		<div class="item">
					<div class="item__inner">
						<div class="item__inner-photo">
							<img src="${cats[key]['image']}">
							<div class="item__inner-heart"></div>
							<div class="item__inner-sale">
								<span>-40%</span>
							</div>
						</div>
						<div class="item__inner-content">
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

	// let catName = []
	// let catColor = []
	// let catAge = []
	// let catPaw = []
	// let catPrice = []

	// for (let key in cats) {
	// 	catName.push(cats[key]["name"])
	// 	catColor.push(cats[key]["color"])
	// 	catAge.push(cats[key]["age"])
	// 	catPaw.push(cats[key]["paw"])
	// 	catPrice.push(cats[key]["price"])
	// }
	
	// let catsNames = document.querySelectorAll(".item__inner-title")
	// let catsColors = document.querySelectorAll(".color")
	// let catsAges = document.querySelectorAll(".age strong")
	// let catsPaws = document.querySelectorAll(".paw strong")
	// let catsPrices = document.querySelectorAll(".item__inner-price")

	// for (let i = 0; i < catsNames.length; i++) {
	// 	catsNames[i].innerHTML=catName[i]
	// 	catsColors[i].innerHTML=`${catColor[i]}<br>окрас`
	// 	catsAges[i].innerHTML=`${catAge[i]} мес.`
	// 	catsPaws[i].innerHTML=catPaw[i]
	// 	catsPrices[i].innerHTML=`${catPrice[i]} руб.`
	// }
}