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
    this.refs.inShelf.getDOMNode().checked = false;
    this.refs.wishList.getDOMNode().checked = false;

    
  },

  _submitBook () {
    var status = this.refs.wishList.getDOMNode().checked ? "wish-list" : "in-shelf";
    AppActions.create(
    {
      title: this.refs.title.getDOMNode().value,
      author: this.refs.author.getDOMNode().value,
      img: this.refs.img.getDOMNode().value,
      status: status
    }
    );
    this._handleClear()
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
                  <div className="Composer-subtitle">狀態 </div>
                  <div className="Composer-radioSet">
                  <input type="radio" name="status" value="in-shelf" className="Composer-radio" ref="inShelf" /> 
                     <div className="Composer-radioText">已購買</div>
                  </div>
                  <div className="Composer-radioSet">
                  <input type="radio" name="status" value="wish-list" className="Composer-radio" ref="wishList" />
                     <div className="Composer-radioText">欲購清單</div>
                  </div>
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