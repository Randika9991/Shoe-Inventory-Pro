const ITM_CODE_REGEX = /^[A-Za-z]+-[0-9]*$/
const ITM_NAME_REGEX = /^[A-Za-z ]{3,}$/;
const ITM_NUM_REGEX = /^(0|[1-9]\d*)$/;
const ITM_DECIMAL_REGEX = /^-?\d*\.?\d+$/;

let itemValidation = [];
itemValidation.push({field:$("#txtItemCode"),regEx: ITM_CODE_REGEX});
itemValidation.push({field:$("#txtItemDesc"),regEx: ITM_NAME_REGEX});
itemValidation.push({field:$("#txtItemCategory"),regEx: ITM_NAME_REGEX});
itemValidation.push({field:$("#txtItemSize6"),regEx: ITM_NUM_REGEX});
itemValidation.push({field:$("#txtItemSize7"),regEx: ITM_NUM_REGEX});
itemValidation.push({field:$("#txtItemSize8"),regEx: ITM_NUM_REGEX});
itemValidation.push({field:$("#txtItemSize9"),regEx: ITM_NUM_REGEX});
itemValidation.push({field:$("#txtItemUnitPriceSale"),regEx: ITM_DECIMAL_REGEX});
itemValidation.push({field:$("#txtItemUnitPriceBuy"),regEx: ITM_DECIMAL_REGEX});
itemValidation.push({field:$("#txtItemProfit"),regEx: ITM_DECIMAL_REGEX});
itemValidation.push({field:$("#txtItemProfitMargin"),regEx: ITM_DECIMAL_REGEX});
itemValidation.push({field:$("#txtItemStatus"),regEx: ITM_NAME_REGEX});

setItemBtn();

$("#txtItemCode,#txtItemDesc,#txtItemCategory,#txtItemSize6,#txtItemSize7,#txtItemSize8,#txtItemSize9,#txtItemUnitPriceSale,#txtItemUnitPriceBuy,#txtItemProfit,#txtItemProfitMargin,#txtItemStatus")
    .on("keydown keyup", function (e) {
        let indexNo = itemValidation.indexOf(itemValidation.find((c) => c.field.attr("id") === e.target.id));

        if(e.key==="Tab"){
            e.preventDefault();
        }
        checkValidations(itemValidation[indexNo]);
        setItemBtn()
    })

function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setItemBorder(true, object);
        return true;
    }
    setItemBorder(false, object);
    return false;
}

function checkAllItems() {
    for (let i = 0; i < itemValidation.length; i++) {
        if (!checkValidations(itemValidation[i])){
            return false;
        }

    }
    return true;
}

function setItemBorder(bol, ob) {
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

function setItemBtn() {
    if (checkAllItems()) {
        $("#btnSaveItem").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);
        $("#btnItemDelete").prop("disabled", false);

    } else {
        $("#btnSaveItem").prop("disabled", true);
        $("#btnItemUpdate").prop("disabled", true);
        $("#btnItemDelete").prop("disabled", true);
    }
}