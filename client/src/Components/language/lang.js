import cookie from 'react-cookies';
import POL from './pol.json';
import ENG from './eng.json'
var lang;
const langCookie = cookie.load('language');
if(langCookie === 'pol')
    lang = POL;
else if(langCookie === 'eng')
    lang = ENG;
else 
    lang = ENG;
export default lang;