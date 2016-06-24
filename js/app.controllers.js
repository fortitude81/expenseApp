app.controller('ExpenseController', ['expenseService', '$filter',
    function(expenseService, $filter) {
        var ctrl = this;
        ctrl.expense = {};
        
        ctrl.expenseList = expenseService.getExpenses(); //get expense details and store in controller scope
        ctrl.resetExpense = _.clone(ctrl.expense);  // get clone of default form
        ctrl.dateFormat = 'dd/MM/yyyy';  //date format
        /*method to add expense in expense data*/
        ctrl.addExpense = function(){
            var isCompleted = false;
            // check for edit mode
            if(ctrl.editMode){
                ctrl.expenseList = expenseService.updateExpense(ctrl.expense, ctrl.expense.itemId); //update the previous data
                ctrl.editMode = false;  //set edit mode as false
            } else{
                ctrl.expenseList = expenseService.saveExpense(ctrl.expense);  // save a new expense
            }
            ctrl.expense = _.clone(ctrl.resetExpense); //reset the form to default
        };
        /*method to edit the selected expense in expense data*/
        ctrl.editExpense = function (expense) {
            ctrl.editMode = true;  //set edit mode as true
            _.extend(ctrl.expense, expense);  // get the selected record and set in form fields
            ctrl.expense.date = $filter('date')(ctrl.expense.date, ctrl.dateFormat);  //convert date to string format
        };
        /*method to delete the selected expense from expense data*/
        ctrl.deleteExpense = function (itemId) {
            // ask for confirmation
            var deleteExpense = confirm("Do you want to Delete the selected expense?");
            if(deleteExpense){
                expenseService.removeExpense(itemId); // remove the selected item form expense data
            }
        };
        ctrl.reimbursedExpense = function() {

        }
        /*method to sort the records based on dates*/
        ctrl.orderByDate = function(item) {
            var date = $filter('date')(item.date, ctrl.dateFormat);
            var parts = date.split('/'); // we know the date format is dd/MM/yyyy
            var number = parseInt(parts[2] + parts[1] + parts[0]);
            return -number;
        };
    }
]);
//login auth
app.controller('loginCtrl', function($scope, $location, $rootScope) {
  $scope.submit = function() {

    if($scope.username == 'demo' && $scope.password == 'demo') {
      $rootScope.loggedIn = true;
      $location.path('/expenses');
    } else {
      alert('Wrong Stuff');
    }
  };
});
