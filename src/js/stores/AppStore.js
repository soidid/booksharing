// Store 是資料改變的地方，single source of truth，指的就是所有的狀態都應該被保存在 store
var AppDispatcher = require('../dispatcher/AppDispatcher');

// 需要 dispatcher，因為 dispatcher 廣播不同的東西，store 必須 reigster 並且決定如何處理
var AppConstants = require('../constants/AppConstants');

// 因為 store 改變之後要通知 view，所以需要有廣播的能力
var EventEmitter = require('events').EventEmitter;

// 讓 store 繼承 EventEmitter 一樣有幾種不同寫法，merge, assign 或是 jQuery 的 .$extend
var merge = require('react/lib/merge');
var assign = require('object-assign');

// store 改變之後廣播出去的內容
var CHANGE_EVENT = 'change';

var Firebase = require('firebase');


// Store 分成三個大部分：private, public, register self

//========================================================================
//
// Private vars & method

// 定義 store 需要的變數和 method，外界看不到

var _books = {};
var _selection = {};

function _create(item) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  var timestamp = new Date().getTime();
  //_books[id]= assign({}, item, {id: id});
  var ref = new Firebase('https://booksharing.firebaseio.com/books/'+id);
    ref.set(assign({}, item, {id: id, timestamp: timestamp}), function() {
       console.log("New Book Added:"+item.title);

    });
}

//利用 assign 做部分 update
//updates 為需要更新的部分, {key: value}
//assign (target, ...sources)
function _update(id, updates) {
  _books[id] = assign({}, _books[id], updates);
}

function _destroy(id) {
  //delete _books[id]
  var ref = new Firebase('https://booksharing.firebaseio.com/books/'+id);
  ref.remove();
}

function _addToSelection(item) {
  _selection[item.id] = item;
  
}

function _removeFromSelection(id) {
  delete _selection[id];
  
}

function _markSelectioinBrought(){
  for(var id in _selection){
    var ref = new Firebase('https://booksharing.firebaseio.com/books/'+id);
    ref.update({status:"in-shelf"});
    delete _selection[id];
    
  }

}

function _markSelectioinWish(){
  for(var id in _selection){
    var ref = new Firebase('https://booksharing.firebaseio.com/books/'+id);
    ref.update({status:"wish-list"});
    delete _selection[id];
    
  }

}

function _resetSelection(){
  _selection = {};

}


//========================================================================
//
// Public API 外界可以呼叫的方法

var AppStore = merge(EventEmitter.prototype, {
// assign 的寫法
// var TodoStore = assign({}, EventEmitter.prototype, {

  getBooks: function() {
    return _books;
  },

  getSelection: function() {
    return _selection;
  },
  
  //為什麼這個要定義成 public ?
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  


});

//========================================================================
//
// Load initial data

var ref = new Firebase('https://booksharing.firebaseio.com/books');
ref.on('value', function(snap) {
  var objects = snap.val();
  var items = [];
  var sorted = [];

  for(var key in objects){
    items.push(objects[key]);
  }

  sorted = items.sort(function(a,b){
    return b.timestamp - a.timestamp;
  })

  _books = sorted;
  console.log("Load data from firebase:");
  console.log(_books);
  //emit change here
  AppStore.emitChange();

});

//========================================================================
//
// event handlers

/**
 * 向 Dispatcher 註冊自已，才能偵聽到系統發出的事件
 */

AppDispatcher.register(function(action) {
  

  switch(action.actionType) {
    
    case AppConstants.BOOK_CREATE:
      title = action.item.title.trim();
      if (title !== '') {
        //用 private 方法處理，更新資料/真理
        _create(action.item);
      }
      //處理好之後廣播處去，讓 view 可以更新
      AppStore.emitChange();
      break;
    
    case AppConstants.BOOK_DESTROY:
      _destroy(action.id)
      //處理好之後廣播處去，讓 view 可以更新
      AppStore.emitChange();
      break;

    case AppConstants.BOOK_ADD_TO_SELECTION:
      _addToSelection(action.item);
      AppStore.emitChange();
      break;

    case AppConstants.BOOK_REMOVE_FROM_SELECTION:
      _removeFromSelection(action.id);
      AppStore.emitChange();
      break;

    case AppConstants.BOOK_MARK_SELECTION_BROUGHT:
      _markSelectioinBrought();
      AppStore.emitChange();
      break;

    case AppConstants.BOOK_MARK_SELECTION_WISH:
      _markSelectioinWish();
      AppStore.emitChange();
      break;

    case AppConstants.BOOK_RESET_SELECTION:
      _resetSelection();
      AppStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AppStore;
