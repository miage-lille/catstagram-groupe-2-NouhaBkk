import { CloseModal, Decrement, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, Increment, SelectPicture } from './types/actions.type';
import { Picture } from './types/picture.type';

export const increment = (): Increment => ({ type: 'INCREMENT' });
export const decrement = (): Decrement => ({ type: 'DECREMENT' });

export const fetchCatsRequest = (): FetchCatsRequest => ({
  type: 'FETCH_CATS_REQUEST',
  method: 'GET',
  path: 'Update the path',
}); // TODO : Update this value !

export const fetchCatsCommit = (payload: unknown): FetchCatsCommit => {if (!Array.isArray(payload)) {
  throw new Error('Payload must be an array of pictures');
}

// Validation des objets dans le tableau 
if (!payload.every((item) => 'previewFormat' in item && 'webFormat' in item && 'largeFormat' in item && 'author' in item)) {
  throw new Error('Invalid picture objects in payload');
}

return { type: 'FETCH_CATS_COMMIT', payload: payload as Picture[] };
}

export const fetchCatsRollback = (error: Error): FetchCatsRollback => ({ type: 'FETCH_CATS_ROLLBACK', error });

export const selectPicture = (picture: Picture): SelectPicture => ({
  type: 'SELECT_PICTURE',
  payload: picture,
});

export const closeModal = (): CloseModal => ({
  type: 'CLOSE_MODAL',
});
