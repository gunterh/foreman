import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DataStore from '../stores/dataStore';
import DataActions from '../actions/dataActions';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DialogModal extends React.Component {
    constructor() {
        super();
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleNameTextChange = this.handleNameTextChange.bind(this);
        this.AddNewCategory = this.AddNewCategory.bind(this);
        this.state = {
            dialogOpen: false,
            categories: [],
            categoryName: null,
            categoryId: null
        };
    }

    componentDidMount() {
        this.setState({ categories: DataStore.categories, categoryName: null, categoryId: null });
        
        //this.refs.nameInput.getDOMNode().disabled = true;
        //this.refs.nameInput.getDOMNode().focus();
    }

    handleOpen() {
        // TODO: load the name of the category/plan
        this.setState({ dialogOpen: true });
    };

    handleClose() {
        // close without making any changes
        this.setState({ dialogOpen: false });
    };

    handleSubmit() {
        // we need to store the name of the category/plan
        let nextid = this.GetNextID(DataStore.categories) + 1;
        let name = this.state.categoryName === null ? "New Category" : this.state.categoryName;
        this.AddNewCategory(name, nextid);
        this.setState({ dialogOpen: false });
    };

    AddNewCategory(name, id) {
        DataActions.addCategory(name, id);
    }

    // remove this and replace this with a new id getter from the datastore
    GetNextID(array) {
        var max = 1;
        var a = array.length;
        for (var counter = 0; counter < a; counter++) {
            if (array[counter].id > max) {
                max = array[counter].id;
            }
        }
        return max;
    }

    handleNameTextChange(e) {
        this.setState({ categoryName: e.target.value });
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                />,
            <FlatButton
                ref="submitButton"
                label="Submit"
                primary={true}
                disabled={false}
                onTouchTap={this.handleSubmit}
                />,
        ];

        return (
            <div>
                <RaisedButton id="raisedButton" label={this.props.label} onTouchTap={this.handleOpen} primary={true}/>
                <Dialog
                    title={this.props.label}
                    actions={actions}
                    modal={true}
                    open={this.state.dialogOpen}
                    >
                    <TextField ref="nameInput" floatingLabelText="Name" onChange={this.handleNameTextChange}/>
                    <br />
                </Dialog>
            </div>
        );
    }
}