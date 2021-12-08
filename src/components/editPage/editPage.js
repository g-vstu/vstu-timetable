import { React, Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import {
    addFilter,
    getPatterns,
} from '../../redux/editPatternsReducer/actions';
import EditTable from '../editTable/editTable';
import Spinner from '../spinner';

class EditPage extends Component {
    state = {};

    componentDidMount() {
        this.props.getPatterns();
    }

    changeDay(item) {
        const { value } = item;

        this.props.addFilter(value);
    }

    render() {
        const { days, patterns } = this.props;

        const spinner = this.props.loading ? <Spinner /> : null;
        const content = !this.props.loading ? (
            <EditTable patterns={patterns} />
        ) : null;

        return (
            <div>
                <h3>Страница редактирования/отображения расписания</h3>
                <div>
                    <Select
                        onChange={(item) => {
                            this.changeDay(item);
                            this.props.getPatterns();
                        }}
                        options={days}
                    />
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
};

const mapStateToProps = (state) => ({
    loading: state.edit.loading,
    patterns: state.edit.patterns,
    days: state.common.days,
    courses: state.common.courses,
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
