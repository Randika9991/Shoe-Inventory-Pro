const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z0-9 ]{5,}$/;
const CUS_ADDRESS_NO_REGEX = /^(?:no\.|No\.)\d+$/i
const CUS_EMAIL_REGEX =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CUS_PHONE_REGEX = /^\d{10}$/;

let cusValidation = [];
cusValidation.push({field:$("#cName"),regEx: CUS_NAME_REGEX});
cusValidation.push({field:$("#cEmail"),regEx: CUS_EMAIL_REGEX});
cusValidation.push({field:$("#cContact"),regEx: CUS_PHONE_REGEX});
cusValidation.push({field:$("#cAddressLine"),regEx: CUS_ADDRESS_NO_REGEX});
cusValidation.push({field:$("#cStateCity"),regEx: CUS_ADDRESS_REGEX});

setCustomerBtn();

$("#cName,#cEmail,#cContact,#cAddressLine,#cStateCity").on("keydown keyup", function (e) {
    let indexNo = cusValidation.indexOf(cusValidation.find((c) => c.field.attr("id") === e.target.id));

    if(e.key==="Tab"){
        e.preventDefault();
    }
    checkValidations(cusValidation[indexNo]);
    setCustomerBtn()
})

function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setCustomerBorder(true, object);
        return true;
    }
    setCustomerBorder(false, object);
    return false;
}

function checkAllCustomers() {
    for (let i = 0; i < cusValidation.length; i++) {
        if (!checkValidations(cusValidation[i])){
            return false;
        }

    }
    return true;
}

function setCustomerBorder(bol, ob) {
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

function setCustomerBtn() {
    // $("#CustomerDeleteBtn").prop("disabled", true);
    // $("#CustomerUpdateBtn").prop("disabled", true);

    if (checkAllCustomers()) {
        $("#btnSaveCustomer").prop("disabled", false);
        $("#btnUpdate").prop("disabled", false);
        $("#btnCusDelete").prop("disabled", false);

    } else {
        $("#btnSaveCustomer").prop("disabled", true);
        $("#btnUpdate").prop("disabled", true);
        $("#btnCusDelete").prop("disabled", true);
    }
}