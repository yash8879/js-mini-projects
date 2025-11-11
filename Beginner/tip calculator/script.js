let billInput = document.getElementById("bill-input");
let tipInput = document.getElementById("tip-input");
let result = document.getElementById("result");

let calculate = document.getElementById("calculate-btn");

calculate.addEventListener("click", function () {
  let bill = Number(billInput.value);
  let tipPercent = Number(tipInput.value);

  if(bill <= 0 || isNaN(bill) || tipPercent < 0 || isNaN(tipPercent)){
    result.innerText = "❌ Please enter valid positive numbers!"
    return
  }

  let tipAmount = (bill * tipPercent) / 100;
  let total = bill + tipAmount;



 result.innerHTML = `💸 Tip: ₹${tipAmount.toFixed(2)} <br> 🧾 Total: ₹${total.toFixed(2)}`;

  billInput.value = ""
  tipInput.value = ""
});
