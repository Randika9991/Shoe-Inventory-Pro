const ORDER_QTY_REGEX = /^\d{1,4}$/;
const ORDER_DISCOUNT_REGEX = /^\d{0,2}$/;
const ORDER_CASH_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

// btnAddToCart validations///////////////////////////////////////////
$('#txtOrderQty').on("keyup",function () {
    checkItemDetailsInputFields();
});
$('#cmbItemCodes').on("click",function () {
    checkItemDetailsInputFields();
});
$('#cmbCustomerIds').on("click",function () {
    checkItemDetailsInputFields();
});
$('#cmbItemSizes').on("click",function () {
    checkItemDetailsInputFields();
});
$("#txtOrderQty").on("keyup", function () {
    validateTxtOrderQty();
})
function validateTxtOrderQty() {
    if (ORDER_QTY_REGEX.test($('#txtOrderQty').val())) {
        $('#txtOrderQty').css("border", "1px solid rgb(206, 212, 218)");
    } else {
        $('#txtOrderQty').css("border", "2px solid red");
    }
}
function checkItemDetailsInputFields() {
    if (ORDER_QTY_REGEX.test($('#txtOrderQty').val()) && $('#cmbItemCodes').val() !== ""  && $('#cmbCustomerIds').val() !== "" && $('#cmbItemSizes').val() !== "") {
        $("#btnAddToCart").prop("disabled", false);
    } else {
        $("#btnAddToCart").prop("disabled", true);
    }
}

// btnPlaceOrder validations///////////////////////////////////////////
function validateTxtCash() {
    if (ORDER_CASH_REGEX.test($('#txtCash').val())) {
        $('#txtCash').css("border", "1px solid rgb(206, 212, 218)");
        return true;
    } else {
        $('#txtCash').css("border", "2px solid red");
        return false;
    }
}
function validateTxtDiscount() {
    if (ORDER_DISCOUNT_REGEX.test($('#txtDiscount').val())) {
        $('#txtDiscount').css("border", "1px solid rgb(206, 212, 218)");
        return true;
    } else {
        $('#txtDiscount').css("border", "2px solid red");
        return false;
    }
}
function validateTxtAddPoints() {
    if (ORDER_QTY_REGEX.test($('#txtAddPoints').val())) {
        $('#txtAddPoints').css("border", "1px solid rgb(206, 212, 218)");
        return true;
    } else {
        $('#txtAddPoints').css("border", "2px solid red");
        return false;
    }
}

//addedPoints /////////////////
$('#txtAddPoints').on("keyup",function (){
    if (validateTxtAddPoints()) {
        calculateBalance();
    } else {
        $('#lblBalance').text("");
    }
});
