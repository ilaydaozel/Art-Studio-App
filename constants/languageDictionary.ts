"use server";

import { Language } from "@/app/types/language";
import EnglishData from "@/languages/en";

interface IParams {
    language: Language
}
export const fetchTranslations = ({ language = "tr" }: IParams) =>
    import(`@/languages/${language}`).then((module) => {
        console.log(`@/languages/${language}`)
        console.log("module.default:   ", module.default);
        return module.default
    })
