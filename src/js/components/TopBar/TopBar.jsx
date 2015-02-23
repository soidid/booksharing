/** @jsx React.DOM */

var React = require('react/addons');
var SearchBar = require('../SearchBar/SearchBar.jsx');

require('./TopBar.css');

var TopBar = React.createClass({
  
  getInitialState(){
    return {}
  },
  
  render () {
    var count = Object.keys(this.props.selection).length;
    var terms = (count > 1) ? "books" : "book";

  	return (count > 0) ? 
   
    <div className="TopBar">
      <div>
          {count} {terms} selected
          <div className="TopBar-back"
               onClick={this.props.handleReset}> ←Back</div>
      </div>
    
      <div className="TopBar-action">刪除</div>
      <div className="TopBar-action"
           onClick={this.props.handleBrought}>標示為「已購買」</div>
      <div className="TopBar-action"
           onClick={this.props.handleWish}>標示為「預購清單」</div>
    </div>
    
    :
    <SearchBar handleChange={this.props.hanldeSearchTextChange} 
               value={this.props.searchText}/>;
  }
});

module.exports = TopBar;


