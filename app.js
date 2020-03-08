// budget controller
let budgetController = (function () {

})();

// ui controller
let UIController = (function () {

  let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,// either inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: document.querySelector(DOMStrings.inputValue).value
      }
    },
    getDOMStrings: function () {
      return DOMStrings;
    }
  };

})();

//global controller
let appController = (function (budgetCtrl, UICtrl) {

  function setUpEventListeners() {
    let DOM = UICtrl.getDOMStrings();
    document.querySelector(DOM.inputBtn).addEventListener('click', controlAddItem);
    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        controlAddItem();
      }
    });
  }

  let controlAddItem = function () {
    // TODO  get input value
    let input = UICtrl.getInput();
    console.log(input);
    // TODO add item to budget controller
    // TODO add item to UI
    // TODO calculate budget
    // TODO display budget on UI
  }

  return {
    init: function() {
      setUpEventListeners();
    }
  }

})(budgetController, UIController);

appController.init();
