$(document).ready(function () {
    setImageForHeader();
});

let oldpassword;
let firstName;
let lastName;
let role;

function setImageForHeader() {
    let email = localStorage.getItem("empEmail");

    console.log(email);
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/searchByEmail?email=" + email,
        method: "GET",
        dataType: "json",
        success: function (resp) {
            oldpassword = resp.password;
            firstName = resp.firstName;
            lastName = resp.lastName;
            role = resp.role;
        },
        error: function (xhr, textStatus, error) {
            console.log("empSearchByEmail error: ", error);
            console.log("empSearchByEmail error: ", xhr.status);
            if (xhr.status === 404) {
                alert("This employee does not exist!");
            }
        }
    });
}

$("#canvasSaveCustomer").click(async function () {
    var newPassword = $('#newPassword').val();
    var confirmPassword = $('#confirmPassword').val();
    var oldpassword2 = $('#oldPassword').val();
    const password = localStorage.getItem("password");
    let email = localStorage.getItem("empEmail");

    if (oldpassword2 === password) {
        if (newPassword === confirmPassword) {
            await deleteuse(newPassword, email);
        } else {
            checkPasswordInputs();
        }
    } else {
        alert("Old password has not been loaded yet.");
    }
});

async function deleteuse(newPassword, email) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8080/api/v1/auth/delete?code=" + email,
            method: "DELETE",
            dataType: "json",
            success: function (resp) {
                console.log("User deleted successfully");
                alert("User deleted successfully");
                // update(newPassword, email).then(resolve).catch(reject);
            },
            error: function (xhr, status, error) {
                console.log("AJAX error callback triggered");
                console.log("XHR: ", xhr);
                console.log("Status: ", status);
                console.log("Error: ", error);
                reject(error);
            }
        });
    });
}

// async function update(newPassword, email) {
//     return new Promise((resolve, reject) => {
//         let signUpObj = {
//             email: email,
//             firstName: firstName,
//             lastName: lastName,
//             password: newPassword,
//             role: role
//         };
//
//         console.log(signUpObj);
//
//         const jsonObj = JSON.stringify(signUpObj);
//
//         $.ajax({
//             url: "http://localhost:8080/api/v1/auth/signUp",
//             method: "POST",
//             data: jsonObj,
//             contentType: "application/json",
//             success: function (resp, textStatus, jqxhr) {
//                 console.log("signUp success: ", resp);
//                 localStorage.setItem("token", resp.token);
//                 clearSignUpInputFields();
//                 alert("Sign up successfully");
//                 setView($("#loginPage"));
//                 resolve(resp);
//             },
//             error: function (xhr, textStatus, error) {
//                 console.log("signUp error: ", error);
//                 console.log("signUp error: ", xhr);
//                 if (xhr.status === 409) {
//                     alert("This User already exists!");
//                 }
//                 if (xhr.status === 404) {
//                     alert("No Employee can be found with this email!");
//                 }
//                 reject(error);
//             }
//         });
//     });
// }

function checkPasswordInputs() {
    var newPassword = $('#newPassword').val();
    var confirmPassword = $('#confirmPassword').val();

    // Check if either field is empty
    if (newPassword === "" || confirmPassword === "") {
        if (newPassword === "" && confirmPassword === "") {
            $('#newPassword').css("border", "2px solid red");
            $('#confirmPassword').css("border", "2px solid red");
        } else if (newPassword === "") {
            $('#newPassword').css("border", "2px solid red");
        } else if (confirmPassword === "") {
            $('#confirmPassword').css("border", "2px solid red");
        }
        return false;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        $('#newPassword').css("border", "2px solid red");
        $('#confirmPassword').css("border", "2px solid red");
        alert("Passwords do not match");
        return false;
    }

    // If everything is correct, remove the red border
    $('#newPassword').css("border", "");
    $('#confirmPassword').css("border", "");
    return true;
}
