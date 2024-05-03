//logics for SPA
initiateUI();

function initiateUI() {
    clearAll();
    // Set the signup page as the initial view
    setView($("#singUpPage"));
    setTheLastView();

    //change
    $("#lnkCustomer").css("display", "none");
    $("#lnkItem").css("display", "none");
    $("#lnkOrders").css("display", "none");
    $("#lnkEmployee").css("display", "none");

    // setView($("#navigatoon"));
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

            //change
        case "employeeContent":
            localStorage.setItem("view", "EMPLOYEE");
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
        //change

        case "EMPLOYEE":
            setView($("#employeeContent"));
            break;

        default:
            setView($("#dashboardContent"));


    }
}

function clearAll() {
    $("#dashboardContent,#customerContent,#itemContent,#orderContent,#loginPage,#singUpPage,#employeeContent").css('display', 'none');
}

function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    saveLastView(viewOb.get(0).id);
    console.log(viewOb.get(0).id);
}

//bind events
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

// New events for login and signup links
$("#lnkLogin").click(function () {
    setView($("#loginPage"));
});

$("#lnkSignup").click(function () {
    setView($("#singUpPage"));
});

$("#loginSubmit").click(function () {
    setView($("#dashboardContent"));
    $("#lnkCustomer").css("display", "block");
    $("#lnkItem").css("display", "block");
    $("#lnkOrders").css("display", "block");

    // change
    $("#lnkEmployee").css("display", "block");
});

$("#SignupSubmit").click(function () {
    setView($("#dashboardContent"));
    $("#lnkCustomer").css("display", "block");
    $("#lnkItem").css("display", "block");
    $("#lnkOrders").css("display", "block");

    // change
    $("#lnkEmployee").css("display", "block");
});


// change

$("#lnkEmployee").click(function () {
    setView($("#employeeContent"));
});


$("#loginClose").click(function () {
    setView($("#dashboardContent"));
});

$("#singUpClose").click(function () {
    setView($("#dashboardContent"));
});