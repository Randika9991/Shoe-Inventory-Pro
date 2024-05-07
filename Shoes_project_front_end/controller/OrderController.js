// // customer side
// let selectElement = document.getElementById("CustominputState");
// getAllCustomer();
//     function getAllCustomer() {
//         $.ajax({
//             url: "http://localhost:8080/app/customer?function=getAll",
//             method: "GET",
//             dataType: "json",
//             success: function (res) {
//                 var rows = "";
//                 $.each(res.data, function (index, c) {
//                     let option = document.createElement("option");
//                     option.value = c.id;
//                     option.textContent = c.id;
//                     selectElement.appendChild(option);
//                 });
//             },
//             error: function (xhr, status, error) {
//                 console.error("AJAX request failed:", status, error);
//             }
//         });
//     }
//
// selectElement.addEventListener("change", function () {
//     let selectedId = selectElement.value;
//     $.ajax({
//         url: "http://localhost:8080/app/customer?function=getById&selectedId="+selectedId,
//         method: "GET",
//         dataType: "json",
//         success: function (customer) {
//             $("#custIdSetOrder").val(customer.id);
//             $("#custNameSetOrder").val(customer.name);
//             $("#custAddressSetOrder").val(customer.address);
//             $("#custSalarySetOrder").val(customer.salary);
//         },
//         error: function (xhr, status, error) {
//             console.error("AJAX request failed:", status, error);
//         }
//     });
// });
//
// // getAllItem();
// //     let selectItemElement = document.getElementById("IteminputState");
// // function getAllItem() {
// //     $.ajax({
// //         url: "http://localhost:8080/app/item?function=getAll",
// //         method: "GET",
// //         dataType: "json",
// //         success: function (res) {
// //             var rows = "";
// //             $.each(res.data, function (index, c) {
// //                 let option = document.createElement("option");
// //                 option.value = c.code;
// //                 option.textContent = c.code;
// //                 selectItemElement.appendChild(option);
// //             });
// //
// //         },
// //         error: function (xhr, status, error) {
// //             console.error("AJAX request failed:", status, error);
// //         }
// //     });
// // }
//
//
// let itemCodetoOrder;
// let itemNametoOrder;
// let itemPricetoOrder;
// let itemPricetoqty;
// selectItemElement.addEventListener("change", function () {
//     let selectedCode = selectItemElement.value;
//     $.ajax({
//         url: "http://localhost:8080/app/item?function=getById&selectedcode=" + selectedCode,
//         method: "GET",
//         dataType: "json",
//         success: function (item) {
//             console.log(item); // Debugging: Check the received item object
//             if (item) {
//                 $("#ItemIdSetOrder").val(item.code);
//                 $("#ItemNameSetOrder").val(item.description);
//                 $("#ItemPriceSetOrder").val(item.price);
//                 $("#ItemQTYSetOrder").val(item.qty);
//
//                 itemCodetoOrder = item.code;
//                 itemNametoOrder = item.description;
//                 itemPricetoOrder = item.price;
//                 itemPricetoqty = item.qty;
//             } else {
//                 // Handle case where no item is found with the provided code
//                 console.error("Item not found with code: " + selectedCode);
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error("AJAX request failed:", status, error);
//         }
//     });
// });
//
// let ChoiceElementOrder = document.getElementById("ChoiceQTYOrder");
// const defaultArrayToSecondItem = [];
// function getAllItemTOOrder() {
//
//     if (itemPricetoqty >= ChoiceElementOrder.value) {
//         let newItemtoOrder = Object.assign({}, itemToOrder);
//         let totalItemPrice = itemPricetoOrder * ChoiceElementOrder.value;
//         let existingItemIndex = defaultArrayToSecondItem.findIndex(item => item.itemCode === itemCodetoOrder);
//         if (existingItemIndex !== -1) {
//             defaultArrayToSecondItem[existingItemIndex].itemQTYChoice = ChoiceElementOrder.value;
//             defaultArrayToSecondItem[existingItemIndex].totalPrice = totalItemPrice;
//
//         } else {
//             newItemtoOrder.itemCode = itemCodetoOrder;
//             newItemtoOrder.itemName = itemNametoOrder;
//             newItemtoOrder.itemPrice = itemPricetoOrder;
//             newItemtoOrder.itemQTYChoice = ChoiceElementOrder.value;
//             newItemtoOrder.totalPrice = totalItemPrice;
//             defaultArrayToSecondItem.push(newItemtoOrder);
//         }
//         getAllItemSetTableArray();
//     } else {
//         document.getElementById('qtymassage').style.display = 'block';
//         $("#h1hello").text(itemPricetoqty).css('display', 'block');
//     }
// }
//
// function getAllItemSetTableArray() {
//     $("#TBodyOrder").empty()
//     for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
//         let id = defaultArrayToSecondItem[i].itemCode;
//         let price = defaultArrayToSecondItem[i].itemPrice;
//         let QTY = defaultArrayToSecondItem[i].itemQTYChoice;
//         let total = defaultArrayToSecondItem[i].totalPrice;
//         let row = `<tr>
//                      <td>${id}</td>
//                      <td>${price}</td>
//                      <td>${QTY}</td>
//                      <td>${total}</td>
//                     </tr>`;
//         $("#TBodyOrder").append(row);
//         calculateTotalPrice();
//     }
// }
//
// //purchase order
// let totalPriceSum2;
// function calculateTotalPrice() {
//     let totalPriceSum = 0;
//     for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
//         totalPriceSum += defaultArrayToSecondItem[i].totalPrice;
//     }
//     document.getElementById("lableTotPrice").innerHTML = totalPriceSum;
//     document.getElementById("lableSubTotal").innerHTML = totalPriceSum;
//     totalPriceSum2=totalPriceSum;
// }
//
// // discount
// let discount = document.getElementById("discount");
// discount.addEventListener("keyup", function (){
//     let discountValue = discount.value;
//     let discountAmount = (discountValue / 100) * totalPriceSum2;
//     let discountedPrice = totalPriceSum2 - discountAmount;
//     document.getElementById("lableSubTotal").innerHTML = discountedPrice;
//     let balance = inputCash.value-discountedPrice;
//     $("#BalanceInput").val(balance);
// });
//
// function ItemQTYLower(orderIDstor) {
//     for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
//         let defaultArrayItemCode = defaultArrayToSecondItem[i].itemCode;
//         let defaultArrayItemQTY = defaultArrayToSecondItem[i].itemQTYChoice;
//
//         for (let k = 0; k < itemDB.length; k++) {
//             let ItemCode = itemDB[k].code;
//             if (defaultArrayItemCode === ItemCode) {
//                 let itemQtyOnHand = itemDB[k].qtyOnHand;
//                 let lowQTYUpdate = itemQtyOnHand - defaultArrayItemQTY;
//
//                 itemDB[k].qtyOnHand = lowQTYUpdate;
//             }
//         }
//     }
//     setOrderValue(orderIDstor);
// }
//
//     function setOrderValue(orderIDstor) {
//     // orderDB.length=0;
//     // orderDB.orderDetails=0
//     let orderId = orderIDstor;
//     let date = $("#date").val();
//     let custId = $("#custIdSetOrder").val();
//     let discount = $("#discount").val();
//     let finalPrice = $("#lableTotPrice").text();
//     let orderDetailssss = [];
//
//
//     let order = {
//         oid: orderId,
//         date: date,
//         customerID: custId,
//         orderDetails: []
//     };
//
//     for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
//         let id = defaultArrayToSecondItem[i].itemCode;
//         let name = defaultArrayToSecondItem[i].itemName;
//         let price = defaultArrayToSecondItem[i].itemPrice;
//         let QTY = defaultArrayToSecondItem[i].itemQTYChoice;
//         let total = defaultArrayToSecondItem[i].totalPrice;
//
//         order.orderDetails.push({
//                 oid: orderId,
//                 code: id,
//                 qty: QTY,
//                 unitPrice: total
//             }
//         );
//
//         let orderDetailArrayobject = {
//             order_id: orderId,
//             item_code: id,
//             unit_price: total,
//             qty: QTY
//         }
//         orderDetailssss.push(orderDetailArrayobject);
//
//         let orderObj = {
//             order_id: orderId,
//             date: date,
//             cust_id: custId,
//             discount: discount,
//             total: finalPrice,
//             order_list: orderDetailssss
//         }
//         let jsonObj = JSON.stringify(orderObj);
//         $.ajax({
//             url: "http://localhost:8080/app/order",
//             method: "post",
//             contentType: "application/json",
//             data: jsonObj,
//             success: function (resp, textStatus, jqxhr) {
//                 alert("Order placed successfully");
//
//             },
//             error: function (jqXHR, textStatus, errorThrown) {
//                 console.log(jqXHR);
//                 alert("Something went wrong. Order not placed")
//             }
//         });
//
//
//     }
//
//     orderDB.push(order);
//     defaultArrayToSecondItem.length=0;
//     allemtyset();
// }
//
//     //get order details
//
//     // const totalArry = [];
//     // let ChoiceElement6 = document.getElementById("OrderId");
//     // ChoiceElement6.addEventListener("keyup", function () {
//     // let inputOrd = ChoiceElement6.value;
//     // $("#TBodyOrder").empty();
//     //     for (let i = 0; i < orderDB.length; i++) {
//     //         let order = orderDB[i];
//     //         if (order.oid === inputOrd) {
//     //             let orderDetails = order.orderDetails;
//     //             let totalOrderPrice = 0;
//     //
//     //             for (let j = 0; j < orderDetails.length; j++) {
//     //                 let code = orderDetails[j].code;
//     //                 let QTY = orderDetails[j].qty;
//     //                 let unitPrice = orderDetails[j].unitPrice;
//     //
//     //                 for (let k = 0; k < itemDB.length; k++) {
//     //                 let realItemid = itemDB[k].code;
//     //
//     //                     if (realItemid === code) {
//     //                         let realItemPrice = itemDB[k].unitPrice;
//     //                         let row = `<tr>
//     //                             <td>${code}</td>
//     //                             <td>${realItemPrice}</td>
//     //                             <td>${QTY}</td>
//     //                             <td>${unitPrice}</td>
//     //                         </tr>`;
//     //                         $("#TBodyOrder").append(row);
//     //                         totalOrderPrice += unitPrice;
//     //                     }
//     //                 }
//     //             }
//     //             $("#lableTotPrice").text(totalOrderPrice);
//     //             $("#lableSubTotal").text(totalOrderPrice);
//     //         }
//     //     }
//     // });
//
// //    delete table value
// $(document).ready(function () {
//     $('#clickTable').on('click', 'tr', function () {
//         var userConfirmed = confirm("Do you want to Remove ?");
//
//         if (userConfirmed) {
//             alert("Success");
//             let Itemcode = $(this).children().eq(0).text();
//
//             for (let i = 0; i < defaultArrayToSecondItem.length; i++) {
//                 if (defaultArrayToSecondItem[i].itemCode == Itemcode) {
//                     defaultArrayToSecondItem.splice(i, 1);
//                     $("#lableTotPrice").text("0");
//                     $("#lableSubTotal").text("0");
//                     getAllItemSetTableArray();
//                 }
//             }
//         } else {
//
//         }
//
//     });
// });
