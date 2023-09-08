import { State, Action } from "./type";

export const languageReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'changeToEnglish':
            return { ...state, locale: 'en' };
        case 'changeToTurkish':
            return { ...state, locale: 'tr' };
        default:
            return state;
    }
};