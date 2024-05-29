const LOG_IN_EMAIL_REGEX =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOG_IN_PASSWORD_REGEX = /^\d{4,}$/;

let logInValidation = [];
logInValidation.push({field:$("#txtLogInEmail"),regEx: LOG_IN_EMAIL_REGEX});
logInValidation.push({field:$("#txtLogInPassword"),regEx: LOG_IN_PASSWORD_REGEX});


$("#txtLogInEmail,#txtLogInPassword").on("keydown keyup", function (e) {
    let indexNo = logInValidation.indexOf(logInValidation.find((c) => c.field.attr("id") === e.target.id));

    if(e.key==="Tab"){
        e.preventDefault();
    }
    checkValidations(logInValidation[indexNo]);
})
function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setLogInBorder(true, object);
        return true;
    }
    setLogInBorder(false, object);
    return false;
}
function checkAllLogIns() {
    for (let i = 0; i < logInValidation.length; i++) {
        if (!checkValidations(logInValidation[i])){
            return false;
        }

    }
    return true;
}
function setLogInBorder(bol, ob) {
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