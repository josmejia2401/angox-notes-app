import React from 'react';
import ToastComponent from '../../components/Toast/index';
import FooterComponent from '../../components/Footer';
import ActivityIndicator from '../../components/ActivityIndicator';
import Boton from '../../components/Boton';
import NavBar from '../../components/NavBar2';
import { Link } from 'react-router-dom';
import * as ConstantsApi from '../../utils/constants_api';
import './style.css';

const Presenter = (props) => {
    const { state, handleOnSubmit, notificationRef } = props;
    if (state.item === null || state.loadingActivityIndicator === true) {
        return <ActivityIndicator isVisible={state.loadingActivityIndicator}></ActivityIndicator>;
    }
    return (
        <div style={{ marginTop: '80px' }}>
            <NavBar {...props}></NavBar>
            <div className="container">
                <ToastComponent ref={notificationRef} ></ToastComponent>
                <ActivityIndicator isVisible={state.loadingActivityIndicator}></ActivityIndicator>
                <div className="row">
                    <div className="col-md-12 order-md-1 text-center">
                        <h4 className="h3 fw-normal">Editar Nota</h4>
                        <form className="form-signin needs-validation" onSubmit={handleOnSubmit} noValidate>
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="title" style={{ float: "left" }}>title</label>
                                    <input type="text" className="form-control" id="title" name="title" placeholder="" defaultValue={state.item.title} autoComplete="current-password" required />
                                    <div className="invalid-feedback">
                                        title is required.
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    {/*<label htmlFor="content" style={{ float: "left" }}>content</label>*/}
                                    <textarea className="form-control" id="content" name="content" placeholder="" defaultValue={state.item.content} required rows="8"></textarea>
                                    <div className="invalid-feedback">
                                        content is required.
                                        </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <label htmlFor="category" style={{ float: "left" }}>category</label>
                                    <select className="form-select d-block w-100" id="category" name="category" defaultValue={state.item.category} aria-label="Default select example" required>
                                        <option value="" disabled>Choose...</option>
                                        <option value="business">business</option>
                                        <option value="social">social</option>
                                        <option value="important">important</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please provide a valid category.
                                        </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <Link to={ConstantsApi.PATH_HOME} className="btn btn-default" style={{ float: 'right' }}>
                                        Cancelar
                                        </Link>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <Boton loading={state.loading} title={'Actualizar'} type={"submit"} ></Boton>
                        </form>
                    </div>
                </div>
            </div>
            <FooterComponent {...props}></FooterComponent>
        </div>
    );
};

export default Presenter;