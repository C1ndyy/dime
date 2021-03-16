//----------------------variables----------------------//
let value; //slider value

//----------------------cached variables----------------------//
let mediaQuery = window.matchMedia("(min-width: 768px)");
const monthlyIncome = document.getElementById("monthly-income");
const sliderValue = document.querySelector("#slider-value > span");
const sliderInput = document.querySelector("#sliderbar-container >input");

//--------------------------functions--------------------------//
function setSliderPosition() {
  let d = Number(sliderValue.innerHTML.substring(1));
  sliderInput.value = monthlyIncome.value / d;
  if (mediaQuery.matches) {
    sliderValue.style.left = sliderInput.value + "%";
  } else {
    sliderValue.style.left = sliderInput.value * 0.85 + "%";
  }
}

setSliderPosition();
//----------------------event listeners----------------------//
let montlyIncomeValue;
monthlyIncome.addEventListener("change", function (e) {
  monthlyIncomeValue = e.target.value;
  monthlyIncomeValue != null
    ? sliderInput.removeAttribute("disabled")
    : sliderInput.addAttribute("disabled");
});

sliderInput.addEventListener("input", function (e) {
  document.activeElement.blur();
  value = e.target.value;
  let newSliderValueString = ((value / 100) * monthlyIncomeValue).toFixed(2);
  sliderValue.textContent = `$ ${newSliderValueString}`;

  if (mediaQuery.matches) {
    sliderValue.style.left = value + "%";
  } else {
    sliderValue.style.left = value * 0.85 + "%";
  }
});
