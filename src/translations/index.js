import ru from './ru.js';
import en from './en.js';

export const translations = {
  ru,
  en
};

export const SUPPORTED_LANGUAGES = {
  RU: 'ru',
  EN: 'en'
};

export const LANGUAGE_OPTIONS = [
  { value: 'ru', label: 'Русский', flag: '🇷🇺' },
  { value: 'en', label: 'English', flag: '🇺🇸' }
];

export default translations;