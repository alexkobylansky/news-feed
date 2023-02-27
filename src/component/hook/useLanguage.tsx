import {useState} from 'react';
import {useTranslation} from 'react-i18next';

export const useLanguage = () => {
  const {i18n} = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem('I18N_LANGUAGE') || "uk");

  const handleChangeLang = async (lang: string): Promise<void> => {
    await i18n.changeLanguage(lang);
    setLang(lang);
    localStorage.setItem('I18N_LANGUAGE', lang);
  }
    return {lang, handleChangeLang}
}