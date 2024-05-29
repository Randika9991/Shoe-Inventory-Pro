initiateUI();

function initiateUI() {
    clearAll();
    setView($("#dashboardContent"));
    setTheLastView();
    setImageForHeader();
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "dashboardContent":
            localStorage.setItem("view", "HOME");
            break;
        case "customerContent":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "itemContent":
            localStorage.setItem("view", "ITEM");
            break;
        case "orderContent":
            localStorage.setItem("view", "ORDER");
            break;
        case "employeeContent":
            localStorage.setItem("view", "EMPLOYEE");
            break;
        case "supplierContent":
            localStorage.setItem("view", "SUPPLIER");
            break;
        case "OrderDetailsContent":
            localStorage.setItem("view", "ORDER_DETAILS");
            break;
        case "productContent":
            localStorage.setItem("view", "PRODUCT");
            break;

    }
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "HOME":
            setView($("#dashboardContent"));
            break;
        case "ITEM":
            setView($("#itemContent"));
            break;
        case "CUSTOMER":
            setView($("#customerContent"));
            break;
        case "ORDER":
            setView($("#orderContent"));
            break;
        case "EMPLOYEE":
            setView($("#employeeContent"));
            break;
        case "SUPPLIER":
            setView($("#supplierContent"));
            break;
        case "ORDER_DETAILS":
            setView($("#OrderDetailsContent"));
            break;
        case "PRODUCT":
            setView($("#productContent"));
            break;
        default:
            setView($("#dashboardContent"));
    }
}

function clearAll() {
    $("#dashboardContent, #customerContent, #itemContent, #orderContent, #employeeContent, #supplierContent, #OrderDetailsContent, #productContent").hide(); // Include userContent
}

function setView(viewOb) {
    clearAll();
    viewOb.show();
    saveLastView(viewOb.get(0).id);
    console.log(viewOb.get(0).id);
}

// Bind events
$("#lnkHome").click(function () {
    setView($("#dashboardContent"));
});

$("#lnkCustomer").click(function () {
    setView($("#customerContent"));
});

$("#lnkItem").click(function () {
    setView($("#itemContent"));
});

$("#lnkOrders").click(function () {
    setView($("#orderContent"));
});

$("#lnkEmployee").click(function () {
    setView($("#employeeContent"));
});

$("#lnkSupplier").click(function () {
    setView($("#supplierContent"));
});

$("#lnkOrderDetails").click(function () {
    setView($("#OrderDetailsContent"));
});

$("#lnkProduct").click(function () {
    setView($("#productContent"));
});

$("#addItemButton").click(function () {
});

$("#editItemButton").click(function () {
});

$("#deleteItemButton").click(function () {
});

function setImageForHeader() {
    let email = localStorage.getItem("empEmail");
    console.log(email);

    $.ajax({
        url: "http://localhost:8080/api/v1/employee/searchByEmail?email=" + email,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            var imageElement = `<img id="headerImg" alt="image" src="data:image/png;base64,${resp.proPic}" width="45px" height="45px">`;
            $("#admin-img-div").empty();
            $("#admin-img-div").append(imageElement);
            $("#lblCashierName").text(resp.name);
            $("#offcanvasRightLabel").text("hello "+resp.name);
            $("#emailoffcanva").text(email);

        },
        error: function (xhr, textStatus, error) {
            console.log("empSearchByEmail error: ", error);
            console.log("empSearchByEmail error: ", xhr.status);
            if (xhr.status === 404) {
                alert("This employee does not exist!");
            }
        }
    });
}

$("#admin-img-logOut").click(function () {
    window.location.href = '/Shoes_project_front_end/user.html';
});


