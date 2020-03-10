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

  let calculateTotal = function (type) {
    let sum = 0;
    data.allItems[type].forEach(function (current) {
      sum += current.value;
    });
    data.totals[type] = sum;
  };

  let data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {

    addItem: function (type, des, val) {
      let newItem, ID;
      // create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

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
    },
    calculateBudget: function () {
      // calc total income & expenses
      calculateTotal('exp');
      calculateTotal('inc');
      // calc income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // calc % of total expense
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = - 1;
      }
    },
    getBudget: function () {
      return {
        budget: data.budget,
        totalIncome: data.totals.inc,
        totalExpense: data.totals.exp,
        percentage: data.percentage
      }
    },
    testing: function () {
      console.log(data);
    }
  };

})();

// ui controller
let UIController = (function () {

  let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expenseLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage'
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,// either inc or exp
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
      }
    },
    addListItem: function (obj, type) {
      // create HTML string
      let html;
      let element;
      if (type === 'inc') {
        element = DOMStrings.incomeContainer;
        html =
          `<div class="item clearfix" id="income-${obj.id}">
             <div class="item__description">${obj.description}</div>
               <div class="right clearfix">
                 <div class="item__value">${obj.value}</div>
                   <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                 </div>
              </div>
           </div>`;
      } else {
        element = DOMStrings.expenseContainer;
        html =
          `<div class="item clearfix" id="expense-${obj.id}">
             <div class="item__description">${obj.description}</div>
               <div class="right clearfix">
                 <div class="item__value">${obj.value}</div>
                   <div class="item__percentage">21%</div>
                     <div class="item__delete">
                       <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                     </div>
                   </div>
           </div>`;
      }
      // insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', html)
    },
    clearFields: function () {
      let fields = document.querySelectorAll(`${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`);
      let fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach(function (current) {
        current.value = '';
      });
      fieldsArray[0].focus();
    },
    displayBudget: function (obj) {
      document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExp;
      document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;
    },
    getDOMStrings: function () {
      return DOMStrings;
    }
  };

})();

// global controller
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

  let updateBudget = function () {
    // calculate budget
    budgetController.calculateBudget();
    // return budget
    let budget = budgetController.getBudget();
    // TODO display budget on UI
   UIController.displayBudget(budget);
  };

  let controlAddItem = function () {
    // get input value
    let input = UICtrl.getInput();
    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // add item to budget controller
      let newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // add item to UI
      UICtrl.addListItem(newItem, input.type);
      // clear input fields
      UICtrl.clearFields();
      // calc & update budget
      updateBudget();
    }
  }

  return {
    init: function () {
      setUpEventListeners();
    }
  }

})(budgetController, UIController);

appController.init();
