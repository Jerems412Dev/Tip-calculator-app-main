const bill = document.querySelector("#bill");
const billDiv = document.querySelector("#billDiv");
const nop = document.querySelector("#nop");
const custom = document.querySelector("#custom");
const amount = document.querySelector("#amount");
const total = document.querySelector("#total");
const reset = document.querySelector("#reset");
const btn = document.querySelectorAll(".btn");
const input_div = document.querySelectorAll(".input_div");
const error = document.querySelector(".error");
let tip = 0;

function removeActiveBtn() {
  btn.forEach((element) => {
    element.classList.remove("active");
  });
}

function allowResetBtn() {
  reset.removeAttribute("disabled");
}

function disableResetBtn() {
  reset.setAttribute("disabled", "disabled");
}

function isCorrect() {
  return bill.value > 0 && tip > 0 && nop.value > 0 ? true : false;
}

function calcTipAmount() {
  return ((bill.value * (tip / 100)) / nop.value).toFixed(2);
}

function calcTotal() {
  let save = bill.value / nop.value;
  save += (bill.value * (tip / 100)) / nop.value;
  return save.toFixed(2);
}

function ifIsCorrect() {
  if (isCorrect()) {
    save_amount = calcTipAmount();
    amount.innerText = convertNumber(calcTipAmount());
    total.innerText = convertNumber(calcTotal());
    allowResetBtn();
  }
}

function ResetResult() {
  amount.innerText = "0.00";
  total.innerText = "0.00";
  disableResetBtn();
}

function ResetAll() {
  bill.value = "";
  removeActiveBtn();
  nop.value = "";
  amount.innerText = "0.00";
  total.innerText = "0.00";
  custom.value = "";
  tip = 0;
  custom.value = "";
  custom.removeAttribute("disabled");
  custom.classList.remove("errorCustom");
  billDiv.classList.remove("errorBill");
}

function convertNumber(val) {
  if (val / 1000000000000000 >= 1) {
    return (val / 1000000000000000).toFixed(1) + "P";
  } else if (val / 1000000000000 >= 1) {
    return (val / 1000000000000).toFixed(1) + "T";
  } else if (val / 1000000000 >= 1) {
    return (val / 1000000000).toFixed(1) + "G";
  } else if (val / 1000000 >= 1) {
    return (val / 1000000).toFixed(1) + "M";
  } else if (val / 1000 >= 1) {
    return (val / 1000).toFixed(1) + "K";
  } else {
    return val;
  }
}

btn.forEach((element) => {
  element.addEventListener("click", function () {
    if (element.classList.contains("active")) {
      removeActiveBtn();
      custom.removeAttribute("disabled");
      tip = 0;
      ResetResult();
    } else {
      removeActiveBtn();
      tip = parseInt(element.value.slice(0, -1));
      element.classList.add("active");
      custom.value = "";
      custom.setAttribute("disabled", "disabled");
      custom.classList.remove("errorCustom");
      ifIsCorrect();
    }
  });
});

bill.addEventListener("blur", function () {
  if (bill.value <= 0) {
    billDiv.classList.add("errorBill");
    ResetResult();
  } else {
    billDiv.classList.remove("errorBill");
    ifIsCorrect();
  }
});

nop.addEventListener("blur", function () {
  if (nop.value <= 0) {
    error.innerText = "Can't be <= zero";
    input_div[1].classList.add("errorZero");
  } else {
    error.innerText = "";
    input_div[1].classList.remove("errorZero");
    ifIsCorrect();
  }
});

custom.addEventListener("blur", function () {
  if (custom.value > 0 && custom.value <= 100) {
    custom.classList.remove("errorCustom");
    tip = custom.value;
    ifIsCorrect();
  } else {
    custom.classList.add("errorCustom");
  }
});

reset.addEventListener("click", function () {
  ResetAll();
  disableResetBtn();
});
