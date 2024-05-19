$(document).ready(function () {
    loadNextOrderId();
    loadCustomerIds();
    loadItemCodes();
});

//next id ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadNextOrderId() {
    $.ajax({
        url:"http://localhost:8080/api/v1/placeOrder/nextOrderId",
        method:"GET",
        success:function (resp) {
            $("#txtOrderId").val(resp);
        },
        error:function (xhr, status, error) {
            console.log("loadNextOrderId() ="+error)
        }
    })
}

//add to card ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#btnAddToCart').click(function () {
    let qtyOnHand = parseInt($('#lblQtyOnHand').val());
    let orderQty = parseInt($('#txtOrderQty').val());
    if (qtyOnHand >= orderQty) {
        setDataToCartTable();
        clearItemDetailsInputFields();
        $("#btnAddToCart").prop("disabled", true);
    } else {
        alert("This Item is out of stock!")
    }
});

function setDataToCartTable() {
    let itemCode = $("#cmbItemCodes").val();
    let itemName = $("#lblItemName").val();
    let itemSize = $("#cmbItemSizes").val();
    let unitPrice = $("#lblItemUnitPrice").val();
    let buyingQty = $("#txtOrderQty").val();
    let total = parseInt(unitPrice) * parseInt(buyingQty);
    let availableQty = $("#lblQtyOnHand").val();
    let tableCheck = "notFound";

    $("#tbody-orderCart tr").each(function () {
        let tableItemCode = $(this).find("td:eq(0)").text();
        let tableSize = $(this).find("td:eq(2)").text();

        if (itemCode===tableItemCode && itemSize===tableSize){
            tableCheck = "found";
            let currentQty = $(this).find("td:eq(4)").text();
            let newQty = parseInt(currentQty) + parseInt(buyingQty);
            if (newQty > parseInt(availableQty)){
                alert("This Item is out of stock!")
            } else {
                $(this).find("td:eq(4)").text(newQty);
                let newTotal = unitPrice * newQty;
                $(this).find("td:eq(5)").text(newTotal);
                calculateTotal();
            }
        }
    })

    if (tableCheck === "notFound"){
        let row = `<tr>
                            <td>${itemCode}</td>
                            <td>${itemName}</td>
                            <td>${itemSize}</td>
                            <td>${unitPrice}</td>
                            <td>${buyingQty}</td>
                            <td>${total}</td>
                        </tr>`
        $("#tbody-orderCart").append(row);
        bindOrderCartTblDblClickEvent();
        calculateTotal();
    }
}

function bindOrderCartTblDblClickEvent() {
    $('#tbody-orderCart>tr').on("dblclick", function () {
        const row = $(this);  // Store reference to the clicked row

        const userConfirmed = confirm("Are you sure you want to delete this order?");

        if (userConfirmed) {
            row.remove();
            calculateTotal();
            alert("Order deleted successfully!");
        } else {
            alert("This data is safe!");
        }
    });
}

function calculateTotal() {
    let finalTotal = 0;
    $("#tbody-orderCart>tr").each(function () {
        let rowTotal = parseFloat($(this).find("td:eq(5)").text())
        finalTotal = finalTotal+rowTotal;
    })
    $("#lblTotal").text(finalTotal);
    $('#lblSubTotal').text(finalTotal);

}

//place order ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("#btnPlaceOrder").click(function () {
    let orderId = $("#txtOrderId").val();
    let orderDate = new Date();
    let totalPrice = $("#lblSubTotal").text();
    let addedPoints;
    console.log($("#txtAddPoints").val());
    if ($("#txtAddPoints").val() === ""){
        addedPoints = 0;
    } else{
        addedPoints= $("#txtAddPoints").val();
    }
    let paymentMethod = $("#cmbPaymentMethod").val();
    let cashierName = $("#lblCashierName").text();
    let customerId = $("#cmbCustomerIds").val();
    let customerName = $("#lblCustomerName").val();

    let orderDetailList = [];
    $("#tbody-orderCart>tr").each(function () {
        let orderDetail = {
            order_id: orderId,
            item_code: $(this).find("td:eq(0)").text(),
            itemName: $(this).find("td:eq(1)").text(),
            size: $(this).find("td:eq(2)").text(),
            unitPrice: $(this).find("td:eq(3)").text(),
            itemQty: $(this).find("td:eq(4)").text()
        }
        orderDetailList.push(orderDetail);
    })

    let orderObj = {
        orderId:orderId,
        orderDate:orderDate,
        totalPrice:totalPrice,
        addedPoints:addedPoints,
        paymentMethod:paymentMethod,
        cashierName:cashierName,
        customer_id:customerId,
        customerName:customerName,
        orderDetailDTOList:orderDetailList
    }
    if ($("#txtCash").val() === "") {

    } else {
        const jsonObj = JSON.stringify(orderObj);
        console.log(jsonObj);

        $.ajax({
            url: "http://localhost:8080/api/v1/placeOrder/placeOrder",
            method: "POST",
            data: jsonObj,
            contentType: "application/json",
            success: function (resp, textStatus, jqxhr) {
                console.log("placeOder success: ", resp);
                clearItemDetailsInputFields();
                clearPlaceOrderInputFields();
                $("#btnPlaceOrder").prop("disabled", true);
                alert("Order placed successfully!")
            },
            error: function (xhr, textStatus, error) {
                console.log("placeOrder error: ", error);
                console.log("placeOrder error: ", xhr);
            }
        });
    }
})


