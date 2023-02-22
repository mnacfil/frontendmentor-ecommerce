const productImages = [...document.querySelectorAll('.product-img')];
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');
const addBtn = document.querySelector('.add-btn');
const minusBtn = document.querySelector('.minus-btn');
const cartBtn = document.querySelector('.cart-btn');
const amount = document.querySelector('.amount');
const cartAmount = document.querySelector('.cart-amount');
const cartModalNode = document.querySelector('.cart-modal');
const cartPrice = document.querySelector('.cart-price');
const cartItems = document.querySelector('.items');
const cartTotalPrice = document.querySelector('.total-price');
const productPrice = document.querySelector('.product-price');
let currentIndex = 0;

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
    updateCart();
}

const updateCart = () => {
    const {value, items, price, totalPrice} = getCartFromLocalStorage();
    amount.textContent = value || amount.textContent;
    cartAmount.textContent = value || amount.textContent;
    cartItems.textContent = items || cartAmount.textContent;
    cartPrice.textContent = price || productPrice.textContent;
    cartTotalPrice.textContent = totalPrice || `$${Number(cartPrice.textContent.slice(1)) * Number(cartItems.textContent)}`;
}

const showCartModal = () => {
    cartModalNode.classList.toggle('show-cart-modal');
}

const setCartToLocalStorage = () => {
    const cart = {
        value: amount.textContent,
        items: amount.textContent,
        price: cartPrice.textContent,
        totalPrice: `$${Number(amount.textContent) * Number(cartPrice.textContent.slice(1))}`
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

const getCartFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    console.log(cart);
    if(!cart) return {};
    return cart;
}

nextBtn.addEventListener('click', () => {
    displayImage('next');
});
previousBtn.addEventListener('click', () => {
    displayImage('previous');
});
addBtn.addEventListener('click', addAmount);
minusBtn.addEventListener('click', minusAmount);
cartBtn.addEventListener('click', showCartModal);

// amount.textContent = getAmountFromLocalStorage();
// cartAmount.textContent = getAmountFromLocalStorage();
updateCart()
