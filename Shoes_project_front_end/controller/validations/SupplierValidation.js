const SUP_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const SUP_ADDRESS_REGEX = /^[A-Za-z0-9 ]{5,}$/;
const SUP_ADDRESS_NO_REGEX = /^(?:no\.|No\.)\d+$/i
const SUP_EMAIL_REGEX =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUP_PHONE_REGEX = /^\d{10}$/;

let supValidation = [];
supValidation.push({field:$("#txtSupName"),regEx: SUP_NAME_REGEX});
supValidation.push({field:$("#txtSupEmail"),regEx: SUP_EMAIL_REGEX});
supValidation.push({field:$("#txtSupAddLine01"),regEx: SUP_ADDRESS_NO_REGEX});
supValidation.push({field:$("#txtSupAddLine02"),regEx: SUP_ADDRESS_REGEX});
supValidation.push({field:$("#txtSupMobile"),regEx: SUP_PHONE_REGEX});
supValidation.push({field:$("#txtSupLandLine"),regEx: SUP_PHONE_REGEX});

setSupplierBtn();

$("#txtSupName,#txtSupEmail,#txtSupAddLine01,#txtSupAddLine02,#txtSupMobile,#txtSupLandLine").on("keydown keyup", function (e) {
    let indexNo = supValidation.indexOf(supValidation.find((c) => c.field.attr("id") === e.target.id));

    if(e.key==="Tab"){
        e.preventDefault();
    }
    checkValidations(supValidation[indexNo]);
    setSupplierBtn()
})

function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setSupplierBorder(true, object);
        return true;
    }
    setSupplierBorder(false, object);
    return false;
}

function checkAllSuppliers() {
    for (let i = 0; i < supValidation.length; i++) {
        if (!checkValidations(supValidation[i])){
            return false;
        }

    }
    return true;
}

function setSupplierBorder(bol, ob) {
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

function setSupplierBtn() {
    // $("#CustomerDeleteBtn").prop("disabled", true);
    // $("#CustomerUpdateBtn").prop("disabled", true);

    if (checkAllSuppliers()) {
        $("#btnSaveSupplier").prop("disabled", false);
        $("#btnSupplierUpdate").prop("disabled", false);
        $("#btnSupplierDelete").prop("disabled", false);

    } else {
        $("#btnSaveSupplier").prop("disabled", true);
        $("#btnSupplierUpdate").prop("disabled", true);
        $("#btnSupplierDelete").prop("disabled", true);
    }
}