import { useReducer } from 'react';
import { languageReducer } from './language';
import { State } from './language/type';

const initialState: State = {
  locale: 'en',
};

export const Switcher = () => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  return (
    <div>
      <h1>Language: {state.locale}</h1>
      <button onClick={() => dispatch({ type: 'changeToEnglish' })}>
        English
      </button>
      <p> | </p>
      <button onClick={() => dispatch({ type: 'changeToTurkish' })}>
        Turkish
      </button>
    </div>
  );
};
