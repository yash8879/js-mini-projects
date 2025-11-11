const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.value;

    if (value === "C") {
      display.value = "";
    } else if (value === "=") {
      display.value = eval(display.value);
    } else {
      display.value += value;
    }
  });
});
