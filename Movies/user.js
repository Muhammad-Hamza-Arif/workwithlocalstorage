document.addEventListener("DOMContentLoaded", function () {

    function fetchUserData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/users/getallusers", true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                var userData = JSON.parse(xhr.responseText);
                // var userdata = userData.data.user
                console.log("usrData--->",userData.data.users)
                displayUserData(userData.data.users);
            } else {
                console.error("Error fetching user data.");
            }
        };

        xhr.send();
    }

    function displayUserData(userData) {
        var tableBody = document.getElementById("userTableBody");

        
        tableBody.innerHTML = "";

    
        userData.forEach(function (user) {
            var row = document.createElement("tr");

            var name = document.createElement("td");
            name.textContent = user.name;
            row.appendChild(name)
            var email = document.createElement("td");
            email.textContent = user.email;
            row.appendChild(email);

            var userRole = document.createElement("td");
            
            var dropDown = document.createElement("select");
            dropDown.className = "";
            var userOption = document.createElement("option");
            userOption.value = "user";
            userOption.textContent = "User";
            var adminOption = document.createElement("option");
            adminOption.value = "admin";
            adminOption.textContent = "Admin";
            dropDown.appendChild(userOption);
            dropDown.appendChild(adminOption);
            dropDown.value = user.userRole;
            dropDown.addEventListener("change", function (event) {
                event.preventDefault();
                console.log("User role before edit---->",user.role)
                console.log("User id------>", user.id)
                user.role = dropDown.value;
                editRole(user.id, user.role)
                console.log("User role after edit---->",user.role)
            });
            userRole.appendChild(dropDown);
            row.appendChild(userRole);

    
            tableBody.appendChild(row);
        });
    }

    

    fetchUserData();

    
function editRole(userId, userRole) {
    const xhr = new XMLHttpRequest();
    const user={
        role: userRole
    }
    console.log("role of the user in the edit role------> ", user.role)
    xhr.open("PUT", `http://localhost:3000/users/role/${userId}`, true);
    
    xhr.setRequestHeader("x-access-token", localStorage.getItem("UserAuth"));
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                const response = JSON.parse(xhr.responseText)
                alert(response.message)
                fetchUserData();
            } else {
                console.log("Failed to edit the user");
            }
        }
    };
    
    xhr.send(JSON.stringify(user));
}
});