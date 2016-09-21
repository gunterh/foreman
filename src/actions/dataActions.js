//import Dispatcher from '../dispatcher/appDispatcher';
//import ActionTypes from '../constants/actionTypes';
import Api from '../api/firebaseapi';

var DataActions = {
    addValueSeries(name,id) {
        Api.addValueSeries(name,id);
    },

    deleteValueSeries(id){
        Api.deleteValueSeries(id);
    },

    renameValueSeries(id, newname)
    {
        Api.renameValueSeries(id, newname);
    },

    getValueSeries()
    {   
        Api.getValueSeries();
    },
    saveValueSeries(valueSeries){
        Api.saveValueSeries(valueSeries);
    },

    
    addCategory(name, id) {
        Api.addCategory(name, id);
    },

    deleteCategory(id){
        Api.deleteCategory(id);
    },

    saveCategory(cat){
        Api.saveCategory(cat);
    }
};

export default DataActions;