const EMP_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const EMP_ADDRESS_REGEX = /^[A-Za-z0-9 ]{5,}$/;
const EMP_ADDRESS_NO_REGEX = /^(?:no\.|No\.)\d+$/i
const EMP_EMAIL_REGEX =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMP_PHONE_REGEX = /^\d{10}$/;

let empValidation = [];
empValidation.push({field:$("#eName"),regEx: EMP_NAME_REGEX});
empValidation.push({field:$("#eEmail"),regEx: EMP_EMAIL_REGEX});
empValidation.push({field:$("#eAddress"),regEx: EMP_ADDRESS_NO_REGEX});
empValidation.push({field:$("#eState"),regEx: EMP_ADDRESS_REGEX});
empValidation.push({field:$("#ePhone"),regEx: EMP_PHONE_REGEX});
empValidation.push({field:$("#eHomeNumber"),regEx: EMP_PHONE_REGEX});
empValidation.push({field:$("#eGuardian"),regEx: EMP_NAME_REGEX});

setEmployeeBtn();

$("#eName,#eEmail,#eAddress,#eState,#ePhone,#eHomeNumber,#eGuardian").on("keydown keyup", function (e) {
    let indexNo = empValidation.indexOf(empValidation.find((c) => c.field.attr("id") === e.target.id));

    if(e.key==="Tab"){
        e.preventDefault();
    }
    checkValidations(empValidation[indexNo]);
    setEmployeeBtn()
})


function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setEmployeeBorder(true, object);
        return true;
    }
    setEmployeeBorder(false, object);
    return false;
}
function checkAllEmployees() {
    for (let i = 0; i < empValidation.length; i++) {
        if (!checkValidations(empValidation[i])){
            return false;
        }

    }
    return true;
}

function setEmployeeBorder(bol, ob) {
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

            //ob.field.css("border", "var(--bs-border-width) solid var(--bs-border-color)");
        }
    }
}

function setEmployeeBtn() {
    if (checkAllEmployees()) {
        $("#eSaveBtn").prop("disabled", false);
        $("#eUpdateBtn").prop("disabled", false);
        $("#eDeleteBtn").prop("disabled", false);
    } else {
        $("#eSaveBtn").prop("disabled", true);
        $("#eUpdateBtn").prop("disabled", true);
        $("#eDeleteBtn").prop("disabled", true);
    }
}