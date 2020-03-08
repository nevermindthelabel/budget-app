// budget controller
let budgetController = (function () {

})();

// ui controller
let UIController = (function () {

  let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,// either inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      }
    }
  }

})();

//global controller
let appController = (function (budgetCtrl, UICtrl) {

  let controlAddItem = function () {
    // TODO  get input value
    let input = UICtrl.getInput();
    console.log(input);
    // TODO add item to budget controller
    // TODO add item to UI
    // TODO calculate budget
    // TODO display budget on UI
  }

  document.querySelector('.add__btn').addEventListener('click', controlAddItem);

  document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      controlAddItem();
    }
  });

})(budgetController, UIController);


