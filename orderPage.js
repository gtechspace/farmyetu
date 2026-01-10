let firstName = document.querySelector("#first")
let lastName = document.querySelector("#last")
let phone = document.querySelector("#phone")
let address = document.querySelector("#street")
let city = document.querySelector("#city")
let county = document.querySelector("#county")

//retrieve customer order from cart page
  let customerOrder = JSON.parse(localStorage.getItem("order"))
  console.log(customerOrder)

  let items = localStorage.getItem("order")
  console.log(items) 

let submitOrder = document.querySelector("#submit-order")

//get the total amount to add to the whatsapp order
let amt = customerOrder.map(order => order.total)
let finalTtl = amt.pop()
console.log(finalTtl)

submitOrder.addEventListener("click", () => {

  //create order message consisting of customer details and customer order
  const orderMessage = `
        
        First Name: ${firstName.value}
        Last Name: ${lastName.value}
        Phone: ${phone.value}
        Address: ${address.value}
        City: ${city.value}
        County: ${county.value}
        Customer Order: ${items}
        Total: ${finalTtl}
        `

        // Product Name: ${customerOrder.productName}
        // Quantity: ${customerOrder.quantity}
        // Total: ${customerOrder.total}
  const message = encodeURIComponent(orderMessage)
  const businessNumber = "254704343638"
  const whatsappUrl = `https://wa.me/${businessNumber}?text=${message}`

  window.open(whatsappUrl, '_blank')
})

//get the total amount and render it in the span element for total amount
const totalAmount = document.querySelector("#total-amount")
let amount = customerOrder.map(order => order.total)
let finalTotal = amount.pop()

totalAmount.innerHTML = `<b>KES ${finalTotal}</b>`
//map array to get the total
// let amt = customerOrder.map(order => {

// })


//post customer's number in the backend
let customerNumber = document.querySelector("#mpesaNumber")
console.log(customerOrder.total)

const placeOrder = document.querySelector("#place-order")
//rectify amount since the data is in an array
placeOrder.addEventListener("click", async () => {
  const requestBody = {
      phoneNumber: customerNumber.value,
      amount: finalTtl
  }

  const response = await fetch("http://localhost:5000/api/stkpush", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }, 
    body: JSON.stringify(requestBody)
  })

  if(!response.ok){
      alert("Payment error")
      console.log(`HTTP SERVER ERROR, ${response.status}`)
  }

  const responseData = await response.json()
  alert("Payment successful")
  return responseData
})

//instasend payment button
/* const payment = new window.IntaSend({
  // Replace with your Publishable Key
  publicAPIKey: "ISPubKey_live_46ed9741-8ce4-43eb-8ffe-c81c5af3b9c1",
  live: true //set to true when going live
})
.on("COMPLETE", (results) => {console.log("Do something on success", results)})
.on("FAILED", (results) => {console.log("Do something on failure", results)})
.on("IN-PROGRESS", (results) => {console.log("Payment in progress status", results)}) */

//kcb buni mpesa stkpush
// async function getAccessToken() {
//   const consumerKey = "NHDpZUxhNRDd_WKgMIEIrJ2mB50a";
//   const consumerSecret = "pyPOVGZlTW1fmElJY9vW0PJOh4ka";
//   const credentials = btoa(`${consumerKey}:${consumerSecret}`);

//   try {
//     const response = await fetch("https://uat.buni.kcbgroup.com/token?grant_type=client_credentials", {
//       method: "POST",
//       headers: {
//         "Authorization": `Basic ${credentials}`,
//         "Content-Type": "application/x-www-form-urlencoded"
//       }
//     });

//     const data = await response.json();
//     console.log(data)

//     return data.access_token;
//   } catch (error) {
//     console.error("Token generation failed:", error);
//     throw error;
//   }
// }

// //get place-order button and add an event listener to trigger an stk push
// const placeOrder = document.querySelector("#place-order")
// placeOrder.addEventListener("click", async () => {
//   try {
//     const token = await getAccessToken();

//     // System-generated values
//     const messageId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

//     const requestBody = {
//       "phoneNumber": "254704343638",
//       "amount": "100",
//       "invoiceNumber": "1168077192",
//       "sharedShortCode": true,
//       "orgShortCode": "522522",
//       "orgPassKey": "",
//       "callbackUrl": "http://x3piv7-ip-196-250-215-152.tunnelmole.net/callback",
//       "transactionDescription": "Payment for Order"
//     }

//     const response = await fetch("https://buni.kcbgroup.com/mm/api/request/1.0.0/stkpush", {
//       method: "POST",
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//         "messageId": messageId,
//         "operation": "STKPush",
//         "routeCode": "207"
//       },
//       body: JSON.stringify(requestBody)
//     })

//     if (!response.ok) {
//       console.log(`HTTP SERVER ERROR, ${response.status}`)
//     }

//     const responseData = await response.json()
//     console.log(responseData)

//     return responseData

//   } catch (error) {
//     console.log('Error', error)
//   }

// })