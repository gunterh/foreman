import React, {Component, PropTypes} from 'react';
import ReactDataGrid from 'react-data-grid';
import Plan from '../data/planData';
import PlanSelector from './planSelector';

var ColItemFormatter = React.createClass({
    render: function () {
        return (
            <div className="progress" style={{ textAlign: 'left', marginTop: '20px' }}>
                {this.props.value}
            </div>);
    }
});

export default class PlanPage extends Component {
    constructor() {
        super();
        this.state = {
            rows: [],
            columns: [],
            selectedScope: '006',
            plans: [Plan],
            selectedPlan: Plan
        };
        this.getColumns = this.getColumns.bind(this);
        this.rowGetter = this.rowGetter.bind(this);
        this.handleRowUpdated = this.handleRowUpdated.bind(this);
        this.getRows = this.getRows.bind(this);
        this.onScopeChange = this.onScopeChange.bind(this);
        this.onPlanClick = this.onPlanClick.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    getColumns() {
        const plan = this.state.selectedPlan;
        //Columns definition
        let columns = [
            {
                key: 'item',
                name: 'Item',
                width: 500,
                formatter: ColItemFormatter,
                resizable: true
            }
        ];

        for (let i = 0; i < plan.iterations.length; i++) {
            columns.push(
                {
                    key: plan.iterations[i],
                    name: plan.iterations[i],
                    editable: true
                }
            );
        }
        return columns;
    }

    getRows(plan, scope, allScopes, showAll) {
        let rows = [];
        if (!showAll) {
            for (let i = 0; i < plan.items.length; i++) {
                const itemObj = {
                    'item': plan.items[i].name
                };
                let iterationObj = {};
                for (let j = 0; j < plan.iterations.length; j++) {
                    const value = plan.data.find(x => x.scope === scope && x.item === plan.items[i].id && x.iteration === j);
                    iterationObj[plan.iterations[j]] = value ? value.value : '';
                }
                rows.push(Object.assign({}, itemObj, iterationObj));
            }
        }
        else {
            for (let i = 0; i < plan.items.length; i++) {
                const itemObj = {
                    'item': plan.items[i].name
                };
                let iterationObj = {};
                const index = allScopes.findIndex(y => y.id === scope);
                for (let k = allScopes.length - 1; k >= index; k--) {
                    for (let j = 0; j < plan.iterations.length; j++) {
                        const value = plan.data.find(x => x.scope === allScopes[k].id && x.item === plan.items[i].id && x.iteration === j);
                        if (value) {
                            iterationObj[plan.iterations[j]] = value.value;
                        }
                    }
                }
                rows.push(Object.assign({}, itemObj, iterationObj));
            }
        }
        return rows;
    }

    componentDidMount() {
        this.setState({ columns: this.getColumns(), rows: this.getRows(this.state.selectedPlan, this.state.selectedScope, this.state.selectedPlan.scopes, false) });
    }

    rowGetter(rowIdx) {
        return this.state.rows[rowIdx]
    }

    handleRowUpdated(e) {
        //merge updated row with current row and rerender by setting state
        let rows = this.state.rows;
        Object.assign(rows[e.rowIdx], e.updated);
        this.setState({ rows: rows });
    }

    onScopeChange(event) {
        const scope = event.currentTarget.value;
        this.setState({ selectedScope: scope, rows: this.getRows(this.state.selectedPlan, scope, this.state.selectedPlan.scopes, this.state.showAll) });
    }

    onPlanClick(event, name) {
        let newPlan = Object.assign({}, this.state.selectedPlan);
        const id = parseInt(newPlan.scopes[0].id, 10) + 1;
        const newScope = { id: id, name: name };
        newPlan.scopes.splice(0, 0, newScope);
        let plans = this.state.plans;
        plans.push(newPlan);
        this.setState({ plans: plans, selectedPlan: newPlan, selectedScope: newPlan.scopes[0].id });
    }

    onCheck(event) {
        this.setState({ showAll: event.target.checked });
        this.setState({ rows: this.getRows(this.state.selectedPlan, this.state.selectedScope, this.state.selectedPlan.scopes, event.target.checked) });
    }

    render() {
        return (
            <div className="MainBody">
                <h1>{this.state.selectedPlan.scopes[0].name}</h1>
                <PlanSelector onClick={this.onPlanClick} plans={this.state.plans}/>
                <div>
                    Scopes:
                    <select onChange={this.onScopeChange} value={this.state.selectedScope}>
                        {this.state.selectedPlan.scopes.map((scope) => {
                            return <option key={scope.id} value={scope.id}>{scope.name}</option>;
                        }) }
                    </select>
                    <input type="checkbox" name="vehicle" onChange={this.onCheck} /> Show All Layers
                </div>
                <br/>

                <ReactDataGrid
                    enableCellSelect={true}
                    columns={this.state.columns}
                    rowGetter={this.rowGetter}
                    rowsCount={this.state.rows.length}
                    minHeight={1000}
                    onRowUpdated={this.handleRowUpdated} />
            </div>
        );
    }
}

PlanPage.propTypes = {
    plan: PropTypes.object
}