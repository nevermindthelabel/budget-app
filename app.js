// budget controller
let budgetController = (function () {

  let Expense = function (id, description, value) {
    this.id = id,
      this.description = description,
      this.value = value
  }

  let Income = function (id, description, value) {
    this.id = id,
      this.description = description,
      this.value = value
  }

  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {

    addItem: function (type, des, val) {
      let newItem, ID;
      // create new ID
      ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

      // create new item based on type
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // push new item into array
      data.allItems[type].push(newItem);
      // return new type
      return newItem;
    }
  };

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
    init: function () {
      setUpEventListeners();
    }
  }

})(budgetController, UIController);

appController.init();
