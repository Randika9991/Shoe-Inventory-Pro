const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z0-9 ]{5,}$/;
const CUS_STATE_REGEX = /^[A-Za-z0-9 ]{5,}$/;
const CUS_EMAIL_REGEX =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CUS_PHONE_REGEX = /^\d{10}$/;



let cValidation=[];
cValidation.push({field:$("#cName"),regEx: CUS_NAME_REGEX});
cValidation.push({field:$("#cAddressLine"),regEx: CUS_ADDRESS_REGEX});
cValidation.push({field:$("#cStateCity"),regEx: CUS_STATE_REGEX});
cValidation.push({field:$("#cEmail"),regEx: CUS_EMAIL_REGEX});
cValidation.push({field:$("#cContact"),regEx:CUS_PHONE_REGEX});

function clearCustomerInputFields() {
    $("#cName").val("");
    $("#cName").css({"border": "none "});

    $("#cAddressLine").val("");
    $("#cAddressLine").css({"border": "none "});

    $("#cStateCity").val("");
    $("#cStateCity").css({"border": "none "});

    $("#cEmail").val("");
    $("#cEmail").css({"border": "none "});

    $("#cContact").val("")
    $("#cContact").css({"border": "none "});

    $("#cGender").val($("#cGender option:first").val());
    $("#cLoyaltyDate").val("")
    $("#cGender").val("")


    setBtn();
}

setBtn();


$("#cName,#cAddressLine,#cStateCity,#cEmail,#cContact").on("keyup",function(e){

    let indexNo = cValidation.indexOf(cValidation.find((c) => c.field.attr("id") === e.target.id));
    console.log(indexNo);

    if(e.key==="Tab"){
        e.preventDefault();
    }
    checkValidations(cValidation[indexNo]);
    setBtn();
});

function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {

    if (!bol && ob.field.val().length >= 1) {
        ob.field.css({
            "border": "1px solid #fc424a",
        });

    } else if(!bol && ob.field.val().length === 0){
        ob.field.css({
            "border": "none !important",
        });
    }
    else {
        ob.field.css({
            "border": "1px solid #00d25b",
        });

    }
}

function checkAll() {
    for (let i = 0; i < cValidation.length; i++) {
        if (!checkValidations(cValidation[i])) return false;
    }
    return true;
}



function setBtn() {
    // $("#CustomerDeleteBtn").prop("disabled", true);
    // $("#CustomerUpdateBtn").prop("disabled", true);

    if (checkAll()) {
        $("#cSaveBtn").prop("disabled", false);
        $("#cUpdateBtn").prop("disabled", false);
        $("#cDeleteBtn").prop("disabled", false);

    }else{
        $("#cSaveBtn").prop("disabled", true);
        $("#cUpdateBtn").prop("disabled", true);
        $("#cDeleteBtn").prop("disabled", true);
    }

    // let id = $("#cId").val();
    // if (searchCustomer(id) === undefined) {
    //     $("#CustomerDeleteBtn").prop("disabled", true);
    //     $("#CustomerUpdateBtn").prop("disabled", true);
    // } else {
    //     $("#CustomerDeleteBtn").prop("disabled", false);
    //     $("#CustomerUpdateBtn").prop("disabled", false);
    // }

}