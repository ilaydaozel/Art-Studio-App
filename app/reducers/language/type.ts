import { Language } from "@/app/types/language";

export type State = {
    locale: Language;
};
export type Action = { type: 'changeToEnglish' } | { type: 'changeToTurkish' };