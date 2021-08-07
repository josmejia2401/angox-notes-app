import React from 'react';
import ToastComponent from '../../components/Toast/index';
import FooterComponent from '../../components/Footer';
import ActivityIndicator from '../../components/ActivityIndicator';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar2';
import * as ConstantsApi from '../../utils/constants_api';
import { getKey } from '../../utils/random';
import { getTimeSince } from '../../utils/Date';
import './style.css';

const Presenter = (props) => {
    const { state, notificationRef, onDeleteNote, onFavoriteNote, onShowType, onChangeToTypeNote, onFilterToType, onSelectedItem } = props;
    return (
        <div>
            <NavBar {...props}></NavBar>
            <div className="container">
                <ToastComponent ref={notificationRef} ></ToastComponent>
                <ActivityIndicator isVisible={state.loadingActivityIndicator}></ActivityIndicator>
                <div className="page-content note-has-grid">
                    <ul className="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
                        <li className="nav-item">
                            <a href="#" className={"nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 " + (state.filterSelected === 'all' ? 'active' : null)} id="all-category" onClick={(e) => onFilterToType(e, 'all')}>
                                <span className="">Todo</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className={"nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 " + (state.filterSelected === 'business' ? 'active' : null)} id="note-business" onClick={(e) => onFilterToType(e, 'business')}>
                                <span className="">Negocio</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className={"nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 " + (state.filterSelected === 'social' ? 'active' : null)} id="note-social" onClick={(e) => onFilterToType(e, 'social')}>
                                <span className="">Social</span></a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className={"nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 " + (state.filterSelected === 'important' ? 'active' : null)} id="note-important" onClick={(e) => onFilterToType(e, 'important')}>
                                <span className="">Importante</span></a>
                        </li>
                        <li className="nav-item ml-auto">
                            <Link to={ConstantsApi.PATH_NOTE_ADD} className="nav-link btn-primary rounded-pill d-flex align-items-center px-3">
                                <i className="material-icons">add</i>
                            </Link>
                        </li>


                    </ul>
                    <div className="tab-content bg-transparent">
                        <div id="note-full-container" className="note-has-grid row">
                            {(state.filterSelected === 'all' ? state.items : state.filteredItems).map((item, index) => {
                                return (
                                    <div key={getKey()} className={"col-md-4 col-sm-12 single-note-item"}>
                                        <div className="card card-body">
                                            <span className={(item.category === "social" ? "side-stick-social" : (item.category === "business" ? "side-stick-business" : (item.category === "important" ? "side-stick-important" : "side-stick-none")))}></span>
                                            <h5 className="note-title text-truncate w-100 mb-0" onClick={(e) => onSelectedItem(e, item)} data-noteheading={item.title}>{item.title}</h5>
                                            <p className="note-date font-12 text-muted">Hace {getTimeSince(item.updateAt)}</p>
                                            <div className="note-content content" id="content" onClick={(e) => onSelectedItem(e, item)}>
                                                <p className="note-inner-content text-muted" data-notecontent={item.content}>{item.content}</p>
                                            </div>
                                            <div className="d-flex align-items-center" style={{ marginTop: "10px" }}>
                                                <span className="mr-1" style={{ marginRight: '10px' }}>
                                                    <span className="material-icons" style={{ color: item.favorite ? 'gold' : '' }} onClick={(e) => onFavoriteNote(e, item)}>star</span>
                                                </span>
                                                <span className="mr-1" style={{ marginRight: '10px' }}>
                                                    <i className="material-icons" onClick={(e) => onDeleteNote(e, item)}>delete</i>
                                                </span>
                                                {state.itemSelected && item.id === state.itemSelected.id && (
                                                    <span className="mr-1" style={{ marginRight: '10px' }}>
                                                        <Link to={`${ConstantsApi.PATH_NOTE_EDIT}?id=${state.itemSelected.id}`}>
                                                            <i className="material-icons">edit</i>
                                                        </Link>
                                                    </span>
                                                )}
                                                <div className="ml-auto">
                                                    <div className="dropdown">
                                                        <span className="more-options text-dark" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false" onClick={(e) => onShowType(e)}>
                                                            <i className="material-icons">more_vert</i>
                                                        </span>
                                                        <ul className="dropdown-menu dropdown-custom" aria-labelledby="dropdownMenu2">
                                                            <li><button className="dropdown-item dropdown-item-custom" type="button" onClick={(e) => onChangeToTypeNote(e, 'business', item)}>Business</button></li>
                                                            <li><button className="dropdown-item dropdown-item-custom" type="button" onClick={(e) => onChangeToTypeNote(e, 'social', item)}>Social</button></li>
                                                            <li><button className="dropdown-item dropdown-item-custom" type="button" onClick={(e) => onChangeToTypeNote(e, 'important', item)}>Important</button></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent {...props}></FooterComponent>
        </div>
    );
};

export default Presenter;