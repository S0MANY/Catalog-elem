let prodAmount = document.querySelector(".amount")
let incrAmount = document.querySelector(".increse")
let decrAmount = document.querySelector(".decrese")
let addBtn = document.querySelector('.add-btn')
let cartlUl = document.querySelector(".cart__items")
let cart = document.querySelector('.cart-open')
let cartIcon = document.querySelector('.cart-logo')
let sideBarIcon = document.querySelector('.nav-ivon__for-mob')

// Amount of product

function renderAmount(num) {
    prodAmount.querySelector("strong").textContent = num
}

function changeAmount(event) {
    let currentAmount = +prodAmount.textContent
    if (event.target.textContent === "+") {
        let newAmount = ++currentAmount
        renderAmount(newAmount)
    } else if (event.target.textContent === "-" && +prodAmount.textContent > 0) {
        let newAmount = --currentAmount
        renderAmount(newAmount)
    }
}

incrAmount.addEventListener("click" , changeAmount)
decrAmount.addEventListener("click" , changeAmount)

// Add to cart

addBtn.addEventListener("click" , addToCart)

function addToCart() {
    if (+prodAmount.textContent === 0) {
        return
    }
    let prodName = document.querySelector(".title").textContent
    let endPrice = +document.querySelector('.end-price').textContent.slice(1)
    let amount = +prodAmount.textContent
    let isEmpty = checkForItemsInCart()

    let li = document.createElement('li')
    li.classList.add("cart__elem")

    li.innerHTML = `
        <div class="cart__img"> <img src="./images/image-product-1-thumbnail.jpg" alt="li-elem"></div>
        <div class="cart__elem__info">
          <div class="cart__elem__info-name">${prodName}</div>
          <div class="cart__elem__info-total-price">$${endPrice} х ${amount} | <strong>$${endPrice * amount}</strong></div>
        </div>
        <div class="cart__elem__rem-icon"><img src="./images/icon-delete.svg" alt="delet-elem"></div>
    `

    cartlUl.insertAdjacentElement("beforeend" , li)

    updateCart()

    if (isEmpty) {
        let checkoutBtn = document.createElement('div')
        checkoutBtn.classList.add("checkout")
        checkoutBtn.innerHTML = `<strong>Checkout</strong>`
        cartlUl.insertAdjacentElement('afterend' , checkoutBtn)
    }

    prodAmount.querySelector("strong").textContent = 0
}

function checkForItemsInCart() {
    if (cartlUl.querySelector('li')){
        return false
    } else {
        cart.classList.toggle("cart-empty")
        return true
    }
}

function deleteItemFromCart() {
    console.log("click")
    let item = this.parentElement
    item.remove()
    let isEmpty = checkForItemsInCart()
    if (isEmpty) {
        document.querySelector(".checkout").remove()
    }
    this.removeEventListener("click" , deleteItemFromCart)
    updateLogo(document.querySelectorAll(".cart__elem__rem-icon").length)
}

function updateCart() {
    let remBtns = document.querySelectorAll(".cart__elem__rem-icon")

    if (remBtns) updateLogo(remBtns.length)

    remBtns.forEach( (elem) => elem.addEventListener("click" , deleteItemFromCart) )
}

function updateLogo(num) {
    if (num > 0) {
        document.querySelector(".items-num").classList.add('open')
        document.querySelector(".items-num").querySelector('strong').textContent = num
    } else {
        document.querySelector(".items-num").classList.remove('open')
    }
    
}

// show | hide cart

cartIcon.addEventListener("click" , toggleCart)

function toggleCart(){
    cart.classList.toggle("open")
}

// mobile side bar


sideBarIcon.addEventListener("click" , toggleSideBar)

function toggleSideBar() {
    document.querySelector(".side-bar").classList.add("open")
    document.querySelector(".side-bar__list__close").addEventListener("click", closeSideBar)
}

function closeSideBar(){
    document.querySelector(".side-bar").classList.remove("open")
}

// Swiper

const swiperDesktop = new Swiper('.swiper', {
    // Optional parameters
    direction: "horizontal",
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable:true, 
      renderBullet: function(index , className) {
        return `<span class="${className}"><img src="./images/image-product-${index + 1}-thumbnail.jpg" alt=""></span>`
      }
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });







