/** @jsx React.DOM */

var React = require('react/addons');
var Icon = require('../Icon/Icon.jsx');
require('./Composer.css');

var {classSet} = React.addons;

var Composer = React.createClass({
  
  getInitialState () {
    return {
      showComposeForm: false
    };
  },

  _handleClick (event) {
    console.log("ready to post? :)");
    this.setState({ showComposeForm: !this.state.showComposeForm });
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
                  <input className="Composer-input" />
              </div>
              <div className="Composer-listItem">
                  <div className="Composer-subtitle">作者</div>
                  <input className="Composer-input" />
              </div>
              <div className="Composer-listItem">
                  <div className="Composer-subtitle">封面圖片 URL </div>
                  <input className="Composer-input" />
              </div>
              <div className="Composer-action">
                  <div className="Composer-actionButton"
                       onClick={this._submitQuestion}>
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