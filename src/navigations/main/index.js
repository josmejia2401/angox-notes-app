import React from 'react';
import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';
import Note from '../../modules/Note/index';
import NoteAdd from '../../modules/NoteAdd/index';
import NoteEdit from '../../modules/NoteEdit/index';
import ActivityIndicator from '../../components/ActivityIndicator';
import { createBrowserHistory } from 'history';
import * as ConstantsApi from '../../utils/constants_api';
import { RectComponent } from '../../utils/react';
import { emptyCache } from '../../utils/cache';
import { getKey } from '../../utils/random';

const history = createBrowserHistory();

const routesAvailables = [
    { "name": "home", "component": Note, "path": ConstantsApi.PATH_HOME },
    { "name": "add", "component": NoteAdd, "path": ConstantsApi.PATH_NOTE_ADD },
    { "name": "edit", "component": NoteEdit, "path": ConstantsApi.PATH_NOTE_EDIT }
];

class Container extends RectComponent {

    constructor(props) {
        super(props);
        this.state = { ...super.state }
        this.procesarInformacion = this.procesarInformacion.bind(this);
    }

    componentDidMount = () => {
        this.setLoading(true, true);
        super.cargarInformacionInicial((data) => this.procesarInformacion(data));
    }

    procesarInformacion(data) {
        this.setLoading(false, false);
        if (data) {
            const exists = routesAvailables.filter(p => p.path === window.location.pathname);
            if (exists && exists.length > 0) {
                if (window.location.pathname !== ConstantsApi.PATH_HOME && window.location.pathname !== ConstantsApi.PATH_NOTE_ADD && window.location.pathname !== ConstantsApi.PATH_NOTE_EDIT) {
                    super.redirectToApp()
                }
                return;
            }
        }
        emptyCache();
        if (window.location.pathname === ConstantsApi.PATH_HOME) {
            super.cleanAllAndSplash(true);
        } else if (window.location.pathname === ConstantsApi.PATH_SIGN_IN) {
            super.cleanAllAndSplash(false);
        } else {
            super.cleanAllAndSplash(true);
        }
    }

    render() {
        return (<>
            <ActivityIndicator isVisible={this.state.loadingActivityIndicator}></ActivityIndicator>
            {this.state.loadingActivityIndicator === false && (
                <BrowserRouter history={history}>
                    <Switch>
                        {routesAvailables && routesAvailables.map((item, index) => {
                            return (<Route key={getKey} path={item.path} component={() => <item.component {...this.props} history={history}></item.component>} />);
                        })
                        }
                    </Switch>
                </BrowserRouter>
            )}
        </>);
    }
}
export default Container;