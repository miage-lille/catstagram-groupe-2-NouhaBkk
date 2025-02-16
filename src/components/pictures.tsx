import React, { useEffect } from 'react';
import styled from 'styled-components';
import ModalPortal from './modal';
import { useDispatch, useSelector } from 'react-redux';
import { counterSelector, getSelectedPicture, picturesSelector } from '../reducer';
import { closeModal, fetchCatsRequest, selectPicture } from '../actions';


const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;
const Pictures = () => {
  const dispatch = useDispatch();
  const pictures = useSelector(picturesSelector);
  const counter = useSelector(counterSelector);
  const selectedPicture = useSelector(getSelectedPicture);
  const visiblePictures = pictures.slice(0, counter);
  useEffect(() => {
    dispatch(fetchCatsRequest(counter)); 
  }, [counter, dispatch]);
  return (
    <>
      <Container>
        {visiblePictures.map((picture, index) => (
          <Image
            key={index}
            src={picture.previewFormat}
            alt={`Cat ${index}`}
            onClick={() => dispatch(selectPicture(picture))} 
          />
        ))}
      </Container>
      {selectedPicture && (
        <ModalPortal
          largeFormat={selectedPicture.largeFormat}
          author={selectedPicture.author} 
          close={() => dispatch(closeModal())} 
          
        />
      
      )}
    </>
  );
};

export default Pictures;
