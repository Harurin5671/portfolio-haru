export const languages = {
  en: 'English',
  es: 'Español',
}

export const defaultLang = 'en'

export const ui = {
    en : {
        'hero-presentation': 'Hello,',
        'hero-name': "I'm Frank",
        'hero-subtitle': 'Fullstack Developer',
        'hero-description': '2 years of experience.',
        'hero-description-2': 'Mechatronics Engineering student, Web and Mobile Developer',
        'hero-description-3': 'Specialized in creating robust web and mobile applications',
        'hero-final': 'Experience',
    },
    es: {
        'hero-presentation': 'Hola,',
        'hero-name': "soy Frank",
        'hero-subtitle': 'Desarrollador Fullstack',
        'hero-description': '2 años de experiencia.',
        'hero-description-2': ' Estudiante de Ingeniería Mecatrónica, Desarrollador Web y Móvil',
        'hero-description-3': 'Especializado en Crear Soluciones Web y Móviles Robustas',
        'hero-final': 'Experiencia',
    }
}

let lang = defaultLang;

if (typeof window !== 'undefined') {
  const userLang = navigator.language || navigator.language;
  lang = userLang.includes('es') ? 'es' : 'en'; 
}