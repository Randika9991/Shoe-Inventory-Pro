$(document).ready(function () {
    setImageForHeader();
});

let oldpassword;
let email = localStorage.getItem("empEmail");

function setImageForHeader() {
    console.log(email);

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/searchByEmail?email=" + email,
        method: "GET",
        dataType: "json",
        success: function (resp) {
            oldpassword = resp.password;
            console.log("Old password from server:", oldpassword);
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
    var confirmPassword = $('#ConfirmPassword').val();
    var oldpassword2 = $('#oldPassword').val();

    console.log("Entered old password:", oldpassword2);
    console.log("Stored old password hash:", oldpassword);

    if (oldpassword) {
        // Verify if old passwords match
        const match = await bcrypt.compare(oldpassword2, oldpassword);
        console.log("Password match result:", match);
        alert(match);

        // if (match) {
        //     if (newPassword === confirmPassword) {
        //         // Hash the new password
        //         const saltRounds = 10;
        //         const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        //         console.log("New hashed password:", hashedPassword);
        //         // updateUser(email, hashedPassword);
        //     } else {
        //         alert("New passwords do not match.");
        //     }
        // } else {
        //     alert("Old password is incorrect.");
        // }
    } else {
        alert("Old password has not been loaded yet.");
    }
});

// function updateUser(email, hashedPassword) {
//     var userObj = {
//         "email": email,
//         "password": hashedPassword
//     };
//
//     $.ajax({
//         url: "http://localhost:8080/api/v1/auth/update",
//         method: "PATCH",
//         dataType: "json",
//         contentType: "application/json",
//         data: JSON.stringify(userObj),
//         headers: {
//             "Authorization": "Bearer " + localStorage.getItem("token")
//         },
//         success: function (resp) {
//             alert("Password updated successfully!");
//         },
//         error: function (xhr, textStatus, error) {
//             console.log("Update error: ", error);
//             console.log("Update error: ", xhr.status);
//             if (xhr.status === 404) {
//                 alert("This user does not exist!");
//             } else {
//                 alert("Failed to update password.");
//             }
//         }
//     });
// }