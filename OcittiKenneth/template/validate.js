let shippingMethod = "";

// function ValidData to validate data
function ValidData(e) {

    // A variable to check for any error in the input fields

    let validationPassed = true;
    // customerId specificayion
    const customerId = document.getElementById("customer_id");
    const checkId = /^[0-9]+$/

    if (!checkId.test(customerId.value)) {
        document.getElementById("spanID").innerHTML = "ID is Required";
        validationPassed = false;
    } else {
        document.getElementById("spanID").innerHTML = "";
        customerId.style.border = "1px solid green";
    }

    // validating name and providing appropiate input type
    const nameInput = document.getElementById("name_id");
    const forName = /^[A-Za-z\s]+$/;

    if (!forName.test(nameInput.value)) {
        document.getElementById("span_name").innerHTML = 'Name Cannot be missing';
        nameInput.style.border = '1px solid red';
        validationPassed = false;

    } else {
        document.getElementById("span_name").innerHTML = '';
        nameInput.style.border = '1px solid green';
    }

    // state specification
    const stateInput = document.getElementById("state");
    const checkState = /^[A-Za-z\s]+$/;

    if (!checkState.test(stateInput.value) || stateInput.value.length >= 4 || stateInput.value.length <= 2) {
        document.getElementById("span_state").innerHTML = "Enter three characters";
        stateInput.style.border = "1px solid red";
        validationPassed = false;

    } else {
        document.getElementById("span_state").innerHTML = "";
        stateInput.style.border = "1px solid green";
    }

    // part number validation
    const partNumber = document.getElementById("partNumber");
    const checkNumber = /^[0-9\s]+$/;

    if (!checkNumber.test(partNumber.value)) {
        document.getElementById("partSpan").innerHTML = "Part Number is Required";
        partNumber.style.border = "1px solid red";
        validationPassed = false;

    } else {
        document.getElementById("partSpan").innerHTML = "";
        partNumber.style.border = "1px solid green";
    };

    // validation for description according to the input type
    const description = document.getElementById("describe");
    const checkDesc = /^[A-Za-z\s]+$/;

    if (!checkDesc.test(description.value)) {
        document.getElementById("descSpan").innerHTML = "Description cannot be missing";
        description.style.border = '1px solid red';
        validationPassed = false;

    } else {
        document.getElementById("descSpan").innerHTML = "";
        description.style.border = "1px solid green";
    }

    // price Per Part validation
    const pricePerPart = document.getElementById("price");
    const checkPrice = /^[0-9\.\s]+$/;

    if (!checkPrice.test(pricePerPart.value)) {
        document.getElementById("priceSpan").innerHTML = "Atleast one digit";
        pricePerPart.style.border = "1px solid red";
        validationPassed = false;

    } else {
        document.getElementById("priceSpan").innerHTML = "";
        pricePerPart.style.border = "1px solid green";
    }

    // Quantity input validation
    const quantityInput = document.getElementById("quantity");
    const checkQty = /^[0-9\s]+$/;

    if (!checkQty.test(quantityInput.value) || quantityInput.value.length <= 0) {
        document.getElementById("qtySpan").innerHTML = "Must be greater 0";
        quantity.style.border = "1px solid red";
        validationPassed = false;

    } else {
        document.getElementById("qtySpan").innerHTML = "";
        quantityInput.style.border = "1px solid green";
    }

    /*A condition for checking if all the conditions above are passed then the cost,saleTax,
    shipping and handling and total should be displayed. And setting their values in to localStorage*/


    if (validationPassed) {
        const price = document.querySelector(".price").value;
        const quantity = document.querySelector(".quantity").value;
        let cost = price * quantity;
        const costField = document.querySelector(".cost");
        if (document.querySelector(".oversize").checked) {
            cost = cost + 5;
        }
        costField.value = `$ ${cost}`;
        const taxValue = saleTax(cost);
        const shippingCost = shippingHandling();
        const totalCost = (cost + taxValue + shippingCost).toFixed(2);
        document.querySelector(".total-cost").value = `$ ${totalCost}`;

    }
    return true
}
// Dynamically capitalizing input values in state 

document.querySelector(".region").addEventListener("keyup", () => {
    let valueOfRegion = document.querySelector(".region").value.toUpperCase();
    document.querySelector(".region").value = valueOfRegion;

})


/*function SaleTax to compute the amount of
sales tax*/

const saleTax = (cost) => {
    let taxPercentage = 0;
    const regionName = document.querySelector(".region").value;
    const retail_customer = document.getElementById("retailCustomer");
    if (regionName === "KLA" && retail_customer.checked) {
        taxPercentage = 0.1;
    } else if (regionName === "MBR" && retail_customer.checked || regionName === "EBB" && retail_customer.checked) {
        taxPercentage = 0.05;
    } else {
        taxPercentage = 0;
    }
    const taxValue = taxPercentage * cost;
    document.querySelector(".tax").value = taxValue.toFixed(2);
    return taxValue;
}


/*function ShippingHandling to compute the
charge for both shipping and handling of an order*/

const shippingHandling = () => {
    let shipping = 0;
    const quantity = document.querySelector(".quantity").value;
    if (document.querySelector(".ups").checked) {
        shipping = quantity * 7;
        shippingMethod = "UPS";
    } else if (document.querySelector(".fedExGround").checked) {
        shipping = quantity * 8.5;
        shippingMethod = "Fed Ex Ground";
    } else if (document.querySelector(".portal").checked) {
        shipping = quantity * 9.25;
        shippingMethod = "US Portal Air";
    } else if (document.querySelector(".fedExAir").checked) {
        shipping = quantity * 12;
        shippingMethod = "Fed Ex Air";
    }

    document.querySelector(".shipping-handling").value = shipping;
    return shipping;
}

// document.querySelector("#exit").addEventListener("click", () => {
//     document.write("");
// });

function closeWindow() {
    if (confirm("Do you want to close?")) {
        close();
    }
}