import EventEmitter from 'events';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

var CHANGE_EVENT = 'change';

class DataStore extends EventEmitter {
    constructor() {
        super();
        this.series = [];
        this.plans = [];
        this.categories = [];
    };


    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getValueSeries(seriesid) {
        return this.series.find(x => x.id === seriesid);
    }

    getCategory(id) {
        return this.categories.find(x => x.id === id);
    }
}

const dataStore = new DataStore();

dataStore.dispatchToken = Dispatcher.register(action => {

    let indexOf;
    let id;
    switch (action.actionType) {

        case ActionTypes.LOADCOLLECTION_VALUE_SERIES:
            dataStore.series = action.valueSeries;
            dataStore.emitChange();
            break;

        case ActionTypes.ADD_VALUE_SERIES:
            dataStore.series.push(action.valueSeries);
            dataStore.emitChange();
            break;
        case ActionTypes.DELETE_VALUE_SERIES:
            id = action.id;
            indexOf = dataStore.series.findIndex(x => x.id === id);
            dataStore.series.splice(indexOf, 1);
            dataStore.emitChange();
            break;
        case ActionTypes.SAVE_VALUE_SERIES:
            const vs = action.valueSeries;
            indexOf = dataStore.series.findIndex(x => x.id === vs.id);
            dataStore.series[indexOf] = vs;
            dataStore.emitChange();
            break;

        case ActionTypes.UPDATE_VALUE_SERIES:
            indexOf = dataStore.series.findIndex(x => x.id === action.id);
            dataStore.series[indexOf].name = action.name;
            dataStore.emitChange();
            break;

        case ActionTypes.ADD_CATEGORY:
            dataStore.categories.push(action.category);
            dataStore.emitChange();
            break;
        case ActionTypes.DELETE_CATEGORY:
            id = action.id;
            indexOf = dataStore.categories.findIndex(x => x.id === id);
            dataStore.categories.splice(indexOf, 1);
            dataStore.emitChange();
            break;
        case ActionTypes.SAVE_CATEGORY:
            const cat = action.category;
            indexOf = dataStore.categories.findIndex(x => x.id === cat.id);
            dataStore.categories[indexOf] = cat;
            dataStore.emitChange();
            break;
        default:
            return true;
    }
});

export default dataStore;