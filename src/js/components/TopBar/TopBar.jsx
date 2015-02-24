/** @jsx React.DOM */

var React = require('react/addons');
var SearchBar = require('../SearchBar/SearchBar.jsx');
var AppActions = require('../../actions/AppActions');

require('./TopBar.css');

var TopBar = React.createClass({
  
  getInitialState(){
    return {
      showActionPanel: false
    }
  },

  _onCancel(){
    this.props.handleReset();
    this.setState({
      showActionPanel: false
    })
    
  },

  _onUpdate() {

    var status = "in-shelf";
    if(this.refs.status)
      status = this.refs.status.getDOMNode().value;
    
    var person = this.refs.person.getDOMNode().value;
    var current = this.refs.current.getDOMNode().value;
    
    //NEEDS REWRITE
    if(status === "in-shelf"){
        
        AppActions.update(
        {
          status: status,
          owner: person,
          current: current
        });
  
    }else{
        AppActions.update(
        {
           status: status,
           wishedBy: person
        });
    }


   

    //After update, reset the action panel.
    this._onCancel();

  },

  _onDelete() {
    
    AppActions.destroySelection();
  
  },

  _toggleActionPanel () {
    this.setState({
      showActionPanel: !this.state.showActionPanel
    })
  },

  render () {
    var count = Object.keys(this.props.selection).length;
    var terms = (count > 1) ? "books" : "book";

    var actionPanelItem = (this.state.showActionPanel) ? 
      <div className="TopBar-deleteAction"
           onClick={this._onDelete}>刪除</div>
    : "";

    var toggleTextItem = (this.state.showActionPanel) ? 
      "更少" : "更多";

    var statusItem = (this.state.showActionPanel) ? 
    <select className="TopBar-select"
            ref="status">
        <option value="in-shelf">已購買</option>
        <option value="wish-list">欲購清單</option>  
    </select>
    : "已買";


  	return (count > 0) ? 
   
    <div className="TopBar">
      <div className="TopBar-meta">
          <div className="TopBar-count">{count} {terms} selected</div>
          <div className="TopBar-back"
               onClick={this._onCancel}>X 取消</div>
          <div className="TopBar-more"
               onClick={this._toggleActionPanel}>{toggleTextItem}</div>
      </div>

      <select className="TopBar-select"
              ref="person">
          <option value="nitwit">nitwit</option>
          <option value="peipei">peipei</option>
          <option value="pm5">pm5</option>
          <option value="soidid">soidid</option>
      </select>
      {statusItem}，現旅居：
      <select className="TopBar-select"
              ref="current">
          <option value="nitwit">nitwit</option>
          <option value="peipei">peipei</option>
          <option value="pm5">pm5</option>
          <option value="soidid">soidid</option>
      </select>

      <div className="TopBar-action"
           onClick={this._onUpdate}>修改</div>

      {actionPanelItem}
   
    </div>
    
    :
    <div className="TopBar">
      <div className="TopBar-meta">
          Share books within your community :)
      </div>
      <SearchBar handleChange={this.props.hanldeSearchTextChange} 
                 value={this.props.searchText}/>
      <select className="TopBar-select"
              onChange={this.props.handleSearchStatusChange} >
          <option value="">所有</option>
          <option value="in-shelf">已購買</option>
          <option value="wish-list">欲購清單</option>
      </select>
    </div>;
  }
});

module.exports = TopBar;

