document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const basketItemsContainer = document.querySelector('.basket-items');
    const totalPriceElement = document.getElementById('total-price');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productId = productElement.dataset.id;
            const productName = productElement.dataset.name;
            const productPrice = parseFloat(productElement.dataset.price);
            const productImage = productElement.dataset.image;
            const productQuantity = productElement.querySelector('select').value;

            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity += parseInt(productQuantity);
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: parseInt(productQuantity)
                });
            }

            renderBasket();
        });
    });

    function renderBasket() {
        basketItemsContainer.innerHTML = '';

        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;

            const basketItem = document.createElement('div');
            basketItem.classList.add('basket-item');
            basketItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} x ${item.quantity}</p>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            basketItemsContainer.appendChild(basketItem);
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const productIndex = cart.findIndex(item => item.id === productId);
                cart.splice(productIndex, 1);
                renderBasket();
            });
        });
    }

    document.querySelector('.clear-basket').addEventListener('click', () => {
        cart.length = 0;
        renderBasket();
    });

    document.querySelector('.checkout-form').addEventListener('submit', (event) => {
        if (cart.length === 0) {
            event.preventDefault();
            alert('Please add items to your basket before checking out.');
            return;
        }
        // Allow the form to be submitted to checkout.html
    });

    document.querySelectorAll('.product').forEach(product => {
        const img = product.querySelector('img');

        product.addEventListener('mousemove', e => {
            const rect = product.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            img.style.transformOrigin = `${x}px ${y}px`;
        });

        product.addEventListener('mouseleave', () => {
            img.style.transformOrigin = 'center center';
        });
    });
});
