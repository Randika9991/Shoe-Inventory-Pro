let txtLogEmail=$("#txtLogInEmail");
let txtLogPassword=$("#txtLogInPassword");
$("#loginSubmit").click(function () {
    if (checkEmptyLogInInputs()){
        let email=txtLogEmail.val();
        let password=txtLogPassword.val();

        let logInObj={
            email:email,
            password:password
        }

        const jsonObj=JSON.stringify(logInObj);
        $.ajax({
            url: "http://localhost:8080/api/v1/auth/signIn",
            method: "POST",
            data: jsonObj,
            contentType: "application/json",
            success:function (resp, textStatus, jqxhr) {

                localStorage.setItem("token", resp.token)
                switchToAnotherPageFromLogin(resp);
                clearLogInInputFields();

            },
            error: function (xhr, textStatus, error) {
                console.log("logIn error: ", error);
                console.log("logIn error: ", xhr);
                if (xhr.status===401){
                    alert("Incorrect Password!")
                }
                if (xhr.status===404){
                    alert("User email is not found")
                }
            }
        });
    }
});

function switchToAnotherPageFromLogin(resp) {
    let empEmail =txtLogEmail.val();
    localStorage.setItem("empEmail", empEmail)

    if (resp.role === "ADMIN"){
        window.location.href = '/Shoes_project_front_end/assets/pages/index.html';
    } else if (resp.role === "USER") {
        window.location.href = '/Shoes_project_front_end/assets/pages/admin.html';
    } else {
        alert("Job role not found!")
    }
}

function checkEmptyLogInInputs() {
    if (txtLogEmail.val()==="" || txtLogPassword.val()===""){
        if (txtLogEmail.val()==="" && txtLogPassword.val()===""){
            txtLogEmail.css("border", "2px solid red");
            txtLogPassword.css("border", "2px solid red");
        } else if(txtLogEmail.val()===""){
            txtLogEmail.css("border", "2px solid red");
        } else if (txtLogPassword.val()===""){
            txtLogPassword.css("border", "2px solid red");
        }
        return false;
    }
    return true;
}
function clearLogInInputFields() {
    txtLogEmail.val("");
    txtLogPassword.val("");
}