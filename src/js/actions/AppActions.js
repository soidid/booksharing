var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
/**
 * 這是一個 singleton 物件
 */
var AppActions = {

  create: function(item) {

    //定義每個 action 要送出去的資料
    AppDispatcher.dispatch({

      //actionType 要和 TodoContants 定義的一致
      actionType: AppConstants.BOOK_CREATE,
      //如果需要其他資料就寫在這裡
      item: item
    });
  },

  update: function(item) {

    //定義每個 action 要送出去的資料
    AppDispatcher.dispatch({
      //actionType 要和 TodoContants 定義的一致
      actionType: AppConstants.BOOK_UPDATE,
      item: item
    });
  },

  destroy: function(id) {

    //定義每個 action 要送出去的資料
    AppDispatcher.dispatch({

      //actionType 要和 TodoContants 定義的一致
      actionType: AppConstants.BOOK_DESTROY,
      //如果需要其他資料就寫在這裡
      id: id
    });
  },

  destroySelection: function() {

    AppDispatcher.dispatch({
      actionType: AppConstants.BOOK_DESTROY_SELECTION
    });
  },

  addToSelection (item){
    AppDispatcher.dispatch({
      actionType: AppConstants.BOOK_ADD_TO_SELECTION,
      item: item
    });

  },

  removeFromSelection (id){
    AppDispatcher.dispatch({

      //actionType 要和 TodoContants 定義的一致
      actionType: AppConstants.BOOK_REMOVE_FROM_SELECTION,
      //如果需要其他資料就寫在這裡
      id: id
    });

  },

  resetSelection () {
    AppDispatcher.dispatch({
        actionType: AppConstants.BOOK_RESET_SELECTION
      
    });

  }

};

module.exports = AppActions;
