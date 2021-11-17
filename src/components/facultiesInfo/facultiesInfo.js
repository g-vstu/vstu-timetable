import React, { Component } from 'react';
import TimetableService from '../../services/timetableService';
import ErrorMessage from '../errorMessage';
import axios from 'axios';

export default class FacultiesInfo extends Component {
    timetableService = new TimetableService();

    state = {
        fac: {},
        error: false,
    };

    componentDidMount() {
        const id = 8;
        this.timetableService
            .getFacultie(id)
            .then(this.onFacLoaded)
            .catch(this.onError);
        // axios
        //     .get(`http://192.168.11.252:8082/common-info/faculties/1`)
        //     .then((res) => {
        //         const fac = res.data;
        //         this.setState({ fac });
        //     });
    }

    onFacLoaded = (fac) => {
        this.setState({
            fac,
        });
    };

    onError = (err) => {
        this.setState({
            error: true,
        });
    };

    render() {
        const { fac, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !error ? <View fac={fac} /> : null;

        return (
            <div>
                {errorMessage}
                {content}
            </div>
        );
    }
}

const View = ({ fac }) => {
    const { id, name, shortName, dean, discription } = fac;

    return (
        <>
            <h4>Facultie INFO</h4>
            <ul>
                <li>
                    <span>ID:</span>
                    <span>{id}</span>
                </li>
                <li>
                    <span>NAME:</span>
                    <span>{name}</span>
                </li>
                <li>
                    <span>SHORT NAME:</span>
                    <span>{shortName}</span>
                </li>
                <li>
                    <span>DEAN:</span>
                    <span>{dean}</span>
                </li>
                <li>
                    <span>DISCRIPTION:</span>
                    <span>{discription}</span>
                </li>
            </ul>
        </>
    );
};
