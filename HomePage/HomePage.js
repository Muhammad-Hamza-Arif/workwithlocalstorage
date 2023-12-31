document.addEventListener("DOMContentLoaded", fetchAndDisplayMovies);

function fetchAndDisplayMovies() {
  console.log("click occurred");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/movies", true);
  xhr.setRequestHeader(
    "x-access-token",
    localStorage.getItem("UserAuth"),
    "Content-Type",
    "application/json"
  );
  xhr.onprogress = function () {
    console.log("in progress");
  };
  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(xhr.responseText);
      console.log("response --> ", response);
      const moviesData = response.data.movies;
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const list = document.getElementById("list");
      list.innerHTML = "";

      let row;

      moviesData.forEach((movie, index) => {
        if (index % 4 === 0) {
          row = document.createElement("div");
          row.className = "container";
        }

        const column = document.createElement("div");
        column.className = "";

        const card = document.createElement("div");
        card.className = "";

        const cardBody = document.createElement("div");
        cardBody.className = "";

        const cardTitle = document.createElement("h5");
        cardTitle.className = "name";
        cardTitle.textContent = movie.name;

        const cardText = document.createElement("p");
        cardText.className = "";
        cardText.textContent = `Released on:   ${movie.released_on},Price: ${movie.price}, Seats: ${movie.seats}`;

        





        const buyButton = document.createElement("button");
        buyButton.className = "";
        buyButton.textContent = "BUY";

        buyButton.addEventListener("click", function (event) {
          event.preventDefault();

          const existingCartItem = cart.find(
            (item) => item.cart.id === movie.id
          );

          if (existingCartItem) {
            if (existingCartItem.cart.ticket < 5) {
              existingCartItem.cart.ticket += 1;
            } else {
              alert("You cannot add more than 5 tickets of a movie");
            }
          } else {
            const cartElement = {
              id: movie.id,
              name: movie.name,
              date: movie.released_on,
              price: movie.price,
              ticket: 1,
            };

            const { _id } = JSON.parse(localStorage.getItem("User"));

            const userCart = {
              userId: _id,
              cart: cartElement,
            };

            cart.push(userCart);
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          console.log("element in the cart------>", cart);
        });

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(buyButton);

        card.appendChild(cardBody);

        column.appendChild(card);

        row.appendChild(column);

        if (index % 4 === 3 || index === moviesData.length - 1) {
          list.appendChild(row);
        }
      });
    } else {
      console.log("something looks wrong");
    }
  };
  xhr.send();
}
