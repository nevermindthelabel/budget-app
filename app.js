// budget controller
let budgetController = (function () {

})();

// ui controller
let UIController = (function () {

})();

//global controller
let appController = (function (budgetCtrl, UICtrl) {

  document.querySelector('.add__btn').addEventListener('click', function () { console.log('clicked')});

})(budgetController, UIController);
