import React, {Component} from 'react';
import DataActions from '../actions/dataActions';
import DataStore from '../stores/dataStore';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import '../css/categoryPage.css';



export default class ValueSeriesItems extends Component {
    constructor() {
        super();
        this.state = {
            valueSerie: { name:'none', items: [] }
        };
        //this.AddNewItem = this.AddNewItem.bind(this);
        // this.RemoveItem = this.RemoveItem.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        DataStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        const id = this.props.params.id;
        let vs = DataStore.getValueSeries(id);
        this.setState({ valueSerie: vs });
    }

    componentWillUnmount() {
        DataStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({ valueSeriesItemsCollection: DataStore.series });
    }

    /* RemoveItem(searchTerm) {
         DataActions.deleteValueSeries(searchTerm);
     }*/

    render() {
        const renderValueSeriesItems = (ValueSeriesItem) => {
            return (

                <TableRow>
                    <TableRowColumn>
                        {ValueSeriesItem.name}
                    </TableRowColumn>
                    <TableRowColumn>
                        {ValueSeriesItem.date}
                    </TableRowColumn>
                    <TableRowColumn>
                        {ValueSeriesItem.col1}
                    </TableRowColumn>
                    <TableRowColumn>
                        {ValueSeriesItem.col2}
                    </TableRowColumn>
                    <TableRowColumn>
                        {ValueSeriesItem.col3}
                    </TableRowColumn>
                </TableRow>

            );
        }
        return (
            <div>
             

             <Table>
                    <TableHeader>
                        <TableRow>
                            <TableRowColumn>
                                Value Series:{this.state.valueSerie.name}
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>
                                Items
                            </TableRowColumn>
                        </TableRow>
                    </TableHeader>
                </Table>

            </div>
        );
    }
}