/** @jsx React.DOM */

var React = require('react/addons');

var AppActions = require('../../actions/AppActions');

var Icon = require('../Icon/Icon.jsx');
require('./Composer.css');

var {classSet} = React.addons;

var Composer = React.createClass({
  
  getInitialState () {
    return {
      showComposeForm: false
    };
  },

  _handleClick () {
    this.setState({ showComposeForm: !this.state.showComposeForm });
    
    if(!this.state.showComposeForm)
      this._handleClear();
  },

  _handleClear () {
    
    this.refs.title.getDOMNode().value = "";
    this.refs.author.getDOMNode().value = "";
    this.refs.img.getDOMNode().value = "";
    this.refs.status.getDOMNode().value = "";
    this.refs.person.getDOMNode().value = "";

  },

  _submitBook () {
    
    var status = this.refs.status.getDOMNode().value;

    if(status==="in-shelf"){
        AppActions.create(
        {
          title: this.refs.title.getDOMNode().value,
          author: this.refs.author.getDOMNode().value,
          img: this.refs.img.getDOMNode().value,
          status: status,
          owner: this.refs.person.getDOMNode().value
          
        });

    }else{
        AppActions.create(
        {
          title: this.refs.title.getDOMNode().value,
          author: this.refs.author.getDOMNode().value,
          img: this.refs.img.getDOMNode().value,
          status: status,
          wishedBy: this.refs.person.getDOMNode().value,
         
        });

    }
    
    
    this._handleClick ();
    this._handleClear();
  },

  render () {

    var classes = classSet({
        "Composer-composeForm": true,
        "is-show": this.state.showComposeForm
    });

   
    return (
      <div className="Composer">
          <div className="Composer-composeButton" onClick={this._handleClick}>add</div>
          <div className={classes}>
              <div className="Composer-title">
                  <Icon icon="fa-paper-plane-o" />增加書單
                  <div className="Composer-closeButton" onClick={this._handleClick}></div>
              </div>
              <div className="Composer-listItem">
                  <div className="Composer-subtitle">書名</div>
                  <input className="Composer-input" ref="title" />
              </div>
              <div className="Composer-listItem">
                  <div className="Composer-subtitle">作者</div>
                  <input className="Composer-input" ref="author" />
              </div>
              <div className="Composer-listItem">
                  <div className="Composer-subtitle">封面圖片 URL </div>
                  <input className="Composer-input" ref="img"/>
              </div>
              
              <div className="Composer-listItem">
                  <div className="Composer-subtitle">狀態</div>
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
              </div>

              <div className="Composer-action">
                  <div className="Composer-actionButton"
                       onClick={this._submitBook}>
                       送出
                  </div>
                  <div className="Composer-deleteButton"
                       onClick={this._handleClick}>
                       取消
                  </div>
              </div>
              
          </div>
      </div>
    );
  }

});

module.exports = Composer;