import React from 'react';
import ToastComponent from '../Toast/index';
import * as AsyncStorage from '../../utils/asyncstrorage';
import * as Constants from '../../utils/constants';
import './style.css';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuVisible: '',
            loading: false,
            currentUser: null,
        }
        this.notificationRef = React.createRef();
        this.addNotification = this.addNotification.bind(this);
    }

    componentDidMount = () => {
        AsyncStorage.getItem(Constants.ANGOS_USER_CURRENT).then(data => {
            if (data) {
                this.setState({ currentUser: JSON.parse(data) });
            } else {
                this.setState({ currentUser: null });
            }
        }).catch(error => {
            this.addNotification({ typeToast: 'error', text: error.toString() });
        });
    }

    handleOnClick = (e) => {
        e = e || window.event;
        e = e.target || e.srcElement;
        if (e && e.id && this.state.isMenuVisible !== e.id) {
            this.setState({ isMenuVisible: e.id });
        } else {
            this.setState({ isMenuVisible: '' });
        }
    }

    handleOnClickMainMenu = (e) => {
        e = e || window.event;
        e = e.target || e.srcElement;
        if (e && e.id && this.state.isMainMenuVisible !== e.id) {
            this.setState({ isMainMenuVisible: e.id });
        } else {
            this.setState({ isMainMenuVisible: '' });
        }
    }

    addNotification = (notification) => {
        if (this.notificationRef && this.notificationRef.current) {
            this.notificationRef.current.addItem(notification);
        }
    };

    handleOnClickLogOut = (e) => {
        AsyncStorage.removeItem(Constants.ANGOS_USER_CURRENT).then(data => {
            this.setState({ currentUser: null });
            window.location.href = "/";
        }).catch(error => {
            this.addNotification({ typeToast: 'error', text: error.toString() });
        });
    }

    render() {
        return (
            <header className="p-3 mb-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="#" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                            ANGOX9
                        </a>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#" className="nav-link px-2 link-secondary">Home</a></li>
                            {/*<li><a href="#" className="nav-link px-2 link-dark">Inventory</a></li> */}
                        </ul>

                        {/*
                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                        </form>
                        */}

                        <div className="dropdown text-end">
                            <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" onClick={this.handleOnClick} data-bs-toggle="dropdown" aria-expanded="false">
                                {/* <img src="" alt="mdo" width="32" height="32" className="rounded-circle" /> */}
                                {this.state.currentUser !== null ? this.state.currentUser.username : ""}
                            </a>
                            <ul className={`dropdown-menu text-small ${this.state.isMenuVisible === 'dropdownUser1' ? "show" : "hidden"}`} aria-labelledby="dropdownUser1">
                                <li><a className="dropdown-item" href="#">Perfil</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a className="dropdown-item" href="#" onClick={this.handleOnClickLogOut}>Cerrar sesión</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

        );
    }
};

export default Container;