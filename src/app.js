const productImages = [...document.querySelectorAll('.product-img')];
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');
const addBtn = document.querySelector('.add-btn');
const minusBtn = document.querySelector('.minus-btn');
const amount = document.querySelector('.amount');
const cartAmount = document.querySelector('.cart-amount');
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
    updateCartAmount();
    setAmountToLocalStorage();
}
const minusAmount = () => {
    const currentAmount = Number(amount.textContent);
    if(currentAmount === 0) return;
    amount.textContent = currentAmount - 1;
    updateCartAmount();
    setAmountToLocalStorage();
}

const updateCartAmount = () => {
    cartAmount.textContent = amount.textContent;
}

const setAmountToLocalStorage = () => {
    localStorage.setItem('amount', amount.textContent);
}

const getAmountFromLocalStorage = () => {
    const saveAmount = localStorage.getItem('amount');
    if(!saveAmount) return 0;
    return saveAmount;
}

nextBtn.addEventListener('click', () => {
    displayImage('next');
});
previousBtn.addEventListener('click', () => {
    displayImage('previous');
});
addBtn.addEventListener('click', addAmount);
minusBtn.addEventListener('click', minusAmount);

amount.textContent = getAmountFromLocalStorage();
cartAmount.textContent = getAmountFromLocalStorage();