const mainImg = document.querySelector('.main-img');
const productImages = [...document.querySelectorAll('.product-img')];
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');
const addBtn = document.querySelector('.add-btn');
const minusBtn = document.querySelector('.minus-btn');
const cartBtn = document.querySelector('.cart-btn');
const deleteBtn = document.querySelector('.delete-btn');
const closeBtn = document.querySelector('.close-btn');
const menuBtn = document.querySelector('.menu-btn');
const amount = document.querySelector('.amount');
const cartAmount = document.querySelector('.cart-amount');
const cartModalNode = document.querySelector('.cart-modal');
const cartPrice = document.querySelector('.cart-price');
const cartItems = document.querySelector('.items');
const cartTotalPrice = document.querySelector('.total-price');
const productPrice = document.querySelector('.product-price');
const emptyCart = document.querySelector('.cart-empty');
const cartContent = document.querySelector('.cart-content');
const sidebarNode = document.querySelector('.sidebar');
const bodyCoverNode = document.querySelector('.body-cover');
let currentIndex = 0;

productImages.forEach(product => {
    let imgSrc = product.src.replace('-thumbnail', '');
    if(mainImg.src === imgSrc) {
        product.parentElement.classList.add('active-img');
    } else {
        product.parentElement.classList.remove('active-img');
    }
})

const checkIndex = (index) => {
    const imagesLength = productImages.length;
    if(index > imagesLength - 1) return 0;
    if(index < 0) return imagesLength - 1;
    return index;
}

const displayImage = (type) => {
    if(type === 'next') {
        currentIndex++;
    }
    if(type === 'previous') {
        currentIndex--;
    }
    currentIndex = checkIndex(currentIndex);
    productImages.forEach((image, index) => {
        const parent = image.parentElement;
        if(!(currentIndex === index)) {
            parent.classList.remove('active');
        } else {
            parent.classList.add('active');
        }
    })
}

const addAmount = () => {
    const currentAmount = Number(amount.textContent);
    amount.textContent = currentAmount + 1;
    setCartToLocalStorage();
    updateCart();
}
const minusAmount = () => {
    const currentAmount = Number(amount.textContent);
    if(currentAmount === 0) return;
    amount.textContent = currentAmount - 1;
    setCartToLocalStorage();
    // display empty state if cart has no item
    if(Number(amount.textContent) === 0) {
        cartAmount.textContent = 0;
        displayEmptyCart();
        removeCartfromLocalStorage();
        return;
    }
    updateCart();
}

const updateCart = () => {
    const {value, items, price, totalPrice} = getCartFromLocalStorage();
    console.log(value);
    amount.textContent = value || 0;
    cartAmount.textContent = value || 0;
    cartItems.textContent = items;
    cartPrice.textContent = price;
    cartTotalPrice.textContent = totalPrice;
    setupCart();
}

const toggleCartModal = () => {
    cartModalNode.classList.toggle('show-cart-modal');
}

const closeCartModal = (e) => {
    if(!e.target.parentElement.classList.contains('cart-btn')) {
        cartModalNode.classList.remove('show-cart-modal');
    }
}

const openSidebar = () => {
    bodyCoverNode.classList.add('show-body-cover');
    sidebarNode.classList.add('show-sidebar');
}
const closeSidebar = () => {
    bodyCoverNode.classList.remove('show-body-cover');
    sidebarNode.classList.remove('show-sidebar');
}

const removeCartProduct = () => {
    removeCartfromLocalStorage();
    setupCart();
    amount.textContent = 0;
    cartAmount.textContent = 0;
}

const setCartToLocalStorage = () => {
    const cart = {
        value: amount.textContent,
        items: amount.textContent,
        price: productPrice.textContent,
        totalPrice: `$${Number(amount.textContent) * Number(productPrice.textContent.slice(1))}`
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

const getCartFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart) return {};
    return cart;
}

const removeCartfromLocalStorage = () => {
    localStorage.removeItem('cart');
}

const isCartEmpty = () => {
    const cart = getCartFromLocalStorage();
    if(Object.keys(cart).length === 0) return true;
    return false;
}

const setupCart = () => {
    if(isCartEmpty()) {
        displayEmptyCart();
    } else {
        displayCartContent();
    }
}

const displayEmptyCart = () => {
    cartContent.classList.remove('show-cart-modal-content');
    emptyCart.classList.add('show-cart-empty');
}

const displayCartContent = () => {
    emptyCart.classList.remove('show-cart-empty');
    cartContent.classList.add('show-cart-modal-content');
}

nextBtn.addEventListener('click', () => {
    displayImage('next');
});
previousBtn.addEventListener('click', () => {
    displayImage('previous');
});

addBtn.addEventListener('click', addAmount);
minusBtn.addEventListener('click', minusAmount);
cartBtn.addEventListener('click', toggleCartModal);
deleteBtn.addEventListener('click', removeCartProduct);
menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
window.addEventListener('click', closeCartModal);
updateCart();
setupCart()