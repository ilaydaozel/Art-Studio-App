"use server";

import { Language } from "@/app/types/language";

interface IParams {
    language: Language
}
export const fetchTranslations = ({ language = "tr" }: IParams) =>
    import(`@/languages/${language}`).then((module) => {
        return module.default
    })
