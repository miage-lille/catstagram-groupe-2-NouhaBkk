import { CloseModal, Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment, SelectPicture } from './types/actions.type';
import { Picture } from './types/picture.type';
import { API_URL } from './config';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (counter: number): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: `${API_URL}&per_page=${counter}`,
}); 


export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({
  type: 'FETCH_CATS_ROLLBACK',
  error,
});

export const fetchCatsCommit = (payload: any[]): FetchCatsCommit => {
  if (!payload || !Array.isArray(payload)) {
    throw new Error('Payload must be an array of pictures');
  }

  return { type: 'FETCH_CATS_COMMIT', payload };
};



export const closeModal = (): CloseModal => ({
  type: 'CLOSE_MODAL',
});

export const selectPicture = (picture: Picture): SelectPicture => ({
  type: 'SELECT_PICTURE',
  payload: picture,
});
