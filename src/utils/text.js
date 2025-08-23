export function moneyDotFormat(num) {
  const numToString = num?.toString();
  let counter = 0;
  let result = '';
  for (let i = numToString?.length - 1; i >= 0 ; i--) {
    if (counter === 3) {
      result = numToString[i] + '.' + result;
      counter = 1;
    } else {
      result = numToString[i] + result;
      counter++;
    }
  }
  return result;
}

export const parser = (nom) =>{
  if(nom){
    nom = parseInt(nom.toString().replace(/[^0-9]/g, ''));
    return nom.toString().replace('.','').split('').reverse().join('').match(/\d{1,3}/g).join('.').split('').reverse().join('');
  }
  else
    return null;
};

export const revParse = (nom)=>{
  if(nom){
    return parseInt(nom.toString().split('.').join(''));
  }else return null;
};

export function toLowerCase(text) {
  return text.toLowerCase();
}

export function toUpperCase(text) {
  return text.toUpperCase();
}