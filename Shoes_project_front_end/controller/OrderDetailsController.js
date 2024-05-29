$(document).ready(function () {
    getAllRefundOrders();
});

getAllRefundOrders();

function getAllRefundOrders() {
    $.ajax({
        url: "http://localhost:8080/api/v1/orderDetail/getAllRefundOrders",
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            console.log(resp)
            loadRefundOrdersDataToTable(resp);
        },
        error: function (xhr, status, error) {
            console.log("getAllSuppliers = "+error)
        }
    })
}

function loadRefundOrdersDataToTable(resp) {
    $("#tbody-refund-orders").empty();
    $.each(resp, function (index, order) {

        // Format the orderDate
        let formattedDate = new Date(order.orderDate).toLocaleString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        let row = `<tr>
                                <th>${order.orderId}</th>
                                <td>${order.cashierName}</td>
                                <td>${order.customerName}</td>
                                <td>${formattedDate}</td>
                                <td>${order.addedPoints}</td>
                                <td>${order.totalPrice}</td>
                                <td class="round-td">
                                    <button class="btn-refund">Delete</button>
                                </td>
                              </tr>`;
        $("#tbody-refund-orders").append(row);
    })

    $(".btn-refund").click(refundOrder);
}
function refundOrder() {
    console.log("Delete");
    $(this).closest('tr').remove();

    $.ajax({
        url: "http://localhost:8080/api/v1/orderDetail/refundOrder",
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        data: { orderId: $(this).closest('tr').find('th').text() },
        success: function(resp) {
            alert("Order delete successfully")
        },
        error: function(xhr, status, error) {
            console.log("Error delete order: ");
            console.log(xhr)
        }
    });
}
$("#btnOrderSearch").click(function () {
    let searchOrderId = $("#txtSearchOrder").val();
    if (searchOrderId===""){
        alert( "Please insert Order ID!")
        return;
    }
    orderSearchByOrderId(searchOrderId);
});
function orderSearchByOrderId(orderId) {
    $.ajax({
        url: "http://localhost:8080/api/v1/orderDetail/searchByOrderId?orderId="+orderId,
        method: "GET",
        dataType: "json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp) {
            loadOrderDataToTableByOrderId(resp);
        },
        error: function (xhr, textStatus, error) {
            console.log("orderSearchById error: ", error);
            console.log("orderSearchById error: ", xhr.status);
            if (xhr.status===404){
                alert("This Order Id does not exits!")
            }
        }
    })
}
function loadOrderDataToTableByOrderId(order) {
    $("#tbody-refund-orders").empty();
    let formattedDate = new Date(order.orderDate).toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    let row = `<tr>
                                <th>${order.orderId}</th>
                                <td>${order.cashierName}</td>
                                <td>${order.customerName}</td>
                                <td>${formattedDate}</td>
                                <td>${order.addedPoints}</td>
                                <td>${order.totalPrice}</td>
                                <td class="round-td">
                                    <button class="btn-refund">Delete</button>
                                </td>
                              </tr>`;
    $("#tbody-refund-orders").append(row);
    $(".btn-refund").click(refundOrder);
}

/* Clear Order Inputs /////////////////////////////////////////////////////// */
$("#btnOrderClear").click(function () {
    clearOrderDetailInputFields();
});
function clearOrderDetailInputFields() {
    $("#txtSearchOrder").val("");
    $('#order-detail-list-section').css("display", "none");
    getAllRefundOrders();
}

