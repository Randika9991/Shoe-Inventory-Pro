$(document).ready(function () {
    loadNextSupplierId();
    getAllSuppliers()
});

// getNextId
function loadNextSupplierId() {
    $.ajax({
        url:"http://localhost:8080/api/v1/supplier/nextId",
        method:"GET",
        success:function (resp) {
            $("#SupCode").val(resp);
        },
        error:function (xhr, status, error) {
            console.log("loadNextSupplierId() ="+error)
        }
    })
}

//getAllSupplier
function getAllSuppliers() {
    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/getAll",
        method: "GET",
        dataType: "json",
        success: function (response) {
            loadSupplierDataToTable(response);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching suppliers:", error);
        }
    });
}

// saveSupplier
$("#btnSaveSupplier").click(function (){
    if (checkAllSuppliers()) {
        SaveSupplier();
    } else {
        alert("Please check the input fields!")
    }
})

function SaveSupplier() {
    let code = $("#SupCode").val();
    let name = $("#txtSupName").val();
    let email = $("#txtSupEmail").val();
    let category = $("#cmbSupCategory").val();
    let addressLine1 = $("#txtSupAddLine01").val();
    let addressLine2 = $("#txtSupAddLine02").val();
    let mobileContact = $("#txtSupMobile").val();
    let landLineContact = $("#txtSupLandLine").val();

    if (code === "" || name === "" || email === "" || addressLine1 === "" || addressLine2 === "" || mobileContact === "" || landLineContact === "") {
        alert("Please fill in all required fields!");
        return;
    }

    const supplierObj = {
        code: code,
        name: name,
        email: email,
        category: category.toUpperCase(),
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        mobileContact: mobileContact,
        landLineContact: landLineContact
    };

    const jsonObj = JSON.stringify(supplierObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/save",
        method: "POST",
        data: jsonObj,
        contentType: "application/json",
        success: function (resp, textStatus, jqxhr) {
            getAllSuppliers();
            alert("Supplier saved successfully!")
            $("#btnSaveSupplier").prop("disabled", true);
            $("#btnSupplierUpdate").prop("disabled", true);
            $("#btnSupplierDelete").prop("disabled", true);
        },
        error: function (xhr, textStatus, error) {
            console.log("cSave error: ", error);
            console.log("cSave error: ", xhr.status);
            if (xhr.status === 409) {
                alert("This supplier is already in the system !!")
            }
        }
    });
}

// update
$("#btnSupplierUpdate").click(function (){
    SupplierUpdate();
})

function SupplierUpdate() {
    let code = $("#SupCode").val();
    let name = $("#txtSupName").val();
    let email = $("#txtSupEmail").val();
    let category = $("#cmbSupCategory").val();
    let addressLine1 = $("#txtSupAddLine01").val();
    let addressLine2 = $("#txtSupAddLine02").val();
    let mobileContact = $("#txtSupMobile").val();
    let landLineContact = $("#txtSupLandLine").val();

    if (code === "" || name === "" || email === "" || addressLine1 === "" || addressLine2 === "" || mobileContact === "" || landLineContact === "") {
        alert("Please fill in all required fields!");
        return;
    }

    const supplierObj = {
        code: code,
        name: name,
        email: email,
        category: category.toUpperCase(),
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        mobileContact: mobileContact,
        landLineContact: landLineContact
    };

    const jsonObj = JSON.stringify(supplierObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/update",
        method: "PATCH",
        data: jsonObj,
        contentType: "application/json",
        success: function (resp, textStatus, jqxhr) {
            //console.log("customer save success: ", resp);
            // clearSupInputFields();
            getAllSuppliers();
            alert("Supplier update successfully!")
            $("#btnSaveSupplier").prop("disabled", true);
            $("#btnSupplierUpdate").prop("disabled", true);
            $("#btnSupplierDelete").prop("disabled", true);
        },
        error: function (xhr, textStatus, error) {
            console.log("cSave error: ", error);
            console.log("cSave error: ", xhr.status);
            if (xhr.status === 409) {
                alert("This supplier is already in the system !!")
            }
        }
    });
}

$("#btnSupplierClear").on("click", function () {
    $("#txtSupName").val("");
    $("#txtSupEmail").val("");
    $("#cmbSupCategory").val("");
    $("#txtSupAddLine01").val("");
    $("#txtSupAddLine02").val("");
    $("#txtSupMobile").val("");
    $("#txtSupLandLine").val("");
    loadNextSupplierId();
});

