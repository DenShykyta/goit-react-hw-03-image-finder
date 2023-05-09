import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';

export default class App extends Component {
  state = {
    searchText: '',
    collection: [],
    loader: false,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText !== this.state.searchText) {
      this.setState({ loader: true, page: 1 });

      fetch(
        `https://pixabay.com/api/?key=36114618-4ab1640e640d5e2e224b92420&q=${this.state.searchText}&image_type=photo`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error('Error!!!'));
        })
        .then(({ hits }) => {
          if (hits.length < 1) {
            toast.info('No images! Type a new search input!', {
              theme: 'colored',
            });
          }
          this.setState({ collection: hits });
        })
        .catch(error => this.setState({ error: error }))
        .finally(() => this.setState({ loader: false }));
    }
  }
  onModal = imgLarge => {
    this.setState({ showModal: true, imgModal: imgLarge });
  };
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  handleSearchSubmit = searchText => {
    this.setState({ searchText });
  };
  handleLoadMoreClick = () => {
    this.setState({ loader: true });
    let page = this.state.page + 1;
    fetch(
      `https://pixabay.com/api/?key=36114618-4ab1640e640d5e2e224b92420&q=${this.state.searchText}&image_type=photo&page=${page}`
    )
      .then(response => response.json())
      .then(collection =>
        this.setState(prevState => ({
          collection: [...prevState.collection, ...collection.hits],
          page: prevState.page + 1,
        }))
      )
      .finally(() => this.setState({ loader: false }));
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ToastContainer autoClose={2000} />

        <ImageGallery
          collection={this.state.collection}
          onImgClick={this.onModal}
        />
        {this.state.loader && <Loader />}
        {this.state.showModal && (
          <Modal image={this.state.imgModal} onClose={this.toggleModal} />
        )}
        {this.state.collection.length > 0 && (
          <Button onClick={this.handleLoadMoreClick} />
        )}
      </div>
    );
  }
}