//calculate balance////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#txtCash').on("keyup",function (){
    if (validateTxtCash()) {
        calculateBalance();
    } else {
        $('#lblBalance').text("");
    }
});

function calculateBalance() {
    let subTotal = parseFloat($('#lblSubTotal').text());
    let cash = parseFloat($('#txtCash').val());

    if (subTotal <= cash) {
        let balance = cash - subTotal;
        $('#lblBalance').val(balance);
        $("#btnPlaceOrder").prop("disabled", false);
    } else {
        $('#lblBalance').val("");
        $("#btnPlaceOrder").prop("disabled", true);
    }
}

//calculate sub total /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#txtDiscount').on("keyup",function () {
    if (validateTxtDiscount()) {
        calculateSubTotal();
    } else {
        $('#lblSubTotal').text("");
        $("#btnPlaceOrder").prop("disabled", true);
    }
});

function calculateSubTotal() {
    let total = parseFloat($('#lblTotal').text());
    if (!$('#txtDiscount').val()== "" ) {
        let discountPercentage = parseInt($('#txtDiscount').val());

        let discount = total*discountPercentage/100;
        let subTotal = total - discount
        $('#lblSubTotal').text(subTotal);
        calculateBalance();
    } else {
        $('#lblSubTotal').text(total);
        calculateBalance();
    }
}


//load item ideesss /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadItemCodes() {
    $.ajax({
        url:"http://localhost:8080/api/v1/placeOrder/loadItemCodes",
        method:"GET",
        success:function (resp) {
            $("#cmbItemCodes").empty().append(`<option selected></option>`);
            $.each(resp, function (index, code) {
                $("#cmbItemCodes").append(`<option value="${code}">${code}</option>`);
            })
        },
        error:function (xhr, status, error) {
            console.log("loadItemCodes() ="+error)
        }
    })
}

let itemObj;
$("#cmbItemCodes").change(function () {
    let code = $(this).val();
    if (code!==""){
        $("#cmbItemSizes").prop("disabled", false);
    } else {
        $("#cmbItemSizes").prop("disabled", true);
    }
    $.ajax({
        url:"http://localhost:8080/api/v1/placeOrder/searchItemByCode?code="+code,
        method:"GET",
        success:function (resp) {
            itemObj = resp;
            console.log(itemObj)
            $("#lblItemName").val(itemObj.description);
            $("#lblItemUnitPrice").val(itemObj.salePrice);
        },
        error:function (xhr, status, error) {
            console.log("searchCusById() ="+error)
            if (xhr.status===404){
                alert("This Item does not exits!");
            } else {
                alert("Failed to retrieve item details. Please try again later.");
            }
        }
    })
})

$("#cmbItemSizes").change(function () {
    let size = $(this).val();

    if (itemObj && itemObj.hasOwnProperty(size)) {
        let qtyOnHand = itemObj[size];
        if (qtyOnHand>0){
            $("#lblQtyOnHand").val(qtyOnHand);
        } else {
            $("#lblQtyOnHand").val("Not available");
        }
    } else {
        $("#lblQtyOnHand").val("Quantity not available");
    }
})

//load cust ideesss /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadCustomerIds() {
    $.ajax({
        url:"http://localhost:8080/api/v1/placeOrder/loadCusIds",
        method:"GET",
        success:function (resp) {
            $("#cmbCustomerIds").empty().append(`<option selected></option>`);
            $.each(resp, function (index, cusId) {
                $("#cmbCustomerIds").append(`<option value="${cusId}">${cusId}</option>`);
            })
        },
        error:function (xhr, status, error) {
            console.log("loadCusId() ="+error)
        }
    })
}


$("#cmbCustomerIds").change(function () {
    let code = $(this).val();
    $.ajax({
        url:"http://localhost:8080/api/v1/placeOrder/searchCusById?code="+code,
        method:"GET",
        success:function (resp) {
            $("#lblCustomerName").val(resp.name);
        },
        error:function (xhr, status, error) {
            console.log("searchCusById() ="+error)
            if (xhr.status===404){
                alert("This Customer does not exits!")
            }
        }
    })
})

//clear all field /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clearItemDetailsInputFields() {
    $("#cmbItemSizes").val("")
    $("#lblQtyOnHand").val("");
    $("#txtOrderQty").val("");
}

function clearPlaceOrderInputFields() {
    loadNextOrderId();
    $("#cmbCustomerIds").val("");
    $("#lblCustomerName").val("");
    $("#cmbItemCodes").val("");
    $("#lblItemName").text("");
    $("#lblItemUnitPrice").text("");
    $("#tbody-orderCart").empty();
    $("#lblSubTotal, #lblTotal, #lblBalance").text("");
    $("#txtCash, #txtDiscount, #txtAddPoints").val("");
    $("#cmbPaymentMethod").prop("selectedIndex", "Cash");
}
