/** @jsx React.DOM */

var React = require('react/addons');
var SearchBar = require('../SearchBar/SearchBar.jsx');
var AppActions = require('../../actions/AppActions');

require('./TopBar.css');

var TopBar = React.createClass({
  
  getInitialState(){
    return {
      
    }
  },

  _onUpdate() {
    
    var status = this.refs.status.getDOMNode().value;

    if(status === 'in-shelf'){
      AppActions.update(
      {
        status: status,
        owner: this.refs.person.getDOMNode().value
        
      });

    }else{
      AppActions.update(
      {
        status: status,
        wishedBy: this.refs.person.getDOMNode().value
      });

    }
    

  },
  _onDelete() {
    
    AppActions.destroySelection();
  
  },
  render () {
    var count = Object.keys(this.props.selection).length;
    var terms = (count > 1) ? "books" : "book";

  	return (count > 0) ? 
   
    <div className="TopBar">
      <div>
          <div className="TopBar-count">{count} {terms} selected</div>
          <div className="TopBar-back"
               onClick={this.props.handleReset}>X 取消</div>
      </div>

      <select className="TopBar-select"
              ref="person">
          <option value="nitwit">nitwit</option>
          <option value="peipei">peipei</option>
          <option value="pm5">pm5</option>
          <option value="soidid">soidid</option>
      </select>

      <select className="TopBar-select"
              ref="status">
          <option value="in-shelf">已購買</option>
          <option value="wish-list">預購清單</option>
         
      </select>
      <div className="TopBar-action"
           onClick={this._onUpdate}>修改</div>
      <div className="TopBar-action"
           onClick={this._onDelete}>刪除</div>
    
      
  
    </div>
    
    :
    <div className="TopBar">
    <SearchBar handleChange={this.props.hanldeSearchTextChange} 
               value={this.props.searchText}/>
    </div>;
  }
});

module.exports = TopBar;


