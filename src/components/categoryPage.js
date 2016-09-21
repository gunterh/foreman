import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import '../css/categoryPage.css';
import DataStore from '../stores/dataStore';
import DataActions from '../actions/dataActions';
import DialogModal from './folderDialog';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip=""
        tooltipPosition="bottom-left"
        >
        <MoreVertIcon color={grey400} />
    </IconButton>
);

export default class CategoryPage extends Component {
    constructor() {
        super();
        this.state = {
            dialogOpen: false,
            categories: [],
            category: null,
            categoryName: null,
            categoryId: null
        };
        this.onChange = this.onChange.bind(this);
        this.onListItemDoubleClick = this.onListItemDoubleClick.bind(this);
        this.reloadState = this.reloadState.bind(this);
        this.rightIconMenuCategory = this.rightIconMenuCategory.bind(this);
        this.RemoveCategory = this.RemoveCategory.bind(this);
        this.EditCategory = this.EditCategory.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleNameTextChange = this.handleNameTextChange.bind(this);
    }

    componentDidMount() {
        this.setState({ categories: DataStore.categories, categoryName: null, categoryId: null });

        //this.refs.nameInput.getDOMNode().disabled = true;
        //this.refs.nameInput.getDOMNode().focus();
    }

    handleOpen(e) {
        this.setState({ dialogOpen: true, editLabel: e.target.outerText, categoryId: null });
    };

    handleClose() {
        // close without making any changes
        this.setState({ dialogOpen: false, categoryId: null });
    };

    handleSubmit() {
        // we need to store the name of the category/plan
        let id = this.state.categoryId;
        let name = this.state.categoryName === null ? "New Category" : this.state.categoryName;
        if (id == null) {
            id = this.GetNextID(DataStore.categories) + 1;
            DataActions.addCategory(name, id);
        }
        else {
            let cat = DataActions.getCategory(id);
            if (cat) {
                cat.name = name;
                DataActions.saveCategory(cat);
            }
        }
        this.setState({ dialogOpen: false, categoryId: null });
    };

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

    componentWillReceiveProps(nextProps) {
        this.reloadState(nextProps);
    }

    componentWillMount() {
        DataStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        //this.reloadState();
    }

    onChange() {
        this.reloadState(this.props);
    }

    reloadState(propsToUse) {
        if (!propsToUse.params.id) {
            // load the root folder level categories and files
            this.setState({ categories: DataStore.categories, category: null });
        }
        else {
            // load the files in the category. NOTE: we are only using one level of category
            let currentCat = DataStore.getCategory(propsToUse.params.id);
            if (currentCat) {
                this.setState({
                    categories: [],
                    category: currentCat
                });
            }
            else {
                // we shouldn't be here with this folder id taht does not exist so go back up to root
                this.props.history.push('/category');
            }
        }
    }

    componentWillUnmount() {
        DataStore.removeChangeListener(this.onChange);
    }

    onListItemDoubleClick(e) {
        this.props.history.push('/category/' + e.currentTarget.id);
    }

    rightIconMenuCategory(id) {
        return (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem value="1" onClick={() => this.RemoveCategory(id) } >Delete</MenuItem>
                <MenuItem value="2" onClick={() => this.EditCategory(id) }>Edit</MenuItem>
            </IconMenu>
        );
    };

    RemoveCategory(id) {
        DataActions.deleteCategory(id);
    }

    EditCategory(id) {
        let currentCat = DataStore.getCategory(id);
        if (currentCat) {
            this.setState({
                dialogOpen: true,
                editLabel: "Edit Category",
                editNameValue: currentCat.name,
                categoryId: currentCat.id
            });
        }
    }

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
                <div>Id={this.props.params.id}</div>
                {/* Load the folder root from here.
            If the id is null then use the default Plan categories as root.
            */}
                {
                    (this.state.category == null) ?
                        <RaisedButton ref="raisedButtonCreateDirectory" label="Create Directory" onTouchTap={this.handleOpen} primary={true}/>
                        : null
                }
                <br />
                <RaisedButton ref="raisedButtonCreatePlan" label="Create Plan" onTouchTap={this.handleOpen} primary={true}/>

                <br />

                <List>
                    {
                        this.state.category == null ?
                            <Subheader className="categorySubheader" inset={true}>Categories</Subheader>
                            : null
                    }
                    {/*<ListItem className="categoryListItem"
                leftAvatar={<Avatar icon={<FileFolder  />} />}
                rightIcon={<ActionInfo />}
                primaryText="2016"
                secondaryText="Jan 20, 2016"
                />
            <ListItem className="categoryListItem"
                leftAvatar={<Avatar icon={<FileFolder  />}  />}
                rightIcon={<ActionInfo />}
                primaryText="2017"
                secondaryText="Jan 30, 2016"
                />
                */
                        this.state.categories.map(category =>
                            <ListItem key={category.id} id={category.id} onDoubleClick={this.onListItemDoubleClick}
                                className="categoryListItem"
                                leftAvatar={<Avatar icon={<FileFolder />} backgroundColor={blue500} />}
                                rightIconButton={this.rightIconMenuCategory(category.id) }
                                primaryText={category.name}
                                />
                        ) }
                </List>
                <Divider inset={true} />
                <List>
                    <Subheader className="categorySubheader" inset={true}>Files</Subheader>
                    {/*
                    <ListItem className="categoryListItem"
                        leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                        rightIcon={<ActionInfo />}
                        primaryText="Plan pre 2016"
                        secondaryText="Jan 20, 2016"
                        />
                    <ListItem className="categoryListItem"
                        leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={yellow600} />}
                        rightIcon={<ActionInfo />}
                        primaryText="Plan pre 2017"
                        secondaryText="Jan 30, 2016"
                        />
                        */

                        (this.state.category != null && this.state.category.files != null) ?
                            this.state.category.files.map(file =>
                                <ListItem key={file.id} id={file.id} onDoubleClick={this.onFileListItemDoubleClick}
                                    className="categoryListItem"
                                    leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={yellow600} />}
                                    rightIcon={<ActionInfo />}
                                    primaryText={file.name}
                                    />
                            ) : null
                    }

                </List>
                <Dialog
                    title={this.state.editLabel}
                    actions={actions}
                    modal={true}
                    open={this.state.dialogOpen}
                    >
                    <TextField ref="nameInput" value={this.state.categoryName} floatingLabelText="Name" onChange={this.handleNameTextChange}/>
                    <br />
                </Dialog>
            </div>
        );
    }
}