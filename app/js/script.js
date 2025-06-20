// INFORMATIONS START!
// Clear button.
const clearBtn = document.getElementById("clearBtn");
// Mortgage amount.
const amountInput = document.getElementById("amountValue");
// Mortgage term.
const  termInput = document.getElementById("termValue");
// Mortgage rate.
const rateInput = document.getElementById("rateValue");
// Mortgage type.
const form = document.getElementById("typeForm");
// Calculate Repayments button.
const submitBtn = document.getElementById("calculateBtn");
// INFORMATIONS END!


// ERRORS START!
// Div for the error.
const errorDiv = document.querySelectorAll(".mortgage__div")
// Input icons for the error.
const errorIcon = document.querySelectorAll(".mortgage__icon");
// Error messages.
const errorMessage = document.querySelectorAll(".mortgage__error");
// ERRORS END!


// RESULT START!
// Empty template.
const empty = document.querySelector(".empty");
// Complete template.
const complete = document.querySelector(".complete");
// Repayment template.
const repayment = document.getElementById("repayment");
// Interest template.
const interest = document.getElementById("interest");
// Result mortgage amount.
const payments = document.querySelector(".complete__amount");
// Totat Mortgage Amount.
const totalAmount = document.querySelector(".complete__totalAmount");
// RESULT END!
const comma = new Intl.NumberFormat('en-GB', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Variable to check if we can submit
const submit = [false, false, false, false];
// Functions to show and hide errors.
function showError (num) {
    if (num === 3){
        errorMessage[num].style.display = "block";
    }
    else{
        errorIcon[num].style.backgroundColor = "var(--red)";
        errorIcon[num].style.color = "var(--white)";
        errorDiv[num].style.border = "2px solid var(--red)";
        errorMessage[num].style.display ="block";
    }
}

function hideError (num) {
    if(num === 3){
     errorMessage[num].style.display = "none";
    }
    else{
        errorIcon[num].style.backgroundColor = "var(--background)";
        errorIcon[num].style.color = "var(--text-label)";
        errorDiv[num].style.border = "1px solid var(--clearBtn)";
        errorMessage[num].style.display ="none";
    }
}

// Event Listener for the clear button.
clearBtn.addEventListener("click",() => {
    amountInput.value = "";
    termInput.value = "";
    rateInput.value = "";
    form.reset();
    empty.style.display = "flex";
        complete.style.display = "none";
    for (let i = 0; i <= 3; i++){
        hideError(i);
    } 

})

// Fuction to validate inputs.
function validateInput (input, num){
   let inputRegex = /^(?!0*(\.0+)?$)\d+(\.\d+)?$/;
    if(!inputRegex.test(input) || !input){
        showError(num);
        submit[num] = false;
    }else{
        hideError(num);
        submit[num] = true;
    }
}
function validateType(){
    let type = document.querySelector("input[name=type]:checked")?.value;
    if(type === "1" || type === "2"){
        hideError(3);
        submit[3] = true;
        return type;
    }else{
        showError(3);
        submit[3] = false; 
        return null;
    }
}
// Event Listener for real time check.
amountInput.addEventListener('input', () => {
    validateInput(amountInput.value, 0);
})
termInput.addEventListener('input', () => {
    validateInput(termInput.value, 1);
})
rateInput.addEventListener('input', () => {
    validateInput(rateInput.value, 2);
})
form.addEventListener('change', () => {
    validateType();
})

// Functions to calculate the repayment and  interest
function repaymentCalculator(amount, term, rate) {
  const monthlyRate = (rate / 12) / 100;
  const n = term * 12;

  const monthlyPayment =
    amount * (monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1);

  const total = monthlyPayment * n;
  const totalInterest = total - amount;

  // Format and insert the values with £ and commas
  payments.textContent = `£${comma.format(monthlyPayment)}`;
  totalAmount.textContent = `£${comma.format(total)}`;
  interest.textContent = `£${comma.format(totalInterest)}`;
}




//Event Listener for the submit button.
submitBtn.addEventListener('click', () => {
    validateInput(amountInput.value,0);
    validateInput(termInput.value, 1);
    validateInput(rateInput.value, 2);
    let type1 = validateType();
    console.log(type1)
    if(!submit.includes(false)){
        empty.style.display = "none";
        complete.style.display = "flex";
        repaymentCalculator(amountInput.valueAsNumber, termInput.valueAsNumber, rateInput.valueAsNumber);
        if(type1 === "1"){
            repayment.style.display = 'block';
            interest.style.display = 'none';
        }
        else if(type1 === "2"){
            repayment.style.display = "none";
            interest.style.display = 'block';
        }
    }

})