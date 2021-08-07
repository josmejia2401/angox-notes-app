import React from 'react';
import { RectComponent } from '../../utils/react';
import Presener from './presenter';
import * as Services from './services';

class Container extends RectComponent {

  constructor(props) {
    super(props);
    this.state = {
      ...super.state,
      items: [],
      filteredItems: [],
      filterSelected: 'all',
      itemSelected: null
    }
    this.onDeleteNote = this.onDeleteNote.bind(this);
    this.onFilterToType = this.onFilterToType.bind(this);
    this.onFavoriteNote = this.onFavoriteNote.bind(this);
    this.onShowType = this.onShowType.bind(this);
    this.onChangeToTypeNote = this.onChangeToTypeNote.bind(this);;
    this.onSelectedItem = this.onSelectedItem.bind(this);;
  }

  componentDidMount = () => {
    this.onLoadData();
  }

  componentWillUnmount() { }

  onLoadData() {
    this.setLoading(true, true);
    super.cargarInformacionInicial((result) => {
      if (result) {
        Services.get_all(result.id, result.id, result.token).then((data) => {
          if (data) {
            this.setState({ items: data });
          } else {
            this.setState({ items: [] });
          }
          this.setLoading(false, false);
        }).catch(error => {
          super.addNotification({ typeToast: 'error', text: error.message });
          this.setLoading(false, false);
          if (error.code && error.code === 401) {
            super.cleanAllAndSplash();
          }
        });
      }
    });
  }


  onFilterToType(e, category) {
    if (category) {
      let filtered = [];
      if (category === 'all') {
        filtered = this.state.items;
      } else {
        filtered = this.state.items.filter(p => p.category === category);
      }
      if (filtered && filtered.length > 0) {
        this.setState({ filteredItems: filtered, filterSelected: category });
      } else {
        this.setState({ filteredItems: [], filterSelected: category });
      }
    }
  }

  onFavoriteNote(e, note) {
    if (note) {
      this.setLoading(true, true);
      note.favorite = note.favorite ? !note.favorite : true;
      Services.updated(note.id, JSON.stringify(note), this.state.currentUser.id, this.state.currentUser.token).then(result => {
        const index = this.state.items.findIndex(p => p.id === note.id);
        if (index !== -1) {
          this.state.items[index] = note;
          this.setState({ items: this.state.items });
        }
        this.setLoading(false, false);
      }).catch(error => {
        super.addNotification({ typeToast: 'error', text: error.message });
        this.setLoading(false, false);
        if (error.code && error.code === 401) {
          super.cleanAllAndSplash();
        }
      });
    }
  }

  onDeleteNote(e, note) {
    if (note) {
      this.setLoading(true, true);
      Services.deleted(note.id, this.state.currentUser.id, this.state.currentUser.token).then(result => {
        const index = this.state.items.findIndex(p => p.id === note.id);
        if (index !== -1) {
          this.state.items.splice(index, 1);
          this.setState({ items: this.state.items });
        }
        this.setLoading(false, false);
      }).catch(error => {
        super.addNotification({ typeToast: 'error', text: error.message });
        this.setLoading(false, false);
        if (error.code && error.code === 401) {
          super.cleanAllAndSplash();
        }
      });
    }
  }

  onChangeToTypeNote(e, category, note) {
    if (note) {
      this.setLoading(true, true);
      note.category = category;
      Services.updated(note.id, JSON.stringify(note), this.state.currentUser.id, this.state.currentUser.token).then(result => {
        const index = this.state.items.findIndex(p => p.id === note.id);
        if (index !== -1) {
          this.state.items[index].category = category;
          this.setState({ items: this.state.items });
        }
        this.setLoading(false, false);
      }).catch(error => {
        super.addNotification({ typeToast: 'error', text: error.message });
        this.setLoading(false, false);
        if (error.code && error.code === 401) {
          super.cleanAllAndSplash();
        }
      });
    }
  }

  onShowType(e) {
    //var target = e.target;
    //var parent = target.parentElement;
    if (e && e.currentTarget) {
      var currentParent = e.currentTarget.parentElement;
      currentParent.children[1].classList.toggle("show");
    }
  }

  onSelectedItem(e, item) {
    if (this.state.itemSelected && this.state.itemSelected.id === item.id) {
      this.setState({ itemSelected: null });
    } else {
      this.setState({ itemSelected: item });
    }
  }

  render() {
    return <Presener
      {...this.props}
      state={this.state}
      notificationRef={this.notificationRef}
      onDeleteNote={this.onDeleteNote}
      onFilterToType={this.onFilterToType}
      onFavoriteNote={this.onFavoriteNote}
      onShowType={this.onShowType}
      onChangeToTypeNote={this.onChangeToTypeNote}
      onSelectedItem={this.onSelectedItem}
    />;
  }
}
export default Container;