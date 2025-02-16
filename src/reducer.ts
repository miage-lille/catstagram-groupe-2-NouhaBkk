import { Loop, liftState, Cmd, loop } from 'redux-loop';
import { compose } from 'redux';
import { Actions } from './types/actions.type';
import { Picture } from './types/picture.type'; 
import fakeData from './fake-datas.json';
import { cmdFetch } from './commands';

export type State = {
  counter: number;
  pictures: Picture[]; 
  selectedPicture: Picture | null;
};


export const defaultState = {
  counter: 0, 
  pictures: fakeData, 
  selectedPicture: null, 
}; 

export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
  if (!state) return defaultState; // mandatory by redux
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1, 
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: Math.max(3, state.counter - 1),
      };
    case 'SELECT_PICTURE':
      return {
        ...state,
        selectedPicture: action.payload? action.payload : null,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedPicture: null, 
      };
    case 'FETCH_CATS_REQUEST':
      return loop(
        state,
        cmdFetch(action) 
      );
    case 'FETCH_CATS_COMMIT':
      const validatedPictures = Array.isArray(action.payload)
      ? action.payload.filter(
          (item) =>
            item &&
            typeof item.previewFormat === 'string' &&
            typeof item.webFormat === 'string' &&
            typeof item.largeFormat === 'string' &&
            typeof item.author === 'string',
        )
      : [];
      return {
        ...state,
        pictures: validatedPictures,
      };
    case 'FETCH_CATS_ROLLBACK':
      console.error('Erreur lors de l\'appel API:', action.error); // Loguez l'erreur
      return {
        ...state,
        pictures: [], 
      };
    default:
      return state;
  }
};

export const counterSelector = (state: State) => state.counter;
export const picturesSelector = (state: State) => state.pictures;
export const getSelectedPicture = (state: State) => state.selectedPicture;

export default compose(liftState, reducer);
