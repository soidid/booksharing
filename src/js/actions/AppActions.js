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

  destroy: function(id) {

    //定義每個 action 要送出去的資料
    AppDispatcher.dispatch({

      //actionType 要和 TodoContants 定義的一致
      actionType: AppConstants.BOOK_DESTROY,
      //如果需要其他資料就寫在這裡
      id: id
    });
  },

  addToSelection (item){
    AppDispatcher.dispatch({

      //actionType 要和 TodoContants 定義的一致
      actionType: AppConstants.BOOK_ADD_TO_SELECTION,
      //如果需要其他資料就寫在這裡
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

  markSelectionBrought () {
    AppDispatcher.dispatch({
        actionType: AppConstants.BOOK_MARK_SELECTION_BROUGHT
      
    });

  },

  markSelectionWish () {
    AppDispatcher.dispatch({
        actionType: AppConstants.BOOK_MARK_SELECTION_WISH
      
    });
  },

  resetSelection () {
    AppDispatcher.dispatch({
        actionType: AppConstants.BOOK_RESET_SELECTION
      
    });

  }

};

module.exports = AppActions;
