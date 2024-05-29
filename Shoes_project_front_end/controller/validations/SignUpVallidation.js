const SIGN_UP_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const SIGN_UP_EMAIL_REGEX =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SIGN_UP_PASSWORD_REGEX = /^\d{4,}$/;

let signUpValidation = [];
signUpValidation.push({field:$("#txtSignUpEmail"),regEx: SIGN_UP_EMAIL_REGEX});
signUpValidation.push({field:$("#txtSignUpFirstName"),regEx: SIGN_UP_NAME_REGEX});
signUpValidation.push({field:$("#txtSignUpLastName"),regEx: SIGN_UP_NAME_REGEX});
signUpValidation.push({field:$("#txtSignUpPassword"),regEx: SIGN_UP_PASSWORD_REGEX});
signUpValidation.push({field:$("#txtSignUpConfirmPassword"),regEx: SIGN_UP_PASSWORD_REGEX});

setSignUpBtn();

$("#txtSignUpEmail,#txtSignUpFirstName,#txtSignUpLastName,#txtSignUpPassword,#txtSignUpConfirmPassword").on("keydown keyup", function (e) {
    let indexNo = signUpValidation.indexOf(signUpValidation.find((c) => c.field.attr("id") === e.target.id));

    if(e.key==="Tab"){
        e.preventDefault();
    }
    checkValidations(signUpValidation[indexNo]);
    setSignUpBtn()
})

$("#txtSignUpConfirmPassword").on("keydown keyup", function () {
    if ($("#txtSignUpPassword").val() === $("#txtSignUpConfirmPassword").val()) {
        setSignUpBtn();
        $("#txtSignUpConfirmPassword").css("border", "1px solid rgb(206, 212, 218)");
    } else {
        $("#txtSignUpConfirmPassword").css("border", "2px solid red");
        $("#btn-sign-up").prop("disabled", true);
    }
});


function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setSignUpBorder(true, object);
        return true;
    }
    setSignUpBorder(false, object);
    return false;
}

function checkAllSignUps() {
    for (let i = 0; i < signUpValidation.length; i++) {
        if (!checkValidations(signUpValidation[i])){
            return false;
        }

    }
    return true;
}

function setSignUpBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid rgb(206, 212, 218)");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "1px solid rgb(206, 212, 218)");
        } else {
            ob.field.css("border", "1px solid rgb(206, 212, 218)");
        }
    }
}

function setSignUpBtn() {
    if (checkAllSignUps()) {
        $("#SignupSubmit").prop("disabled", false);

    } else {
        $("#SignupSubmit").prop("disabled", true);
    }
}