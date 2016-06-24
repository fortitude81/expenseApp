app.factory('expenseService', function() {
    var expenseData = [], count = 0;
    return {
        saveExpense: function(expense){
            expense.itemId = count = count + 1;
            expenseData.push(expense) ;
            return expenseData;
        },
        getExpenses: function() {
            return expenseData;
        },
        updateExpense: function(expense, itemID){
            _.each(expenseData, function(value, key){
                if(value.itemId == itemID) {
                    expenseData[key] = expense;
                }
            });
            return expenseData;
        },
        removeExpense: function (itemID) {
            _.each(expenseData, function(value, key){
                if(value.itemId == itemID){
                    expenseData.splice(key, 1);
                    return;
                }
            })
        }
    }
});
