// budget controller
let budgetController = (function () {

})();

// ui controller
let UIController = (function () {

})();

//global controller
let appController = (function (budgetCtrl, UICtrl) {

  document.querySelector('.add__btn').addEventListener('click', function () {
    // TODO  get input value
    // TODO add item to budget controller
    // TODO add item to UI
    // TODO calculate budget
    // TODO display budget on UI
  });

  document.addEventListener('keypress', function (event) {
    if (event.keyCode === 13 || event.which === 13)
    console.log('Enter was pressed')
  });

})(budgetController, UIController);


