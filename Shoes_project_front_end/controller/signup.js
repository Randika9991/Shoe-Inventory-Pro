$("#SignupSubmit").click(function () {
    let email = $("#txtSignUpEmail").val();
    let firstName = $("#txtSignUpFirstName").val();
    let lastName = $("#txtSignUpLastName").val();
    let password = $("#txtSignUpPassword").val();

    let role = $("#cmbSignUpRole").val().toUpperCase();

    let signUpObj = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        role: role
    }

    console.log(signUpObj);

    const jsonObj = JSON.stringify(signUpObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/signUp",
        method: "POST",
        data: jsonObj,
        contentType: "application/json",
        success: function (resp, textStatus, jqxhr) {
            console.log("signUp success: ", resp);
            localStorage.setItem("token", resp.token);
            clearSignUpInputFields();
            alert("Sign up successfully");
            setView($("#loginPage"));
        },
        error: function (xhr, textStatus, error) {
            console.log("signUp error: ", error);
            console.log("signUp error: ", xhr);
            if (xhr.status === 409) {
                alert("This User already exists!");
            }
            if (xhr.status === 404) {
                alert("No Employee can be found with this email!");
            }
        }
    });
});

function clearSignUpInputFields() {
    $("#cmbSignUpRole").prop("selectedIndex", 0); // Reset to the first option
    $("#txtSignUpEmail").val("");
    $("#txtSignUpFirstName").val("");
    $("#txtSignUpLastName").val("");
    $("#txtSignUpPassword").val("");
    $("#txtSignUpConfirmPassword").val("");
}
