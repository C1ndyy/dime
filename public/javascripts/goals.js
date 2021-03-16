//----------------------variables----------------------//
let value; //slider value

//----------------------cached variables----------------------//
let mediaQuery = window.matchMedia("(min-width: 768px)");
const monthlyIncome = document.getElementById("monthly-income");
const sliderValue = document.querySelector("#slider-value > span");
const sliderInput = document.querySelector("#sliderbar-container >input");
const goalEditIcon = document.getElementById("edit-goal");
const profileEditIcon = document.getElementById("edit-profile");
const description = document.getElementById("description");
const saveButton = document.getElementById("save");
let monthlyIncomeValue = monthlyIncome.value;

//--------------------------functions--------------------------//
function setSliderPosition() {
  let d = Number(sliderValue.innerHTML.substring(1));
  sliderInput.value = (d / monthlyIncome.value) * 100;
  // console.log("montly income:", monthlyIncome.value);
  // console.log("denominator: ", d);
  // console.log("sliderInput:", sliderInput.value);
  if (mediaQuery.matches) {
    sliderValue.style.left = sliderInput.value + "%";
  } else {
    sliderValue.style.left = sliderInput.value * 0.85 + "%";
  }
}

function enableGoalEdit() {
  monthlyIncome.removeAttribute("disabled");
  sliderInput.removeAttribute("disabled");
  saveButton.removeAttribute("disabled");
  description.removeAttribute("disabled");
}

setSliderPosition();
//----------------------event listeners----------------------//

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

goalEditIcon.addEventListener("click", function (e) {
  enableGoalEdit();
});
