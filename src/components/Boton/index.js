import React from 'react';
import './style.css';

class Container extends React.Component {
    render() {
        const { loading, title = 'Iniciar', type = 'submit', styles = {} } = this.props;
        return (
            <button disabled={loading} className="btn btn-primary btn-lg btn-block" style={styles} type={type}>
                {loading && (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                {!loading && title}
            </button>
        );
    }
}
export default Container;