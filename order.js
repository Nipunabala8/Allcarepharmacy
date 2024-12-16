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
    // Retrieve order details
    const orderDetails = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || '0.00';

    const orderSummary = document.getElementById('orderSummary');
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = totalPrice;

    // Populate the order table
    orderDetails.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.quantity * item.price).toFixed(2)}</td>
        `;
        orderSummary.appendChild(row);
    });

    // Form submission handler
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', event => {
        event.preventDefault();

        // Validate form
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const postalCode = document.getElementById('postalCode').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const securityCode = document.getElementById('securityCode').value.trim();
        const expirationDate = document.getElementById('expirationDate').value.trim();

        if (
            firstName &&
            lastName &&
            email &&
            phone &&
            address &&
            postalCode &&
            cardNumber &&
            securityCode &&
            expirationDate
        ) {
            // Calculate delivery date (7 days from order date)
            const today = new Date();
            const deliveryDate = new Date(today);
            deliveryDate.setDate(today.getDate() + 7);

            const formattedDate = deliveryDate.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            alert(`Thank you for your purchase, ${firstName} ${lastName}! Your order will be delivered by ${formattedDate}.`);

            // Clear localStorage and redirect
            localStorage.removeItem('cart');
            localStorage.removeItem('totalPrice');
            window.location.href = 'index.html';
        } else {
            alert('Please fill in all the fields.');
        }
    });
});