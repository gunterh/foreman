import React, {Component} from 'react';
import DataActions from '../actions/dataActions';
import DataStore from '../stores/dataStore';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import '../css/categoryPage.css';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {grey400} from 'material-ui/styles/colors';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip=""
        tooltipPosition="bottom-left"
        >
        <MoreVertIcon color={grey400} />
    </IconButton>
);

const style = {
  margin: 12,
};

export default class ValueSeries extends Component {
    constructor() {
        super();
        this.state = {
            dialogopen:false,
            dialogobjectid:'',
            defaultvalue:'',
            newvalue:'',
            valueSeriesCollection: []
        };


        this.AddNewSeries = this.AddNewSeries.bind(this);
        this.RemoveSeries = this.RemoveSeries.bind(this);
        this.onChange = this.onChange.bind(this);
        this.OpenValueSeries = this.OpenValueSeries.bind(this);
        this.rightIconMenu = this.rightIconMenu.bind(this);
        this.RenameSeries = this.RenameSeries.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       this.handleNameTextChange = this.handleNameTextChange.bind(this);
    }


    rightIconMenu(id) {
        return (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem value="1" onClick={() => this.OpenValueSeries(id) }>Open</MenuItem>
                <MenuItem value="2" onClick={() => this.RenameSeries(id,name) }>Rename</MenuItem>
                <MenuItem value="3" onClick={() => this.RemoveSeries(id) } >Delete</MenuItem>                
            </IconMenu>
        );
    };

    handleSubmit(value)
    {
        if(value != null )
            DataActions.renameValueSeries(this.state.dialogobjectid, this.state.newvalue);

        this.setState({dialogopen: false, dialogobjectid:'',defaultvalue:'',newvalue:''});

    }

    handleClose()
    {
        this.setState({dialogopen: false,  dialogobjectid:'',defaultvalue:'',newvalue:''});
    }
   
    componentWillMount() {       
        DataStore.addChangeListener(this.onChange);
    }

    componentDidMount() {

        this.setState({dialogopen:false, valueSeriesCollection: DataStore.series });
    }

    componentWillUnmount() {
        DataStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({ valueSeriesCollection: DataStore.series });
    }

    AddNewSeries() {
        DataActions.addValueSeries('New value series', -1);
    }

    RemoveSeries(searchTerm) {
        DataActions.deleteValueSeries(searchTerm);
    }

    RenameSeries(seachTerm, oldVal) {
        this.setState({dialogopen: true, dialogobjectid:seachTerm,defaultvalue:oldVal,newvalue:''});
    }

    OpenValueSeries(id) {
        this.props.history.push('/valueseriesitems/' + id);
    }

    handleNameTextChange(e) {
      this.setState({newvalue:e.target.value});
    };

    render() {
        const renderValueSeries = (ValueSerie) => {
            return (
              
                <ListItem className="categoryListItem" key={ValueSerie.id}
                    leftAvatar={<Avatar icon={<FileFolder />} />}
                    rightIconButton={this.rightIconMenu(ValueSerie.id) }
                    primaryText={ValueSerie.name} 
                    />
            );
        };

        const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

        return (
            <div >
                <Dialog
                    title="Enter the Value"
                    actions={actions}
                    modal={false}
                    open={this.state.dialogopen}
                    onRequestClose={this.handleClose}
                    >
                    <TextField ref="nameInput" floatingLabelText="Name" defaultValue={this.state.defaultValue} onChange={this.handleNameTextChange}/>
                    <br />
                </Dialog>

                <table>
                    <tr>
                        <td>
                        <RaisedButton label="Add" style={style} primary={true} onClick={this.AddNewSeries}/>                         
                        </td>
                    </tr>
                </table>

                <List>
                    <Subheader className="categorySubheader" inset={true}> Value Series</Subheader>
                    {this.state.valueSeriesCollection.map(renderValueSeries) }
                </List>
            </div>
        );
    }
}