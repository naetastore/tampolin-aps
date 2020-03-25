import React from 'react';
import { connect } from 'react-redux';
import { getDataFromAPI } from '../config/redux/action';

class LastTampol extends React.Component {

    componentDidMount() {
        this.props.getData()
    }

    render() {
        return (
            <div style={{ paddingTop: "20px" }}>
                <p className="text-center"> Recently got "tampol"</p>
                <ul className="list-group list-group-flush">

                    {this.props.notes.map((v, i) =>
                        <li className="list-group-item" key={i}>
                            {v.enemies_name} @ {v.date}
                        </li>
                    )}
                </ul>
            </div>
        )
    }

}

const stateToProps = (state) => ({
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    getData: () => dispatch(getDataFromAPI())
})

export default connect(stateToProps, reduxDispatch)(LastTampol);