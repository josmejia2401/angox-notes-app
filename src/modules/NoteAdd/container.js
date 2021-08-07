import React from 'react';
import { RectComponent } from '../../utils/react';
import Presener from './presenter';
import * as Services from './services';

class Container extends RectComponent {

  constructor(props) {
    super(props);
    this.state = {
      ...super.state,
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount = () => {
    this.onLoadData();
  }

  componentWillUnmount() { }

  onLoadData() {
    super.cargarInformacionInicial((result) => { });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    const isValid = form.checkValidity();
    if (isValid === true && this.state.currentUser && this.state.currentUser.id) {
      this.setLoading(true, true);
      const dataComoJson = super.armarFormularioDeJson(form, { "id": "", "accountId": this.state.currentUser.id, "title": "", "description": "", "favorite": false, "category": "" });
      Services.created(dataComoJson, this.state.currentUser.id, this.state.currentUser.token).then(result => {
        this.setLoading(false, false);
        form.reset();
        super.addNotification({ typeToast: 'info', text: 'Exitoso.' });
      }).catch(error => {
        form.classList.add('was-validated');
        super.addNotification({ typeToast: 'error', text: error.message });
        this.setLoading(false, false);
        if (error.code && error.code === 401) {
          super.cleanAllAndSplash();
        }
      });
    } else {
      super.addNotification({ typeToast: 'warn', text: 'No existe la información del usuario.' });
      super.redirectToApp();
    }
    //form.classList.add('was-validated');
  }

  render() {
    return <Presener
      {...this.props}
      state={this.state}
      notificationRef={this.notificationRef}
      handleOnSubmit={this.handleOnSubmit}
    />;
  }
}
export default Container;