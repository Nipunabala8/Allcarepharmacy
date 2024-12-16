
/*Navigation*/

function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
   const sidebar = document.querySelector('.sidebar')
   sidebar.style.display = 'none'

  }


document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const totalPriceElement = document.getElementById('totalPrice');
    const orderTable = document.querySelector('#orderTable');

    // Add to Cart Button Logic
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const itemName = button.dataset.name;
            const itemPrice = parseFloat(button.dataset.price);
            const quantityInput = button.previousElementSibling;
            const quantity = parseInt(quantityInput.value, 10);

            if (quantity > 0) {
                const existingItem = cart.find(item => item.name === itemName);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.push({ name: itemName, price: itemPrice, quantity });
                }

                quantityInput.value = 0;
                updateTable();
            } else {
                alert('Please enter a valid quantity.');
            }
        });
    });

    // Update Table Function
    function updateTable() {
        orderTable.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}<span class="remove-item" data-index="${index}">❌</span></td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            orderTable.appendChild(row);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);

        // Remove Item Logic
        document.querySelectorAll('.remove-item').forEach(cross => {
            cross.addEventListener('click', () => {
                const index = parseInt(cross.dataset.index, 10);
                cart.splice(index, 1);
                updateTable();
            });
        });
    }

    // Add to Favourites Button
    document.getElementById('addToFavourites').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add items before saving as favourites.');
        } else {
            localStorage.setItem('favouriteItems', JSON.stringify(cart));
            alert('Your favourites have been saved!');
        }
    });

    // Apply Favourites Button
    document.getElementById('applyFavourites').addEventListener('click', () => {
        const favouriteItems = JSON.parse(localStorage.getItem('favouriteItems'));

        if (!favouriteItems || favouriteItems.length === 0) {
            alert('No favourites found. Please save a favourite order first.');
        } else {
            cart.length = 0; // Clear the current cart
            cart.push(...favouriteItems); // Add favourite items to the cart
            updateTable();
            alert('Favourites have been applied to your cart!');
        }
    });

    // Buy Now Button
    document.getElementById('buyNow').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items to your cart before proceeding.');
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('totalPrice', totalPriceElement.textContent);
            window.location.href = 'order.html';
        }
    });
});