import ActionTypes from '../constants/actionTypes';
import Dispatcher from '../dispatcher/appDispatcher';


var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyAQIK7dpNSfFNcTjNtNDcxPqw3QD4joru0",
  authDomain: "foreman-916ad.firebaseapp.com",
  databaseURL: "https://foreman-916ad.firebaseio.com",
  storageBucket: "foreman-916ad.appspot.com",
  messagingSenderId: "763870786239"
};
firebase.initializeApp(config);
var CATEGORIES = "categories";
var VALUE_CATEGORIES = "valuecategories";

export default {
// This method stores a value in firebase
AddElement(postData, path)
{
  var firebaseRef = firebase.database().ref(path);
  var newKey = firebaseRef.push().key;

  var updates = {};
  updates[path + '/' + newKey] = postData;
  firebase.database().ref().update(updates);
  return newKey;
},

// This method deletes a value in firebase
DeleteElement(key, path)
{
  var firebaseRef = firebase.database().ref(path);
  firebaseRef.child(key).remove();
},

UpdateElement(postData, key, path)
{
  var firebaseRef = firebase.database().ref(path + "/" + key);
  if(firebaseRef != null)
  {
    var updates = {};
    updates[path + '/' + key] = postData;
    firebase.database().ref().update(updates);
  }
},
/*
Save new category in the database 
*/
addCategory(name, parentId) {
  var postData = {
    name: name
  };
  // Get a key for a new category
  var path = CATEGORIES;
  if(parentId != null)
  {
    path = CATEGORIES + '/' + parentId + '/' + CATEGORIES + '/';
  }
  
  this.AddElement(postData, path);
},

deleteCategory(key)
{
  this.DeleteElement(key, CATEGORIES);
},

renameValueSeries(id, newname)
    {

      var postData = {
        name: newname
      };
      debugger;
      var path = VALUE_CATEGORIES;
      this.UpdateElement(postData, id, path);
      Dispatcher.dispatch({
          actionType: ActionTypes.UPDATE_VALUE_SERIES,
          id: id,
          name: newname
      });
    },

saveCategory(name, key) {
  var postData = {
    name: name
  };
  // Get a key for a new category
  var path = CATEGORIES;
  this.UpdateElement(postData, key, path);
},

addValueSeries(name, id) {
  var postData = {
    name: name
  };
  // Get a key for a new category
  var path = VALUE_CATEGORIES;
  const key = this.AddElement(postData, path);
  Dispatcher.dispatch({
            actionType: ActionTypes.ADD_VALUE_SERIES,
            valueSeries: {id : key, name : name} 
        });
},
deleteValueSeries(key)
{
  this.DeleteElement(key, VALUE_CATEGORIES);
   Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_VALUE_SERIES,
            id: key
        });
},
AddValueSeries(name, categoryId) {
  var postData = {
    name: name
  };
  // Get a key for a new category
  var path = VALUE_CATEGORIES + '/' + categoryId + '/';
  return this.AddElement(postData, path);
},



AddValueSeriesItem(value, date, column1, column2, column3, valueseriesId) {
  var postData = {
    applicabledate: date, 
    column1: column1,
    column2: column2,
    column3: column3,
    value: value
  };
  // Get a key for a new category
  var path = VALUE_CATEGORIES + '/' + categoryId + '/'  + valueseriesId + "/";
  this.AddElement(postData, path);
},
RemoveValueSeriesItem(key, valueseriesId)
{
  this.DeleteElement(key, VALUE_CATEGORIES + "/" + valueseriesId);
},
ReadCategories(parent)
{
    var firebaseRef = firebase.database().ref(CATEGORIES);
    firebaseRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push(
          { key : child.key,
            name : child.val().name
          });
      });
      parent.setState({
        items: items
      });
      
    });
},
getValueSeries()
{
    var firebaseRef = firebase.database().ref(VALUE_CATEGORIES);
    firebaseRef.on('value', (snap) => {
      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push(
          { id : child.key,
            name : child.val().name
          });
      });

       Dispatcher.dispatch({
            actionType: ActionTypes.LOADCOLLECTION_VALUE_SERIES,
            valueSeries: items
        });
     // parent.setState({
     //   valueSeriesCollection: items
     // });
      
    });
}

};
