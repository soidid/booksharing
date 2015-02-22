/** @jsx React.DOM */

var React = require('react/addons');
var List = require('../List/List.jsx');
var SearchBar = require('../SearchBar/SearchBar.jsx');
var Composer = require('../Composer/Composer.jsx');

require('./App.css');

var data = [  
   {  
      "title":"觀察的力量：從烏干達到中國，如何為明天的客戶創造非凡的產品",
      "author":"詹恩‧奇普切斯、西蒙‧史坦哈特",
      "img":"http://media.taaze.tw/showLargeImage.html?sc=11100735672&width=189&height=273",
      "taaze_link":"http://www.taaze.tw/sing.html?pid=11100735672",
      "status":"in-shelf"
   },
   {  
      "title":"審議民主",
      "author":"埃爾斯特",
      "img":"http://media.taaze.tw/showLargeImage.html?sc=11100248684&width=189&height=273",
      "taaze_link":"http://www.taaze.tw/sing.html?pid=11100248684",
      "status":"in-shelf"
   },
   {  
      "title":"反脆弱：脆弱的反義詞不是堅強，是反脆弱",
      "author":"納西姆‧尼可拉斯‧塔雷伯",
      "img":"http://media.taaze.tw/showLargeImage.html?sc=11100659834&width=189&height=273",
      "taaze_link":"http://www.taaze.tw/sing.html?pid=11100659834",
      "status":"in-shelf"
   },
   {  
      "title":"製造低收入戶",
      "author":"洪伯勳",
      "img":"http://media.taaze.tw/showLargeImage.html?sc=11100737813&width=189&height=273",
      "taaze_link":"http://www.taaze.tw/sing.html?pid=11100737813",
      "status":"wish-list"
   }
];

var App = React.createClass({
  
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState(){
    return {
    	showFocus: false,
    	focusItem: {},
    	searchText: "",
    }
  },

  _onClick (i, event) {
  	//console.log(i);
    this.setState({
    	showFocus: !this.state.showFocus,
    	focusItem: i
    })
  },


  _onChange (event){
      this.setState({
        searchText: event.target.value
      });
  },

 
  render () {
  	var focusListClass = this.state.showFocus ? "defaultHide-show":"defaultHide";
    
    return (
      <div className="App">
        <div className="App-title">Share books with your community </div>
        <SearchBar handleChange={this._onChange} 
                   value={this.state.searchText}/>
        
        <List type={focusListClass}
              data={this.state.focusItem}
              handleClick={this._onClick} />

        <List type="basic" 
              data={data} 
              handleClick={this._onClick}
              searchText={this.state.searchText}  />

        <Composer />

      </div>
    );
  }
});

module.exports = App;


