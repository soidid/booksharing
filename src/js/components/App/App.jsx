/** @jsx React.DOM */

var React = require('react/addons');
var List = require('../List/List.jsx');

var Composer = require('../Composer/Composer.jsx');
var TopBar = require('../TopBar/TopBar.jsx');

var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');

require('./App.css');

function getBooks(){
  return AppStore.getBooks();
}

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
      books: getBooks(),
      selection: getSelection()
    }
  },
  
  //把 view 註冊到 stores，當 store 有改變/emit change 的時候，用 _onChange 這個 callback 處理
  componentDidMount () {
    
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
      this.setState({
        books: getBooks(),
        selection: getSelection()
      });
  },

  _onSelect(item, event){
    console.log(item);
    event.stopPropagation();
    
    var selection = Object.keys(this.state.selection);
    if(selection.indexOf(item.id)===-1){
      AppActions.addToSelection(item);
    
    }else{
      AppActions.removeFromSelection(item.id);

    }

    this.setState({
        selection: getSelection()
    });

    //console.log(this.state.selection);

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


