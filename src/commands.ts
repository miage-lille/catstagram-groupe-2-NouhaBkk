import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { FetchCatsRequest } from './types/actions.type';

export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    async () => {
      const perPage = Math.max(3, parseInt(action.path.split('per_page=')[1] || '0', 10));
      const url = `${action.path.split('per_page=')[0]}per_page=${perPage}`;
      
      const response = await fetch(url, {
        method: action.method,
      });

      if (!response.ok) {
        throw new Error(response.statusText); 
      }

      const data = await response.json(); 
      console.log("API Response:", data);

      
      return data.hits.map((hit: any) => ({
        previewFormat: hit.previewURL,
        webFormat: hit.webformatURL,
        largeFormat: hit.largeImageURL,
        author: hit.user,
      }));
    },
    {
      successActionCreator: fetchCatsCommit, 
      failActionCreator: fetchCatsRollback, 
    }
  );
