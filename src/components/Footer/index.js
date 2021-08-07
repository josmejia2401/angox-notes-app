import React from 'react';
import './style.css';

class Container extends React.Component {
    render() {
        return (
            <footer className="footer mt-auto py-3 text-center text-small">
                <div className="container">
                    <p className="mt-5 mb-3 text-muted">&copy; {new Date().getFullYear()} Angos</p>
                    <ul className="list-inline">
                        <li className="list-inline-item"><a href="#">{'Térm & condiciones'}</a></li>
                        <li className="list-inline-item"><a href="#">Soporte</a></li>
                    </ul>
                </div>
            </footer>
        )
    }
};

export default Container;