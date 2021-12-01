import { React, Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { addFilter, getPatterns } from '../../redux/actions';
import EditTable from '../editTable/editTable';
import Spinner from '../spinner';

class EditPage extends Component {
    state = {
        days: [
            { value: 'MONDAY', label: 'Понедельник' },
            { value: 'TUESDAY', label: 'Вторник' },
            { value: 'WEDNESDAY', label: 'Среда' },
            { value: 'THURSDAY', label: 'Четверг' },
            { value: 'FRIDAY', label: 'Пятница' },
            { value: 'SATURDAY', label: 'Суббота' },
            { value: 'SUNDAY', label: 'Воскресенье' },
        ],
        courses: [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6', label: '6' },
        ],
    };

    componentDidMount() {
        this.props.getPatterns();
    }

    // componentDidUpdate() {
    //     this.props.getPatterns();
    // }

    changeDay(item) {
        const { value } = item;

        this.props.addFilter(value);
    }

    renderEditTable() {
        return <EditTable />;
    }

    render() {
        const { days } = this.state;

        const spinner = this.props.loading ? <Spinner /> : null;
        const content = !this.props.loading ? (
            <div>
                <Select
                    onChange={(item) => {
                        this.changeDay(item);
                        this.props.getPatterns();
                    }}
                    options={days}
                />
                {/* <button onClick={() => }>
                    обновить
                </button> */}
            </div>
        ) : null;

        return (
            <div>
                <h3>Страница редактирования/отображения расписания</h3>
                {spinner}
                {content}
                {this.renderEditTable()}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