$("#btnSupplierDelete").on("click", function () {
    let code = $("#SupCode").val();
    if (code === ""){
        alert("Please input valid Supplier ID!")
        return;
    }
    deleteSupplier(code);
});

function deleteSupplier(code) {
    $.ajax({
        url: "http://localhost:8080/api/v1/supplier/delete?"+"code="+code,
        method: "DELETE",
        dataType: "json",
        success: function (resp) {
            console.log("resp = "+resp)
            if (resp){
                getAllSuppliers();
                alert("supplier deleted successfully!")

                return;
            }
            alert("This supplier does not exits!")
        },
        error: function (xhr, status, error) {
            console.log("sDelete = "+error)
        }
    })
}

$("#btnSupplierSearch").click(function () {
    let searchValue = $("#txtSupplierSearch").val()
    if (searchValue===""){

        alert("Please input Supplier ID or Supplier name!")
        return;
    }
    let searchType = $("#cmbSupplierSearch").val();

    if (searchType === "code"){
        supSearch(searchValue, "http://localhost:8080/api/v1/supplier/searchById?id=",searchType);
    } else if(searchType === "Name"){
        supSearch(searchValue,"http://localhost:8080/api/v1/supplier/searchByName?name=",searchType);
    }
})



function supSearch(value, link,searchType) {
    $.ajax({
        url: link + encodeURIComponent(value),
        method: "GET",
        dataType: "json",
        success: function (resp) {
            if (searchType === "code"){
                loadSupplierDataToTableById(resp);
            } else if(searchType === "Name"){
                if (resp.length === 0) {
                    alert("Supplier not found!");
                    return;
                }
                loadSupplierDataToTable(resp);
            }
        },
        error: function (xhr, status, error) {
            console.log("supSearch error:", error);
        }
    });
}

function loadSupplierDataToTableById(supplier) {
    $("#SupplierTbl").empty();
    let newCategory = supplierCapitalizeFirstLetter(supplier.category)

    let row = `<tr>
                                <th>${supplier.code}</th>
                                <td>${supplier.name}</td>
                                <td>${supplier.email}</td>
                                <td>${newCategory}</td>
                                <td>${supplier.addressLine1} ${supplier.addressLine2}</td>
                                <td>${supplier.mobileContact}</td>
                                <td>${supplier.landLineContact}</td>
                                <td style="display: none">${supplier.addressLine1}</td>
                                <td style="display: none">${supplier.addressLine2}</td>
                              </tr>`;
    $("#SupplierTbl").append(row);
}


function loadSupplierDataToTable(response) {
    console.log("Response:", response); // Log the response object
    $("#SupplierTbl").empty(); // Clear the table before populating it with new data
    $.each(response, function (index, supplier) {
        console.log("Supplier:", supplier); // Log each supplier object
        let data = `<tr>
                       <th>${supplier.code}</th>
                       <td>${supplier.name}</td>
                       <td>${supplier.email}</td>
                       <td>${supplier.category}</td>
                       <td>${supplier.addressLine1} ${supplier.addressLine2}</td>
                       <td>${supplier.mobileContact}</td>
                       <td>${supplier.landLineContact}</td>
                       <td style="display: none">${supplier.addressLine1}</td>
                       <td style="display: none">${supplier.addressLine2}</td>
                    </tr>`;
        $("#SupplierTbl").append(data); // Append the generated row to the table
    });
}

//tableClick

$(document).on('click', '#SupplierTbl > tr', function(){
    let row = $(this)

    var id = row.children().eq(0).text();
    var name = row.children().eq(1).text();
    var email = row.children().eq(2).text();
    var category = supplierCapitalizeFirstLetter(row.children().eq(3).text());
    var mobileNumber = row.children().eq(5).text();
    var landLineNumber = row.children().eq(6).text();
    var addressLine1 = row.children().eq(7).text();
    var addressLine2 = row.children().eq(8).text();

    $("#btnSaveSupplier").prop("disabled", true);
    $("#btnSupplierUpdate").prop("disabled", false);
    $("#btnSupplierDelete").prop("disabled", false);

    $("#SupCode").val(id)
    $("#txtSupName").val(name);
    $("#txtSupEmail").val(email);
    $("#cmbSupCategory").val(category);
    $("#txtSupAddLine01").val(addressLine1);
    $("#txtSupAddLine02").val(addressLine2);
    $("#txtSupMobile").val(mobileNumber);
    $("#txtSupLandLine").val(landLineNumber);
})


function supplierCapitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function suppliercapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


