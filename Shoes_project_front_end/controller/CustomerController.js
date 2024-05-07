$(document).ready(function () {
    loadNextCustomerId();
    getAllCustomers();
});

function loadNextCustomerId(){
    $.ajax({
        url:"http://localhost:8080/api/v1/customer/nextId",
        method:"GET",
        success:function (response) {
             $("#cId").val(response);
        },
        error:function (xhr, status, error) {
            console.log(error)
        }
    })
}

// getAllside
function getAllCustomers(){
    $("#customTbl").empty();
    $.ajax({
        url: "http://localhost:8080/api/v1/customer/GetAll",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log("Response:", res);
            if (res && Array.isArray(res)) {
                res.forEach(function(customer) {

                    let newGender=customerCapitalizeFirstLetter(customer.gender)
                    var cusId = customer.code;
                    var cusName = customer.name;
                    var cusAddress = customer.addressLine2;
                    var cusContact = customer.contact;
                    var cusDob = new Date(customer.dob).toLocaleDateString();
                    var cusLoyaltyDate = new Date(customer.loyaltyDate).toLocaleDateString();
                    var LoyaltyLevel = customer.loyaltyLevel;
                    var LoyaltyPoints = customer.loyaltyPoints;
                    if(customer.recentPurchaseDate===null){
                        customer.recentPurchaseDate="No Purchases Yet";
                    }

                    let data = `<tr>
                            <td>${cusId}</td>
                            <td style="display: none" >${cusId}</td>
                            <td>${cusName}</td>
                            <td>${customer.email}</td>
                            <td>${cusContact}</td>
                            <td>${cusDob}</td>
                            <td>${newGender}</td> 
                            <td>${cusAddress}</td>
                            <td style="display: none">${customer.addressLine2}</td>
                            <td>${cusLoyaltyDate}</td>
                            <td>${LoyaltyLevel}</td>
                            <td>${LoyaltyPoints}</td>
                            <td>${customer.recentPurchaseDate}</td>
                            <td style="display: none">${customer.addressLine1}</td>
                            </tr>`;
                    $("#customTbl").append(data);
                });
            } else {
                console.error("Invalid response format or empty data.");
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
}

// save side
$("#btnSaveCustomer").click(function (){
    if (checkAllCustomers()) {
            saveCustomer();
    } else {
        alert("Please check the input fields!")
    }
})
function saveCustomer(){
    let id=$("#cId").val();
    let name=$("#cName").val();
    let email=$("#cEmail").val();
    let contact=$("#cContact").val();
    let addressLine1=$("#cAddressLine").val();
    let addressLine2=$("#cStateCity").val();
    let dob=$("#cDob").val();
    let loyaltyDate=$("#cLoyaltyDate").val();
    let gender=$("#cGender").val();

    if(name==="" || email==="" || contact==="" || addressLine1==="" || addressLine2==="" || dob==="" ||loyaltyDate==="" || gender==="Choose..."){
        alert("fill all empty fields !!")
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/customer/save',
        method:"Post",
        dataType: "json",
        contentType:"application/json",
        data:JSON.stringify({
            "code":id,
            "name":name,
            "email":email,
            "gender":gender.toUpperCase(),
            "contact":contact,
            "dob":dob,
            "addressLine1":addressLine1,
            "addressLine2":addressLine2,
            "loyaltyDate":loyaltyDate,
            "loyaltyLevel":"NEW",
            "loyaltyPoints":8
        }),

        success:function (response) {
            console.log(response)
            getAllCustomers();
            $("#btnSaveCustomer").prop("disabled", true);
            $("#btnUpdate").prop("disabled", true);
            $("#btnCusDelete").prop("disabled", true);
        },
        error:function (xhr,status,err) {
            console.log(err)
            console.log(xhr.status)
            if(xhr.status===409){
                alert("This customer is already in the system !!")
            }
        }
    })
}

// update
$("#btnUpdate").click(function (){
    updateCustomer()
})
function updateCustomer() {
    let code=$("#cId").val();
    let name=$("#cName").val();
    let email=$("#cEmail").val();
    let contact=$("#cContact").val();
    let addressLine1=$("#cAddressLine").val();
    let addressLine2=$("#cStateCity").val();
    let dob=$("#cDob").val();
    let loyaltyDate=$("#cLoyaltyDate").val();
    let loyaltyLevel=$("#cLevel").val();
    let gender=$("#cGender").val();
    let loyaltyPoints=$("#cLoyaltyPoint").val();
    let recentDate=$("#cRecentDate").val();

    if (recentDate==="No Purchases Yet"){
        recentDate=null;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/customer/update',
        method:"Patch",
        dataType:"json",
        contentType:"application/json",
        data:JSON.stringify({
            "code":code,
            "name":name,
            "email":email,
            "gender":gender.toUpperCase(),
            "contact":contact,
            "dob":dob,
            "addressLine1":addressLine1,
            "addressLine2":addressLine2,
            "loyaltyDate":loyaltyDate,
        }),

        success:function (response){
            alert("Customer updated successfully!")
            getAllCustomers();
            // clearCustomerInputFields();
            $("#btnSaveCustomer").prop("disabled", true);
            $("#btnUpdate").prop("disabled", true);
            $("#btnCusDelete").prop("disabled", true);
        },

        error:function (xhr,status,err,response) {
            console.log(err)
            console.log(xhr.status)
            if(xhr.status===404){
                alert("This customer is not in system.Try with another!!")
            }
        }
    })
}

// append to table value text field
$('#customTbl').on('click', 'tr', function (){
    var id= $(this).find('td:eq(1)').text();
    var name = $(this).find('td:eq(2)').text();
    var email = $(this).find('td:eq(3)').text();
    var contact = $(this).find('td:eq(4)').text();
    var dob= $(this).find('td:eq(5)').text();
    var gender = $(this).find('td:eq(6)').text();
    var address = $(this).find('td:eq(13)').text();
    var cityAndState = $(this).find('td:eq(8)').text();
    var loyaltyDate = $(this).find('td:eq(9)').text();
    var loyaltyLevel = $(this).find('td:eq(10)').text();
    var loyaltyPoints = $(this).find('td:eq(11)').text();
    var recentDate = $(this).find('td:eq(12)').text();

    $("#btnSaveCustomer").prop("disabled", false);
    $("#btnUpdate").prop("disabled", false);
    $("#btnCusDelete").prop("disabled", false);

    $("#cId").val(id);
    $("#cName").val(name);
    $("#cEmail").val(email);
    $("#cContact").val(contact);
    $("#cAddressLine").val(address);
    $("#cStateCity").val(cityAndState);
    $("#cDob").val(dob);
    $("#cLoyaltyDate").val(loyaltyDate);
    $("#cGender").val(gender);
    $("#cLevel").val(loyaltyLevel);
    $("#cLoyaltyPoint").val(loyaltyPoints);
    $("#cRecentDate").val(recentDate);
})

// search
$("#searchInput").on("input", function (){
    $("#customTbl").empty();
    let name=$("#searchInput").val();
    console.log(name.trim())
    if (name === "") {
        getAllCustomers(); // If the input is empty, retrieve all customers
        return; // Exit the function to prevent further execution
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/customer/search?name='+name,
        method:"GET",
        dataType: "json",

        success: function (res) {
            console.log("Response:", res);
            if (res && Array.isArray(res)) {
                res.forEach(function(customer) {

                    let newGender=customerCapitalizeFirstLetter(customer.gender)
                    var cusId = customer.code;
                    var cusName = customer.name;
                    var cusAddress = customer.addressLine2;
                    var cusContact = customer.contact;
                    var cusDob = new Date(customer.dob).toLocaleDateString(); // Format date
                    var cusLoyaltyDate = new Date(customer.loyaltyDate).toLocaleDateString(); // Format date
                    var LoyaltyLevel = customer.loyaltyLevel;
                    var LoyaltyPoints = customer.loyaltyPoints;

                    if (customer.recentPurchaseDate === null) {
                        customer.recentPurchaseDate = "No Purchases Yet";
                    }

                    let data = `<tr>
                            <td>${cusId}</td>
                            <td style="display: none" >${cusId}</td>
                            <td>${cusName}</td>
                            <td>${customer.email}</td>
                            <td>${cusContact}</td>
                            <td>${cusDob}</td>
                            <td>${newGender}</td> <!-- Assuming gender is available -->
                            <td>${cusAddress}</td>
                            <td style="display: none">${customer.addressLine2}</td>
                            <td>${cusLoyaltyDate}</td>
                            <td>${LoyaltyLevel}</td>
                            <td>${LoyaltyPoints}</td>
                            <td>${customer.recentPurchaseDate}</td>
                            <td style="display: none">${customer.addressLine1}</td>
                            </tr>`;
                    $("#customTbl").append(data);
                });
            } else {
                console.error("Invalid response format or empty data.");
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX request failed:", status, error);
        }
    });
});

$("#btnCustomerClear").on("click", function () {
    loadNextCustomerId();
    $("#cId").val("");
    $("#cName").val("");
    $("#cEmail").val("");
    $("#cContact").val("");
    $("#cAddressLine").val("");
    $("#cStateCity").val("");
    $("#cDob").val("");
    $("#cLoyaltyDate").val("");
    $("#cGender").val("");
    $("#cLevel").val("");
    $("#cLoyaltyPoint").val("");
    $("#cRecentDate").val("");
});



function customerCapitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}








