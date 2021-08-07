import React from 'react';
import './style.css';

class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            currentItem: null,
            idIterval: 0,
            idTimeout: 0
        }
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount = () => {
        const idIterval = setInterval(() => this.proccessCurrentItem(), 300);//actualiza la vista
        this.setState({ idIterval: idIterval});
    }

    //componentWillUnmount = () => {
        //clearInterval(this.state.idIterval);
        //clearTimeout(this.state.idTimeout);
    //}

    addItem(item) {
        this.state.items.push(item);
        this.setState({ items: this.state.items });
        if (this.state.currentItem === null) {
            this.proccessCurrentItem();
        }
    }

    async deleteCurrentItem() {
        const { timeout = 5000 } = this.props;
        const idTimeout = setTimeout(() => this.setState({ currentItem: null }), timeout);
        this.setState({ idTimeout: idTimeout });
    }

    proccessCurrentItem = () => {
        if (this.state.items && this.state.items.length > 0) {
            if (this.state.currentItem === null) {
                const currentItem = this.state.items.pop();
                this.setState({ currentItem: currentItem });
                this.deleteCurrentItem();
            }
        }
    }

    render() {
        if (this.state.currentItem !== null) {
            return (<div id="toast-app" className={` ${this.state.currentItem.typeToast} ${this.state.currentItem !== null ? "show" : "hidden"} `} >{this.state.currentItem.text}</div>);
        }
        return null;
    }
}

export default Container;