// budget controller
let budgetController = (function () {

  let Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  let Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

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
    deleteItem: function (type, id) {
      let ids = data.allItems[type].map(function (current) {
        return current.id
      });

      let index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
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
    calculatePercentages: function () {
      data.allItems.exp.forEach(function (current) {
        current.calcPercentage(data.totals.inc);
      });
    },
    getPercentages: function () {
      let allPercentages = data.allItems.exp.map(function (current) {
        return current.getPercentage();
      });
      return allPercentages;
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
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expPercLabel: 'item__percentage'
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
          `<div class="item clearfix" id="inc-${obj.id}">
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
          `<div class="item clearfix" id="exp-${obj.id}">
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
    deleteListItem: function (selectorId) {
      let el = document.getElementById(selectorId);
      el.parentNode.removeChild(el);
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
      document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalIncome;
      document.querySelector(DOMStrings.expenseLabel).textContent = obj.totalExpense;

      if (obj.percentage > 0) {
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
      } else {
        document.querySelector(DOMStrings.percentageLabel).textContent = '---';
      }

    },
    displayPercentages: function (percentages) {
      let fields = document.querySelectorAll(DOMStrings.expPercLabel);
      let nodeListForEach = function (list, callback) {
        for (let i = 0; i < list.length; i++) {
          callback(list[i], i);
        }
      }
      nodeListForEach(fields, function (current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%'
        } else {
          current.textContent = '---'
        }
      });
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

    document.querySelector(DOM.container).addEventListener('click', controlDeleteItem)

  }

  let updateBudget = function () {
    // calculate budget
    budgetController.calculateBudget();
    // return budget
    let budget = budgetController.getBudget();
    // display budget on UI
    UIController.displayBudget(budget);
  };

  let updatePercentages = function () {
    // TODO calculate percentages
    budgetController.calculatePercentages();
    // TODO read percentages from budget controller
    let percentages = budgetController.getPercentages();
    // TODO update UI
    console.log(percentages);
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
      // calc & update percentages
      updatePercentages();
    }
  };

  let controlDeleteItem = function (event) {

    let itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemId) {
      // get html id attribute and split into array
      let splitId = itemId.split('-');
      // get type inc || exp
      let type = splitId[0];
      // store id in variable
      let id = parseInt(splitId[1]);
      // delete item from data
      budgetController.deleteItem(type, id);
      // remove item from DOM
      UIController.deleteListItem(itemId);
      // update and show new budget
      updateBudget();
      // calc & update percentages
      updatePercentages();
    }
  };

  return {
    init: function () {
      UIController.displayBudget({
        budget: 0,
        totalIncome: 0,
        totalExpense: 0,
        percentage: -1
      });
      setUpEventListeners();
    }
  }

})(budgetController, UIController);

appController.init();
