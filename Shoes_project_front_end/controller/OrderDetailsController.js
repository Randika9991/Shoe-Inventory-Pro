// let ChoiceElement6 = document.getElementById("OrderId");
// ChoiceElement6.addEventListener("keyup", function () {
//     let inputOrd = ChoiceElement6.value;
//     $.ajax({
//     url: "http://localhost:8080/app/orderDetails?function=getById&id="+inputOrd,
//     method: "get",
//     dataType: "json",
//     success: function (resp, textStatus, jqxhr) {
//         console.log(resp);
//
//         // $("#od_lblContainer,#od_tblContainer").css("display", "block");
//         // $("#od_lblDate").text(resp.date);
//         // $("#od_lblCustId").text(resp.cust_id);
//         // $("#od_lblDiscount").text(resp.discount);
//         // $("#od_lbltotal").text(resp.total);
//
//         $("#TBodyOrder").empty();
//         for (let i = 0; i < resp.order_list.length; i++){
//             let itemCode = resp.order_list[i].item_code;
//             let unitPrice = resp.order_list[i].unit_price;
//             let qty = resp.order_list[i].qty;
//
//             let row = `<tr>
//                                        <td>${itemCode}</td>
//                                        <td>${unitPrice}</td>
//                                        <td>${qty}</td>
//                                   </tr>`;
//
//             $("#TBodyOrder").append(row);
//         }
//     },
//     error: function (jqXHR, textStatus, errorThrown) {
//         console.log(jqXHR);
//     }
//     });
// });