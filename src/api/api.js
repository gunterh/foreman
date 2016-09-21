import ActionTypes from '../constants/actionTypes';
import Dispatcher from '../dispatcher/appDispatcher';
import firebaseApi from '../components/firebaseApi';


export default {
    addValueSeries(name, id) {
        AddValueSeriesCategory(name);
    },

    renameValueSeries(id, newname)
    {
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_VALUE_SERIES,
            id: valueSeries,
            newname: newname
        });
       
    },

    saveValueSeries(valueSeries) {
        Dispatcher.dispatch({
            actionType: ActionTypes.SAVE_VALUE_SERIES,
            valueSeries: valueSeries
        });
    },

    deleteValueSeries(id) {
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_VALUE_SERIES,
            id: id
        });
    },

    addCategory(name, id) {
        const cat =
            {
                id: id,
                name: name,
                files: []
            };
        Dispatcher.dispatch({
            actionType: ActionTypes.ADD_CATEGORY,
            category: cat
        });
    },

    saveCategory(cat) {
        Dispatcher.dispatch({
            actionType: ActionTypes.SAVE_CATEGORY,
            category: cat
        });
    },

    deleteCategory(id) {
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_CATEGORY,
            id: id
        });
    }
};