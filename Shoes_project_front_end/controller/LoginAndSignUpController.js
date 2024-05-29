$(document).ready(function() {
    initiateUI();

    $("#link-log-in").click(function() {
        setView($("#loginPage"));
    });

    $("#link-sign-up").click(function() {
        setView($("#signUpPage"));
    });

    $("#admin-log-in-nav").click(function() {
        setView($("#loginPage"));
    });

    $("#admin-sign-up-nav").click(function() {
        setView($("#signUpPage"));
    });

    $("#loginClose").click(function() {
        setView($("#signUpPage"));
    });

    $("#signUpClose").click(function() {
        setView($("#loginPage"));
    });
});

function initiateUI() {
    clearAll();
    setTheLastView();
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "LOG-IN":
            setView($("#loginPage"));
            break;
        case "SIGN-UP":
            setView($("#signUpPage"));
            break;
        default:
            setView($("#loginPage")); // Default to log-in page
    }
}

function saveLastView(viewId) {
    switch (viewId) {
        case "loginPage":
            localStorage.setItem("view", "LOG-IN");
            break;
        case "signUpPage":
            localStorage.setItem("view", "SIGN-UP");
            break;
    }
}

function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    saveLastView(viewOb.attr('id'));
}

function clearAll() {
    $("#loginPage, #signUpPage").css('display', 'none');
}
