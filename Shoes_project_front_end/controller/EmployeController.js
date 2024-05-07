$(document).ready(function () {
    loadNextEmployeeId();
    getAllEmployees()
});

function loadNextEmployeeId(){
    $.ajax({
        url:"http://localhost:8080/api/v1/employee/nextId",
        method:"GET",
        success:function (response) {
            $("#eId").val(response);
        },
        error:function (xhr, status, error) {
            console.log(error)
        }
    })
}

// getall
function getAllEmployees() {
    $.ajax({
        url: "http://localhost:8080/api/v1/employee/getAll",
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            loadEmployeeDataInTable(response);
        },
        error: function (xhr, status, err) {
            console.log(err);
        }
    });
}

function loadEmployeeDataInTable(response) {
    $("#employeeTbl").empty();
    $.each(response, function (index, employee) {
        let newGender = capitalizeFirstLetter(employee.gender);
        let newRole = capitalizeFirstLetter(employee.role);

        let formattedDob = new Date(employee.dob).toLocaleDateString();
        let formattedJoinDate = new Date(employee.joinDate).toLocaleDateString();

        let data = `<tr>
                    <td>${employee.code}</td>
                    <td><img alt="image" src="data:image/png;base64,${employee.proPic}" style="max-width: 100px; max-height: 100px;"/></td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${formattedDob}</td>
                    <td>${newGender}</td>
                    <td>${formattedJoinDate}</td>
                    <td>${newRole}</td>
                    <td>${employee.civilStatus}</td>
                    <td>${employee.designation}</td>
                    <td>${employee.addressLine1} ${employee.addressLine2}</td>
                    <td>${employee.contact}</td>
                    <td>${employee.branch}</td>
                    <td>${employee.guardianName}</td>
                    <td>${employee.guardianContact}</td>
                    <td style="display: none">${employee.addressLine1}</td>
                    <td style="display: none">${employee.addressLine2}</td>
                </tr>`;
        $("#employeeTbl").append(data);
    });
}

// save
$("#eSaveBtn").click(function (){
    if (checkAllEmployees()) {
            saveEmployee();
    } else {
        alert("Please check the input fields!")
    }
})

function saveEmployee(){
    let code=$("#eId").val();
    let name=$("#eName").val();
    let email=$("#eEmail").val();
    let contact=$("#ePhone").val();
    let addressLine1=$("#eAddress").val();
    let addressLine2=$("#eState").val();
    let dob=$("#edOb").val();
    let designation=$("#eDesignation").val();
    let role=$("#eROle").val();
    let civilStatus=$("#eStatus").val();
    let joinDate=$("#eJoinDate").val();
    let guardian=$("#eGuardian").val();
    let guardianNumber=$("#eHomeNumber").val();
    let gender=$("#eGender").val();
    let branch=$("#eBranch").val();
    let proPicInput=$('#eImage').prop('files')[0];

    var formData = new FormData();
    formData.append('code', code);
    formData.append('name', name);
    formData.append('proPic', proPicInput);
    formData.append('email', email);
    formData.append('contact', contact);
    formData.append('dob', dob);
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('joinDate', joinDate);
    formData.append('guardianContact', guardianNumber);
    formData.append('guardianName', guardian);
    formData.append('branch', branch);
    formData.append('gender', gender.toUpperCase());
    formData.append('civilStatus', civilStatus);
    formData.append('designation', designation);
    formData.append('role', role.toUpperCase());

    if(dob==="" ||joinDate==="" || gender==="Choose..." || designation==="Choose..." || branch==="Choose..." || civilStatus==="Choose..." || role==="Choose..." || $('#eImage').val()===""){
        alert("fill all empty fields !!")
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/employee/save',
        method:"Post",
        processData: false,
        contentType: false,
        data:formData,

        success:function (response) {
            console.log(response)
            getAllEmployees();
            $("#eSaveBtn").prop("disabled", true);
            $("#eUpdateBtn").prop("disabled", true);
            $("#eDeleteBtn").prop("disabled", true);
        },
        error:function (xhr,status,err) {
            console.log(err)
            console.log(xhr.status)
            if(xhr.status===409){
                alert("This employee is already in the system !!")
            }
        }
    })
}

$("#eUpdateBtn").click(function () {
    updateEmployee();
});

function updateEmployee() {
    let code = $("#eId").val();
    let name = $("#eName").val();
    let email = $("#eEmail").val();
    let contact = $("#ePhone").val();
    let addressLine1 = $("#eAddress").val();
    let addressLine2 = $("#eState").val();
    let dob = $("#edOb").val(); // Make sure this is in the correct format
    let designation = $("#eDesignation").val();
    let role = $("#eROle").val();
    let civilStatus = $("#eStatus").val();
    let joinDate = $("#eJoinDate").val();
    let guardian = $("#eGuardian").val();
    let guardianNumber = $("#eHomeNumber").val();
    let gender = $("#eGender").val();
    let branch = $("#eBranch").val();
    let proPicInput = $('#eImage').prop('files')[0];

    // Logging to verify values
    console.log("Code:", code);
    console.log("Name:", name);
    console.log("Email:", email);
    // Add logging for other variables as needed

    var formData = new FormData();
    formData.append('code', code);
    formData.append('name', name);
    formData.append('proPic', proPicInput);
    formData.append('email', email);
    formData.append('contact', contact);
    formData.append('dob', dob);
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('joinDate', joinDate);
    formData.append('guardianContact', guardianNumber);
    formData.append('guardianName', guardian);
    formData.append('branch', branch);
    formData.append('gender', gender.toUpperCase());
    formData.append('civilStatus', civilStatus);
    formData.append('designation', designation);
    formData.append('role', role.toUpperCase());

    if(dob==="" ||joinDate==="" || gender==="Choose..." || designation==="Choose..." || branch==="Choose..." || civilStatus==="Choose..." || role==="Choose..." || $('#eImage').val()===""){
        alert("Click table what do you want to update !!")
        return;
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/employee/update',
        method: "PATCH",
        processData: false,
        contentType: false,
        data: formData,

        success: function (response) {
            alert("Employee update Success")
            getAllEmployees();
            $("#eSaveBtn").prop("disabled", true);
            $("#eUpdateBtn").prop("disabled", true);
            $("#eDeleteBtn").prop("disabled", true);
        },
        error: function (xhr, status, err) {
            console.error("Error:", xhr, status, err);
            if (xhr.status === 404) {
                alert("This employee is not in the system. Try with another!!");
            }
            // Handle other error cases
        }
    });
}

