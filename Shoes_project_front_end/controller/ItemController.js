//load all Item
//Save Item
$(document).ready(function () {
    getAllItems(); // Corrected function name

    $("#btnSaveItem").click(function () {
        if (checkAllItem()) {
            saveItem();
        } else {
            alert("Error: Please check all fields");
        }
    });

    $("#btnItemClear").click(function () {
        clearItemInputFields();
    });
});

function getAllItems() {
    $("#ItemTbl").empty();

    $.ajax({
        url: "http://localhost:8080/app/item?function=getAll",
        method: "GET",
        dataType: "json",
        success: function (res) {
            var rows = "";
            $.each(res.data, function (index, c) {
                let code = c.code;
                let description = c.description;
                let price = c.price;
                let qty = c.qty;
                let row = "<tr><td>" + code + "</td><td>" + description + "</td><td>" + price + "</td><td>" + qty + "</td></tr>";
                rows += row;
            });
            $("#ItemTbl").append(rows);
        },
        error: function (xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}

// Save Item
function saveItem() {
    let id = $("#ItemtxtID").val();
    let description = $("#ItemtxtDescription").val();
    let price = $("#ItemtxtPrice").val();
    let quantity = $("#ItemtxtQuantity").val();

    let itemObj ={
        id: id,
        description: description,
        price: price,
        quantity: quantity
    };

    $.ajax({
        url: "http://localhost:8080/app/item",
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(itemObj),
        success: function (resp, textStatus, jqxhr) {
            alert("Item saved successfully");
            getAllItems();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if(jqXHR.status == 409) {
                alert("Duplicate values. Please check again");
            } else {
                alert("Error: Item not added");
            }
        }
    });
}

//delete Item
$("#btnItemDelete").click(function () {
    let id = $("#ItemtxtID").val();
    let formData = $('#CustomerForm').serialize()
    let consent = confirm("Do you want to delete.?");
    if (consent) {
        $.ajax({
            url: "http://localhost:8080/app/item?id="+id,
            method: "delete",
            data:formData,
            success: function (res) {
                alert("customer remove");
                getAllItems()
                console.log(res)
            },
            error: function (error) {
                let message = JSON.parse(error.responseText).message
                alert(message)
            },
        });
    }
});

//update  Item
$("#btnItemUpdate").click(function () {
    let id = $("#ItemtxtID").val();
    let description = $("#ItemtxtDescription").val();
    let price = $("#ItemtxtPrice").val();
    let quantity = $("#ItemtxtQuantity").val();

    var ItemOB = {
        id:id,
        description:description,
        price:price,
        quantity:quantity
    }
    $.ajax({
        url: "http://localhost:8080/app/item",
        method:"put",
        contentType:"application/json",
        data:JSON.stringify(ItemOB),
        dataType:"json",
        success: function (res) {
            alert("customer updated");
            getAllItems()

        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            alert("customer not update");
        },
    });
});

$(document).on('click', '#ItemTbl > tr', function() {
    let code = $(this).children().eq(0).text();
    let desc = $(this).children().eq(1).text();
    let salary = $(this).children().eq(2).text();
    let qty = $(this).children().eq(3).text();
    $("#ItemtxtID").val(code);
    $("#ItemtxtDescription").val(desc);
    $("#ItemtxtPrice").val(salary);
    $("#ItemtxtQuantity").val(qty);
});





