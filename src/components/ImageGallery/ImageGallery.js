import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './ImageGallery.css';
import { pixabaySearchPictures } from '../../services/pixabay-api';
import ImageGalleryItem from '../ImageGalleryItem';
import BtnLoadMore from '../Button';
import Spinner from '../Loader';
import Modal from '../Modal';

const search = new pixabaySearchPictures();
const ImageGallery = ({ searchValue }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activePictureUrl, setActivePictureUrl] = useState('');
  const [activePictureAlt, setActivePictureAlt] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSearchResults([]);
    setPage(1);
    search.page = 1;
    search.query = searchValue;
    searchPicture();
    scrollPage();
  }, [searchValue]);

  const funcBtn = useCallback(() => {
    if (page > 1) {
      search.page = page;
      searchPicture();
      scrollPage();
    }
  }, [page]);

  useEffect(() => {
    funcBtn();
  }, [funcBtn]);

  const scrollPage = () => {
    const intervalId = setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
      clearTimeout(intervalId);
    }, 1000);
  };

  const searchPicture = async () => {
    try {
      setIsLoaded(true);
      const res = await search.searchPictures();
      if (res.length > 0) {
        setSearchResults(state => [...state, ...res]);
        setIsLoaded(false);
      }
    } catch (error) {
      setIsLoaded(false);
      console.log(error);
    }
  };

  const handleClickBtn = () => {
    setPage(state => state + 1);
  };

  const handleClickPicture = e => {
    const {
      dataset: { source },
      alt,
    } = e.target;
    setActivePictureUrl(source);
    setActivePictureAlt(alt);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ul className="ImageGallery">
        {searchResults.length > 0 &&
          searchResults.map(picture => (
            <ImageGalleryItem
              key={picture.id}
              src={picture.webformatURL}
              alt={picture.tags}
              onClick={handleClickPicture}
              dataSource={picture.largeImageURL}
            />
          ))}
      </ul>
      {isLoaded ? (
        <Spinner />
      ) : (
        searchResults.length > 0 && <BtnLoadMore onClick={handleClickBtn} />
      )}
      {showModal && (
        <Modal
          onClose={toggleModal}
          url={activePictureUrl}
          alt={activePictureAlt}
          pictures={searchResults}
        />
      )}
    </>
  );
};

export default ImageGallery;
ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
