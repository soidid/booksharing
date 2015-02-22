/** @jsx React.DOM */

var React = require('react/addons');
var List = require('../List/List.jsx');
var SearchBar = require('../SearchBar/SearchBar.jsx');
var Composer = require('../Composer/Composer.jsx');

var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');

require('./App.css');


function getBooks() {
  
  return AppStore.getAll();
}

var App = React.createClass({
  
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState(){
    return {
    	showFocus: false,
    	focusItem: {},
    	searchText: "",
      books: getBooks()
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
        books: getBooks()
      });
  },

  _onSearchTextChange (event){
    this.setState({
        searchText: event.target.value
    });
        
  },

 
  render () {
  	var focusListClass = this.state.showFocus ? "defaultHide-show":"defaultHide";
    
    return (
      <div className="App">
        <div className="App-title">Share books with your community </div>
        <SearchBar handleChange={this._onSearchTextChange} 
                   value={this.state.searchText}/>
        
        <List type={focusListClass}
              data={this.state.focusItem}
              handleClick={this._onClick} />

        <List type="basic" 
              data={this.state.books} 
              handleClick={this._onClick}
              searchText={this.state.searchText}  />

        <Composer />

      </div>
    );
  }
});

module.exports = App;


