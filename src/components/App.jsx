import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';
import fetchImages from '../services';

export default class App extends Component {
  state = {
    searchText: '',
    collection: [],
    page: 1,
    loader: false,
    showModal: false,
    imgModal: '',
    tags: '',
    error: null,
    total: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loader: true });
        const images = await fetchImages(
          this.state.searchText,
          this.state.page
        );
        const { hits, totalHits } = images;
        if (hits.length === 0) {
          return toast.info('No images! Type a new search input!', {
            theme: 'colored',
          });
        }
        this.setState(prevState => ({
          collection: [...prevState.collection, ...hits],
          loader: false,
          total: totalHits,
        }));
      } catch (error) {
        this.setState({ error });
      }
    }
  }
  openModal = (imgLarge, tags) => {
    this.setState({ showModal: true, imgModal: imgLarge, tags });
  };
  closeModal = () => {
    this.setState({ showModal: false, imgModal: '', tags: '' });
  };
  handleSearchSubmit = searchText => {
    this.setState({ searchText, collection: [], page: 1 });
  };
  handleLoadMoreClick = () => {
    this.setState({ loader: true });
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const pagesNumber = this.state.total / this.state.collection.length;
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
          onImgClick={this.openModal}
        />
        {this.state.loader && <Loader />}
        {this.state.showModal && (
          <Modal
            image={this.state.imgModal}
            tags={this.state.tags}
            onClose={this.closeModal}
          />
        )}
        {pagesNumber > 1 &&
          !this.state.loader &&
          this.state.collection !== 0 && (
            <Button onClick={this.handleLoadMoreClick} />
          )}
      </div>
    );
  }
}
