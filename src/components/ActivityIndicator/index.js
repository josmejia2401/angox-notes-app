import React from 'react';
import './style.css';

class  Container extends React.Component {
    render() {
        return (
            <div className={`modal ${this.props.isVisible ? "show" : "hidden"}`} id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content" style={{ backgroundColor: 'transparent', border: 'unset' }}>
                        <div className="modal-body" style={{ textAlign: 'center' }}>
                            <div className="spinner-border" role="status">
                                <span className="sr-only visually-hidden">Loading...</span>
                            </div>
                            <p style={{ color: "#282c34" }}>{'{'}<code>CARGANDO</code>{'}'}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Container;