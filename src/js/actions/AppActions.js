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
  }

};

module.exports = AppActions;
