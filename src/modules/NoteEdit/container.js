import React from 'react';
import { RectComponent } from '../../utils/react';
import Presener from './presenter';
import * as Services from './services';

class Container extends RectComponent {

  constructor(props) {
    super(props);
    this.state = {
      ...super.state,
      item: null
    }
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.findNoteById = this.findNoteById.bind(this);
  }

  componentDidMount = () => {
    this.onLoadData();
  }

  componentWillUnmount() { }

  onLoadData() {
    this.setLoading(true, true);
    super.cargarInformacionInicial((result) => {
      this.setLoading(false, false);
      if (result) {
        this.findNoteById(result);
      } else {
        super.addNotification({ typeToast: 'error', text: '"Error al intentar realizar la operación; No existe información del usuario.' });
        super.redirectToApp();
      }
    });
  }

  getIdNote = () => {
    const query = new URLSearchParams(window.location.search);
    const idProject = query.get("id");
    return idProject;
  }

  findNoteById(result) {
    const id = this.getIdNote();
    if (id) {
      this.setLoading(true, true);
      Services.get_by_id(id, result.id, result.token).then(result => {
        this.setLoading(false, false);
        if (result) {
          this.setState({ item: result });
        } else {
          this.setState({ item: null });
          super.addNotification({ typeToast: 'error', text: '"Error al intentar realizar la operación; Petición invalida.' });
        }
      }).catch(error => {
        super.addNotification({ typeToast: 'error', text: error.message });
        this.setLoading(false, false);
        if (error.code && error.code === 401) {
          super.cleanAllAndSplash();
        }
      });
    } else {
      super.addNotification({ typeToast: 'error', text: '"Error al intentar realizar la operación; No existe información de la nota.' });
      super.redirectToApp();
    }
  }

  handleOnSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;
    const isValid = form.checkValidity();
    if (isValid === true && this.state.item && this.state.item.id && this.state.currentUser && this.state.currentUser.id) {
      this.setLoading(true, true);
      const dataComoJson = super.armarFormularioDeJson(form, { "id": this.state.item.id, "accountId": this.state.currentUser.id, "title": "", "description": "", "favorite": false, "category": "" });
      Services.updated(this.state.item.id, dataComoJson, this.state.currentUser.id, this.state.currentUser.token).then(result => {
        this.setState({ item: result });
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