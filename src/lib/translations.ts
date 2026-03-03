export type Language = "en" | "it" | "de" | "es" | "fr"

export interface TranslationKeys {
    [key: string]: string
}

export const translations: Record<Language, TranslationKeys> = {
    en: {},
    it: {},
    de: {},
    es: {},
    fr: {},
}