// serch
$("#searchInput").on("input", function () {
    $("#employeeTbl").empty();
    let name=$("#searchInput").val();
    console.log(name)
    $.ajax({
        url: 'http://localhost:8080/api/v1/employee/search?name='+name,
        method:"GET",
        dataType: "json",

        success:function (response) {
            console.log(response)
            $.each(response, function (index, employee) {

                setTimeout(function (){
                    let newGender=capitalizeFirstLetter(employee.gender)
                    let newRole=capitalizeFirstLetter(employee.role)

                    let data = `<tr>
                    <td>${employee.code}</td>
                    <td><img alt="image" src="data:image/png;base64,${employee.proPic}"/></td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.dob}</td>
                    <td>${newGender}</td>
                    <td>${employee.joinDate}</td>
                    <td>${newRole}</td>
                    <td>${employee.civilStatus}</td>
                    <td>${employee.designation}</td>
                    <td>${employee.addressLine1} ${employee.addressLine2}</td>
                    <td>${employee.contact}</td>
                    <td>${employee.branch}</td>
                    <td>${employee.guardianName}</td>
                    <td>${employee.guardianContact}</td>
                    <td style="display: none">${employee.addressLine1}</td>
                    <td style="display: none">${employee.addressLine2}</td>
                  
                </tr>`;
                    $("#employeeTbl").append(data);
                },900,index)
            })

        },
        error:function (xhr,status,err) {
            console.log(err)
        }
    })
});

// click table
$('#employeeTbl').on('click', 'tr', function (){
    var id= $(this).find('td:eq(0)').text();
    var proPic= $(this).find('td:eq(1)').html();
    var name = $(this).find('td:eq(2)').text();
    var email = $(this).find('td:eq(3)').text();
    var dob= $(this).find('td:eq(4)').text();
    let newGender=employeeCapitalizeFirstLetter($(this).find('td:eq(5)').text())
    var joinDate = $(this).find('td:eq(6)').text();
    var role =employeeCapitalizeFirstLetter($(this).find('td:eq(7)').text())
    var civilStatus = $(this).find('td:eq(8)').text();
    var designation = $(this).find('td:eq(9)').text();
    var contact = $(this).find('td:eq(11)').text();
    var branch = $(this).find('td:eq(12)').text();
    var guardianName = $(this).find('td:eq(13)').text();
    var guardianContact = $(this).find('td:eq(14)').text();
    var address = $(this).find('td:eq(15)').text();
    var state = $(this).find('td:eq(16)').text();

    $("#eSaveBtn").prop("disabled", false);
    $("#eUpdateBtn").prop("disabled", false);
    $("#eDeleteBtn").prop("disabled", false);

    console.log("1 "+id)
    console.log("2 "+proPic)
    console.log("3 "+name)
    console.log("4 "+email)
    console.log("5 "+dob)
    console.log("6 "+newGender)
    console.log("7 "+joinDate)
    console.log("8 "+role)
    console.log("9 "+civilStatus)
    console.log("10 "+designation)
    console.log("11 "+contact)
    console.log("12 "+branch)
    console.log("13 "+guardianName)
    console.log("14"+guardianContact)

    var base64Data;
    var matches = proPic.match(/src="data:image\/png;base64,([^"]+)"/);
    if (matches) {
        base64Data = matches[1];
        console.log(base64Data);

        var byteCharacters = atob(base64Data);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: 'image/png' });

        var file = new File([blob], 'image.png', { type: 'image/png' });
        console.log(file)

        var dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);

        var fileInput = document.getElementById('eImage');
        fileInput.files = dataTransfer.files;

    } else {
        console.log("No image data found in the table cell.");
    }

    $("#eId").val(id);
    $("#eName").val(name);
    $("#eEmail").val(email);
    $("#edOb").val(dob);
    $("#eGender").val(newGender);
    $("#eJoinDate").val(joinDate);
    $("#eROle").val(role);
    $("#eStatus").val(civilStatus);
    $("#eDesignation").val(designation);
    $("#eAddress").val(address );
    $("#ePhone").val(contact );
    $("#eBranch").val(branch );
    $("#eGuardian").val(guardianName );
    $("#eHomeNumber").val(guardianContact );
    $("#eState").val(state );
})

$("#eClearBtn").on("click", function () {
    $("#eId").val("");
    $("#eName").val("");
    $("#eEmail").val("");
    $("#edOb").val("");
    $("#eGender").val("");
    $("#eJoinDate").val("");
    $("#eROle").val("");
    $("#eStatus").val("");
    $("#eDesignation").val("");
    $("#eAddress").val("");
    $("#ePhone").val("");
    $("#eBranch").val("");
    $("#eGuardian").val("");
    $("#eHomeNumber").val("");
    $("#eState").val("");
})



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function employeeCapitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}










