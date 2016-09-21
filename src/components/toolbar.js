import React from 'react';
import '../css/toolbar.css';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DialogModal from './folderDialog';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

var showCreateDelete = function (selectedMenuItem) {
    if (selectedMenuItem != 0 && selectedMenuItem != 4)
        return true;
    else
        return false;
};

var showImportExportSettings = function (selectedMenuItem) {
    if (selectedMenuItem == 4)
        return true;
    else
        return false;
};

var getButtonName = function(selectedMenuItem){
    if(selectedMenuItem == 1)
        return "Create Plan";
    else if(selectedMenuItem == 2)
        return "Create Plan Data";
    else if(selectedMenuItem == 3)
        return "Create Value Serie";    
}

const ToolBar = (props) => {

    return (
        <Toolbar>
            <ToolbarGroup firstChild={true}>
                <DropDownMenu value={props.selectedMenuItem}
                    onChange={props.handleChange}
                    >
                    <MenuItem value={0} primaryText="Home" />
                    <MenuItem value={1} primaryText="Plan Config" />
                    <MenuItem value={2} primaryText="Current Plan" />
                    <MenuItem value={3} primaryText="Value Series" />
                    <MenuItem value={4} primaryText="Settings" />
                    <MenuItem value={5} primaryText="About" />
                </DropDownMenu>
            </ToolbarGroup>
            {/*
             <ToolbarGroup>
                <ToolbarTitle text="Options" />
                <FontIcon className="muidocs-icon-custom-sort" />
                <ToolbarSeparator />
                { showCreateDelete(props.selectedMenuItem) ? <DialogModal id="raisedButtonCreateDir" label="Create Category" primary={true} /> : null}
                { showCreateDelete(props.selectedMenuItem) ? <DialogModal id="raisedButtonCreate" label={getButtonName(props.selectedMenuItem)} primary={true} /> : null}
                { showCreateDelete(props.selectedMenuItem) ? <RaisedButton id="raisedButtonDelete" label="Delete Plan" secondary={true} disabled={true} /> : null}
                { showImportExportSettings(props.selectedMenuItem) ? <RaisedButton id="raisedButtonImportSettings" label="Import Settings" primary={true} /> : null}
                { showImportExportSettings(props.selectedMenuItem) ? <RaisedButton id="raisedButtonExportSettings" label="Export Settings" secondary={true} /> : null}
            </ToolbarGroup>
            */}
        </Toolbar>
    );
};

export default ToolBar;