initiateUI();

function initiateUI() {
    clearAll();
    setView($("#singUpPage"));
    setTheLastView();

    // Hide all links initially
    $("#lnkCustomer").hide();
    $("#lnkItem").hide();
    $("#lnkOrders").hide();
    $("#lnkEmployee").hide();
    $("#lnkSupplier").hide();
    $("#lnkOrderDetails").hide(); // New Link
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
        case "loginPage":
            localStorage.setItem("view", "LOGIN");
            break;
        case "singUpPage":
            localStorage.setItem("view", "SIGNUP");
            break;
        case "employeeContent":
            localStorage.setItem("view", "EMPLOYEE");
            break;
        case "supplierContent":
            localStorage.setItem("view", "SUPPLIER");
            break;
        case "OrderDetailsContent": // New Case
            localStorage.setItem("view", "ORDER_DETAILS");
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
        case "LOGIN":
            setView($("#loginPage"));
            break;
        case "SIGNUP":
            setView($("#singUpPage"));
            break;
        case "EMPLOYEE":
            setView($("#employeeContent"));
            break;
        case "SUPPLIER":
            setView($("#supplierContent"));
            break;
        case "ORDER_DETAILS": // New Case
            setView($("#OrderDetailsContent"));
            break;
        default:
            setView($("#dashboardContent"));
    }
}

function clearAll() {
    $("#dashboardContent, #customerContent, #itemContent, #orderContent, #loginPage, #singUpPage, #employeeContent, #supplierContent, #OrderDetailsContent").hide(); // Updated to include orderDetailsContent
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

$("#lnkLogin").click(function () {
    setView($("#loginPage"));
});

$("#lnkSignup").click(function () {
    setView($("#singUpPage"));
});

$("#loginSubmit").click(function () {
    setView($("#dashboardContent"));
    $("#lnkCustomer").show();
    $("#lnkItem").show();
    $("#lnkOrders").show();
    $("#lnkEmployee").show();
    $("#lnkSupplier").show();
    $("#lnkOrderDetails").show(); // Show new link after login
});

$("#SignupSubmit").click(function () {
    setView($("#dashboardContent"));
    $("#lnkCustomer").show();
    $("#lnkItem").show();
    $("#lnkOrders").show();
    $("#lnkEmployee").show();
    $("#lnkSupplier").show();
    $("#lnkOrderDetails").show(); // Show new link after signup
});

$("#lnkEmployee").click(function () {
    setView($("#employeeContent"));
});

$("#loginClose").click(function () {
    setView($("#dashboardContent"));
});

$("#singUpClose").click(function () {
    setView($("#dashboardContent"));
});

$("#lnkSupplier").click(function () {
    setView($("#supplierContent"));
});

$("#lnkOrderDetails").click(function () { // New event
    setView($("#OrderDetailsContent"));
});

// Additional events for managing item content
$("#addItemButton").click(function () {
    // Code to handle adding a new item
});

$("#editItemButton").click(function () {
    // Code to handle editing an existing item
});

$("#deleteItemButton").click(function () {
    // Code to handle deleting an existing item
});
