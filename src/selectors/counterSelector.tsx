import { State } from '../reducer';

// Sélecteur pour récupérer la valeur du compteur depuis l'état global
export const counterSelector = (state: State): number => state.counter;