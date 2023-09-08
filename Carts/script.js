document.addEventListener("DOMContentLoaded", function(){

    const cartData = JSON.parse(localStorage.getItem('cart'));
    
    const userId = JSON.parse(localStorage.getItem('User'))._id;
    
    const container = document.querySelector('.cart-container');
    
    const userCartData = cartData.filter(item => item.userId === userId);
    
    if (userCartData.length > 0) {
        const cartDiv = document.createElement('div');
    
        const header = document.createElement('h1');
        header.textContent = `MY CART (${userCartData.length})`;
        cartDiv.appendChild(header);
    
        const itemList = document.createElement('ul');
    
        userCartData.forEach(item => {
            const listItem = document.createElement('li');
    
            const itemDetails = document.createElement('div');
    
            const itemName = document.createElement('p');
            itemName.textContent = item.cart.name;
    
            const itemQuantity = document.createElement('p');
            itemQuantity.textContent = `Tickets: ${item.cart.ticket}`;
    
            itemDetails.appendChild(itemName);
            itemDetails.appendChild(itemQuantity);
    
            const removeButtonContainer = document.createElement('div');

            const removeButton = document.createElement('button');
            removeButton.textContent = 'x';

            removeButtonContainer.appendChild(removeButton);

            removeButton.addEventListener("click", function(event) {
                event.preventDefault();
                
                const itemIndex = userCartData.findIndex(userCartItem => userCartItem.cart.id === item.cart.id);
                if (itemIndex !== -1) {
                    userCartData.splice(itemIndex, 1);
                }
                
                localStorage.setItem('cart', JSON.stringify(userCartData));
            
                listItem.remove();
                
                header.textContent = `MY CART (${userCartData.length})`;
            });
    
            listItem.appendChild(itemDetails);
            listItem.appendChild(removeButtonContainer);
    
            itemList.appendChild(listItem);
        });
    
        cartDiv.appendChild(itemList);
    
        container.appendChild(cartDiv);
    } else {
        
        const emptyCartMessage = document.createElement('div');
    
        const emptyCartImage = document.createElement('div');

        emptyCartImage.innerHTML = `<img src="../assets/undraw_empty_cart_co35.svg" alt="empty cart" class="max-w-full h-auto max-h-48 mx-auto drop-shadow-lg" />`;
    
        const emptyCartText = document.createElement('p');
        emptyCartText.textContent = 'Your Cart is Empty';
    
        emptyCartMessage.appendChild(emptyCartImage);
        emptyCartMessage.appendChild(emptyCartText);
    
        container.appendChild(emptyCartMessage);
    }
});