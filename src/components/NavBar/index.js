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
            <div>
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Angos Apps</a>
                        <button className="navbar-toggler p-0 border-0" type="button" data-target="#dropdownMenu" aria-label="Toggle navigation">
                            <span id="navbarSideCollapse" className="navbar-toggler-icon" onClick={this.handleOnClickMainMenu}></span>
                        </button>
                        <div className={`collapse navbar-collapse  ${this.state.isMainMenuVisible === 'navbarSideCollapse' ? "show" : "hidden"}`} id="navbarsExampleDefault">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                                </li>
                                <li className="nav-item dropdown" >
                                    <a className="nav-link dropdown-toggle" href="#" id="dropdownUser" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={this.handleOnClick}>{this.state.currentUser !== null ? this.state.currentUser.username : ""}</a>
                                    <ul className={`dropdown-menu  ${this.state.isMenuVisible === 'dropdownUser' ? "show" : "hidden"}`} aria-labelledby="dropdownUser">
                                        <li >
                                            <a className="dropdown-item" onClick={this.handleOnClickLogOut}>Cerrar <span className="sr-only">(current)</span></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <form style={{ display: "none" }} >{/*className="d-flex" */}
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
                {/*
                <div className="nav-scroller bg-body shadow-sm">
                    <nav className="nav nav-underline" aria-label="Secondary navigation">
                        <a className="nav-link active" aria-current="page" href="#">Dashboard</a>
                        <a className="nav-link" href="#">
                            Friends
                        <span className="badge bg-light text-dark rounded-pill align-text-bottom">27</span>
                        </a>
                        <a className="nav-link" href="#">Explore</a>
                        <a className="nav-link" href="#">Suggestions</a>
                        <a className="nav-link" href="#">Link</a>
                        <a className="nav-link" href="#">Link</a>
                        <a className="nav-link" href="#">Link</a>
                        <a className="nav-link" href="#">Link</a>
                        <a className="nav-link" href="#">Link</a>
                    </nav>
                </div>
                */}
            </div>
        )
    }
};

export default Container;