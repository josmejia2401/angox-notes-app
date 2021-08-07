import React from 'react';

import './style.css';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuVisible: ''
        }
    }

    componentDidMount() {

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

    render() {
        const { component, isVisible, title } = this.props;
        return (
            <div className={`modal fade ${isVisible ? "show-modal" : "hidden"}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleOnClickShowAdd}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {component}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.handleOnClickShowAdd}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Container;