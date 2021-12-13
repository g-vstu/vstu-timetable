import { React, Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import {
    addFilter,
    getPatterns,
} from '../../redux/editPatternsReducer/actions';
import { getAllGroups } from '../../redux/commonInfoReducer/actions';
import EditTable from '../editTable/editTable';
import Spinner from '../spinner';

class EditPage extends Component {
    state = {
        isClearable: true,
    };

    componentDidMount() {
        this.props.getPatterns();
        this.props.getAllGroups();
    }

    componentWillUnmount() {
        this.props.addFilter('', 'day');
        this.props.addFilter('', 'group');
    }

    changeFilter(item, name) {
        if (item) {
            const { value } = item;
            this.props.addFilter(value, name);
        } else {
            this.props.addFilter('', name);
        }
    }

    render() {
        const { isClearable } = this.state;
        const { days, patterns, groups } = this.props;

        const spinner = this.props.loading ? <Spinner /> : null;
        const content = !this.props.loading ? (
            <EditTable key={Math.random()} patterns={patterns} />
        ) : null;

        return (
            <div>
                <h3 className="empty_rows">
                    Страница редактирования/отображения расписания
                </h3>
                <br />
                <div className="choose__section">
                    <div className="choose__item">
                        <p className="choose__item-title">
                            Выберите день недели:
                        </p>
                        <div className="choose__item-select1">
                            <Select
                                isClearable={isClearable}
                                onChange={(item) => {
                                    this.changeFilter(item, 'day');
                                    this.props.getPatterns();
                                }}
                                options={days}
                            />
                        </div>
                    </div>
                    <div className="choose__item">
                        <p className="choose__item-title">Выберите группу:</p>
                        <div className="choose__item-select1">
                            <Select
                                isClearable={isClearable}
                                onChange={(item) => {
                                    this.changeFilter(item, 'group');
                                    this.props.getPatterns();
                                }}
                                options={groups}
                            />
                        </div>
                    </div>
                </div>
                {spinner}
                {content}
            </div>
        );
    }
}

const mapDispatchToProps = {
    addFilter,
    getPatterns,
    getAllGroups,
};

const mapStateToProps = (state) => ({
    loading: state.edit.loading,
    patterns: state.edit.patterns,
    days: state.common.days,
    courses: state.common.courses,
    groups: state.common.groups,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
