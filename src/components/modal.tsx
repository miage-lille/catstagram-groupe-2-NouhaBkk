import styled from 'styled-components';
import ReactDOM from 'react-dom';
import React from 'react';

const ModalContainer = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Fond noir transparent */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #222; /* Fond sombre pour le bandeau */
  color: white;
  text-align: center;
  padding: 10px 0;
  font-size: 18px;
  font-weight: bold;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 80%;
  border-radius: 10px;
  overflow: hidden;
  background-color: white; /* Fond pour l'image */
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: darkred;
  }
`;

interface ModalProps {
  largeFormat: string;
  author: string;
  close(): void;
}

const Modal = ({ largeFormat, author, close }: ModalProps) => {
  console.log('Author transmis à la modale:', author);

  return (
    <ModalContainer>
      <Header>Author: {author}</Header> {/* Bandeau en haut avec l'auteur */}
      <CloseButton onClick={close}>X</CloseButton> {/* Bouton pour fermer */}
      <ImageContainer>
        <Image src={largeFormat} alt="Selected Cat" />
      </ImageContainer>
    </ModalContainer>
  );
};

const portalRoot = document.getElementById('modal');

const ModalPortal = ({ largeFormat, author, close }: ModalProps) =>
  portalRoot ? ReactDOM.createPortal(<Modal largeFormat={largeFormat} author={author} close={close} />, portalRoot) : null;

export default ModalPortal;
