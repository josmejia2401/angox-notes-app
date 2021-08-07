import React from 'react';
import ActivityIndicator from '../components/ActivityIndicator';
import * as AsyncStorage from './asyncstrorage';
import * as Constants from './constants';
import * as Form from './form';
import * as Util from './util';
import * as Fetch from './fetch';
import * as ConstantsApi from './constants_api';


export class RectComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingActivityIndicator: true,
            loading: false,
            currentUser: null,
        }
        this.notificationRef = React.createRef();
        this.addNotification = this.addNotification.bind(this);
    }

    componentDidMount = () => {
        this.cargarInformacionInicial();
    }

    cargarInformacionInicial(callback = null) {
        AsyncStorage.getItem(Constants.ANGOS_USER_CURRENT).then(data => {
            const dataComoObjeto = data ? JSON.parse(data) : null;
            this.setState({ currentUser: dataComoObjeto });
            if (callback) {
                callback(dataComoObjeto);
            }
        }).catch(error => {
            if (callback) {
                callback(error);
            }
            this.addNotification({ typeToast: 'error', text: error.toString() });
        });
    }

    addNotification(notification) {
        if (this.notificationRef && this.notificationRef.current) {
            this.notificationRef.current.addItem(notification);
        }
    };

    armarFormularioDeJson(formData, sjon) {
        return Form.armarJsonDeForm(formData, sjon);
    };

    redirectTo(path) {
        Util.redirectTo(path);
    };

    redirectToApp() {
        if (window.location.pathname !== ConstantsApi.PATH_HOME) {
            window.location.href = ConstantsApi.PATH_HOME;
        }
    }

    delay(n) {
        n = n || 2000;
        return new Promise(done => {
            setTimeout(() => {
                done();
            }, n);
        });
    };

    storeDataUser(result, callback = null) {
        AsyncStorage.setItem(Constants.ANGOS_USER_CURRENT, result).then(data => {
            if (callback) {
                callback(data);
            }
        }).catch(error => {
            this.addNotification({ typeToast: 'error', text: error.toString() });
        });
    };

    cleanAllAndSplash(redirect = true) {
        AsyncStorage.cleanAll().then(data => {
            if (redirect === true) {
                if (window.location.pathname !== ConstantsApi.PATH_SIGN_IN) {
                    window.location.href = ConstantsApi.PATH_SIGN_IN;
                }
            }
        }).catch(error => {
            this.addNotification({ typeToast: 'error', text: error.toString() });
            if (redirect === true) {
                window.location.href = ConstantsApi.PATH_SIGN_IN;
            }
        });
    };

    validarToken(callback) {
        const myHeaders = new Headers();
        myHeaders.set("Content-Type", "application/json;charset=UTF-8");
        const requestOptions = { method: 'GET', headers: myHeaders, };
        if (this.state && this.state.currentUser && this.state.currentUser.token) {
            const idToken = this.state.currentUser.token;
            //myHeaders.set("Authorization", idToken);
            //myHeaders.set("accountId", this.state.currentUser.id);
            const END_POINT = ConstantsApi.URL_API_TOKEN_VALIDATE(idToken);
            Fetch.fetchWithTimeout(END_POINT, requestOptions).then(result => {
                callback(result);
            }).catch(error => {
                this.addNotification({ typeToast: 'error', text: error.message });
                callback(error);
            });
        } else {
            this.addNotification({ typeToast: 'error', text: 'Error al realizar la validación de la sesión.' });
            callback(null);
        }
    };

    setLoading(loading = false, loadingActivityIndicator = false) {
        this.setState({ loading: loading, loadingActivityIndicator: loadingActivityIndicator });
    }

    renderLoading() {
        return (
            <ActivityIndicator isVisible={this.state.loadingActivityIndicator}></ActivityIndicator>
        );
    }

}
