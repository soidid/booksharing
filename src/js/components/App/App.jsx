/** @jsx React.DOM */

var React = require('react/addons');
var List = require('../List/List.jsx');

var Composer = require('../Composer/Composer.jsx');
var TopBar = require('../TopBar/TopBar.jsx');

var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');


var Firebase = require('firebase');

require('./App.css');

function getSelection(){
  return AppStore.getSelection();
}
var App = React.createClass({
  
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState(){
    return {
    	showFocus: false,
    	focusItem: {},
    	searchText: "",
      books: [],
      selection: getSelection()
    }
  },
  
  loadData () {
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

      this.setState({
        books: sorted
      });

    }.bind(this));
  },

  //把 view 註冊到 stores，當 store 有改變/emit change 的時候，用 _onChange 這個 callback 處理
  componentDidMount () {
    //Should loadData in AppStore
    this.loadData();
    AppStore.addChangeListener(this._onChange);
    
  },
  
  componentWillUnmount () {
    AppStore.removeChangeListener(this._onChange);
  },

  _onClick (i, event) {
  	//console.log(i);
    this.setState({
    	showFocus: !this.state.showFocus,
    	focusItem: i
    })
  },

  _onChange (){
      this.loadData();
      this.setState({
        selection: getSelection()
      });
      console.log("on change");
      console.log(this.state.selection);
  },

  _onSelect(item, event){
    console.log(item);
    event.stopPropagation();
    
    if(event.target.checked){
      AppActions.addToSelection(item);
    
    }else{
      AppActions.removeFromSelection(item.id);

    }

    this.setState({
        selection: getSelection()
    });

    console.log(this.state.selection);

  },

  _onSearchTextChange (event){
    this.setState({
        searchText: event.target.value
    });
        
  },

  _markBrought (){
    AppActions.markSelectionBrought();
  },

  _markWish (){
    AppActions.markSelectionWish();
  },

  _resetSelection (){
    AppActions.resetSelection();
  },

 
  render () {
  	var focusListClass = this.state.showFocus ? "defaultHide-show":"defaultHide";
    var selectedCount = Object.keys(this.state.selection).length || 0;
    
    return (
      <div className="App">

        <div className="App-title">Share books with your community </div>
        
        <TopBar selection={this.state.selection}
                handleBrought={this._markBrought}
                handleWish={this._markWish}
                handleReset={this._resetSelection}
                hanldeSearchTextChange={this._onSearchTextChange}
                searchText={this.state.searchText} />

        <List type={focusListClass}
              data={this.state.focusItem}
              handleClick={this._onClick} />
        
        
        <List type="basic" 
              data={this.state.books} 
              searchText={this.state.searchText}
              handleClick={this._onClick}
              handleSelect={this._onSelect}
              selection={this.state.selection}  />

        <Composer />

      </div>
    );
  }
});

module.exports = App;


