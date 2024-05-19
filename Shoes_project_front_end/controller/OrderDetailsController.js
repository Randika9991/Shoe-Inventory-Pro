$(document).ready(function () {
    getAllRefundOrders();
});

getAllRefundOrders();

function getAllRefundOrders() {
    $.ajax({
        url: "http://localhost:8080/api/v1/orderDetail/getAllRefundOrders",
        method: "GET",
        dataType: "json",
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


/* Order Detail Content //////////////////////////////////////////////////////*/
// let orderDetailListLength;

// $("#order-detail-table").on('click', 'tr', function () {
//     let row = $(this)
//     var orderId = row.children().eq(0).text();
//     $('#order-detail-list-section').css("display", "block");
//
//     $.ajax({
//         url: "http://localhost:8080/api/v1/orderDetail/getOrderDetailListByOrderId?orderId="+orderId,
//         method: "GET",
//         dataType: "json",
//         success: function (resp) {
//             loadOrderDetailsDataToTableByOrderId(resp);
//         },
//         error: function (xhr, textStatus, error) {
//             console.log("orderDetails error: ", error);
//             console.log("orderDetails error: ", xhr.status);
//             if (xhr.status===404){
//                 swal("Error", "This Order Id does not exits!", "error");
//             }
//         }
//     })
// })
// function loadOrderDetailsDataToTableByOrderId(resp) {
//     orderDetailListLength = resp.length;
//     $("#tbody-refund-order-details").empty();
//     $.each(resp, function (index, detail) {
//
//         let row = `<tr>
//                                 <th>${detail.item_code}</th>
//                                 <td>${detail.itemName}</td>
//                                 <td>${detail.size}</td>
//                                 <td>${detail.itemQty}</td>
//                                 <td>${detail.unitPrice}</td>
//                                 <td class="round-td">
//                                     <button class="btn-refund-orderDetail">Refund</button>
//                                 </td>
//                                 <td style="display: none">${detail.order_id}</td>
//                               </tr>`;
//         $("#tbody-refund-order-details").append(row);
//     })
//     $(".btn-refund-orderDetail").click(refundOrderDetail);
// }
// function refundOrderDetail() {
//     orderDetailListLength -= 1;
//
//     console.log("refundOrderDetail length ="+orderDetailListLength);
//     let row = $(this).closest('tr');
//     let orderId = row.children().eq(6).text();
//     let itemCode = row.children().eq(0).text();
//     let size = row.children().eq(2).text();
//     let qty = row.children().eq(3).text();
//     let unitPrice = row.children().eq(4).text();
//
//     let unitTotalPrice = parseInt(qty)* parseFloat(unitPrice);
//     row.remove();
//     /*console.log(orderId)
//     console.log(itemCode)
//     console.log(size)
//     console.log(qty)
//     console.log(unitTotalPrice)*/
//     let arrayLength = orderDetailListLength;
//     console.log(arrayLength)
//
//     let customObj = {
//         orderId:orderId,
//         itemCode:itemCode,
//         size:size,
//         qty:qty,
//         unitTotalPrice:unitTotalPrice,
//         arrayLength:arrayLength
//     }
//     console.log(customObj)
//     const jsonObj = JSON.stringify(customObj);
//
//     $.ajax({
//         url: "http://localhost:8080/api/v1/orderDetail/refundOrderDetail",
//         method: "DELETE",
//         data: jsonObj,
//         contentType: "application/json",
//         success: function(resp) {
//             swal("Refund", "Order Item refunded successfully", "success");
//             getAllRefundOrders();
//         },
//         error: function(xhr, status, error) {
//             console.log("Error refunding orderDetail: ");
//             console.log(xhr)
//         }
//     });
// }
