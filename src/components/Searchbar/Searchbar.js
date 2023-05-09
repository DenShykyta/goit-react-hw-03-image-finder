import { Component } from 'react';
import { toast } from 'react-toastify';
import { SlMagnifier } from 'react-icons/sl';
import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.min.css';

import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchText: '',
  };

  handleInputChange = event => {
    this.setState({
      searchText: event.currentTarget.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchText.trim() === '') {
      return toast.warning('Input searchText!', { theme: 'colored' });
    }
    this.props.onSubmit(this.state.searchText);
    this.setState({ searchText: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
            <SlMagnifier size={20} />
          </button>

          <input
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchText}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
