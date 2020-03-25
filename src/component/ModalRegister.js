import React from 'react';
import { Modal } from 'react-bootstrap';
import firebase from '../config/firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/auth';
import { connect } from 'react-redux';
import { actionUserName } from '../config/redux/action';

export const uiConfig = {
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: () => false
    },
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
};

class ModalRegister extends React.Component {

    componentDidMount() {
        this.checkSession()
    }

    checkSession = () => {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.props.setSession(user)
        );
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        return (
            this.props.userData ? (
                <></>
            ) : (
                    <>
                        <Modal backdrop={'static'} id="register-modal" show={true}>
                            <Modal.Body>
                                <div>
                                    <h5> Login "Tampolin Aps - 2019" </h5>
                                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                    <label>Dengan login Anda menyetujui</label>
                                    <a href='https://github.com/andijatmiko/firebaseauth/tree/gh-pages#firebaseauth'> Term And Service</a>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </>
                )
        )
    }
}

const stateToProps = (state) => ({
    userData: state.user
})

const reduxDispatch = (dispatch) => ({
    setSession: (user) => dispatch(actionUserName(user))
})

export default connect(stateToProps, reduxDispatch)(ModalRegister);