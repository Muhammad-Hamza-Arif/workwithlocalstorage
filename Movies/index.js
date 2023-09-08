
function signUp(e) {
  event.preventDefault();
  // console.log("hamza")

  var email = document.getElementById("email").value;
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var userArray = JSON.parse(localStorage.getItem("user")) || [];

  var user = {
    email: email,
    username: username,
    password: password,
  };
  userArray.push(user);
  var json = JSON.stringify(userArray);
  localStorage.setItem("user", json);
  console.log("User Added");
}

function logIn(e) {
  event.preventDefault();
  var useremail = document.getElementById("useremail").value;
  var password = document.getElementById("password").value;
  var result = document.getElementById("result");

  // Retrieve user data from localStorage
  var users = localStorage.getItem("user");

  if (users) {
    
    var userData = JSON.parse(users);

    var foundUser = userData.find((element) => {
      return element.email === useremail && element.password === password;
    });
    console.log(foundUser);

    if (foundUser) {

      alert("User logged in successfully");
      result.innerHTML = "Logged In";
    } else {
      alert("Login unsuccessful");
    }
  } else {
    alert("No user data found. Please register first.");
  }
  // createToken();
}

function createMovie(e) {
  event.preventDefault();

  var moviename = document.getElementById("moviename").value;
  var moviedate = document.getElementById("date").value;
  let movies = JSON.parse(localStorage.getItem("movies")) || [];
  var movie = {
    moviename: moviename,
    moviedate: moviedate,
  };

  // Add the new movie to the array
  movies.push(movie);
  // Save the updated movies array to local storage
  localStorage.setItem("movies", JSON.stringify(movies));
}

function movieDataDisplay() {
  var myMovieArray = JSON.parse(localStorage.getItem("movies"));
  myMovieArray.forEach(function (element) {
    $("#movieListData").append("<p>" + element.moviename + "</p>");
    $("#movieListData").append("<p>" + element.moviedate + "</p>");
  });
}

// restoreArrayData()
