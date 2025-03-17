// import { nanoid } from 'nanoid'
// var CryptoJS = require('crypto-js')
// const isEncrypt=process.env.REACT_APP_IS_ENCRYPTION
// const encrypt = (data) => { 
  
//   if (isEncrypt) {
//     var mobileNumber=data.mobileNumber
//   var keyOne =process.env.REACT_APP_APIKEY
//   var iv = CryptoJS.enc.Hex.parse(nanoid(16))
//   var iv2=CryptoJS.enc.Hex.stringify(iv)
//   let findPermutations = (string) => {
//     if (!string || typeof string !== "string"){
//       return "Please enter a string"
//     } else if (string.length < 2 ){
//       return string
//     }
  
//     let permutationsArray = [] 
     
//     for (let i = 0; i < string.length; i++){
//       let char = string[i]
  
//       let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length)
  
//       for (let permutation of findPermutations(remainingChars)){

//         permutationsArray.push(char + permutation) 
//     }
//     }
//     return permutationsArray
//   }
// var newKey=findPermutations(mobileNumber.slice(6,10)).join('').substring(0,32);

// var keyTwo = CryptoJS.enc.Hex.parse(newKey)
// var iv3 = CryptoJS.enc.Hex.parse(nanoid(16))
// var iv4=CryptoJS.enc.Hex.stringify(iv3)
//      var encryptedOne = CryptoJS.AES.encrypt(mobileNumber, keyOne, { iv: iv ,
//         mode: CryptoJS.mode.CTR
//       }).toString();
//     var encryptedTwo = CryptoJS.AES.encrypt(JSON.stringify(data), keyTwo, { iv: iv3 ,
//       mode: CryptoJS.mode.CTR
//     }).toString();
  
//     var temp={}
//     temp.mainContent={
//       iv: iv2,
//       content:encryptedOne,
//     }   
//       temp.subContent={
//         iv: iv4,
//         content:encryptedTwo,
//       }
//     return temp
//   } else {
//     return data
//   }
// }
// export default encrypt

import { nanoid } from 'nanoid';
var CryptoJS = require('crypto-js');
const isEncrypt = process.env.REACT_APP_IS_ENCRYPTION;

const encrypt = (data) => { 
  if (!data || !data.mobileNumber) {
    throw new Error("Invalid data provided for encryption");
  }
  
  if (isEncrypt) {
    const mobileNumber = data.mobileNumber;
    const keyOne = process.env.REACT_APP_APIKEY;
    const iv = CryptoJS.enc.Hex.parse(nanoid(16));
    const iv2 = CryptoJS.enc.Hex.stringify(iv);

    const findPermutations = (string) => {
      if (!string || typeof string !== "string") {
        return "Please enter a string";
      } else if (string.length < 2) {
        return string;
      }
  
      let permutationsArray = [];
      for (let i = 0; i < string.length; i++) {
        let char = string[i];
        let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length);
  
        for (let permutation of findPermutations(remainingChars)) {
          permutationsArray.push(char + permutation);
        }
      }
      return permutationsArray;
    };

    const newKey = findPermutations(mobileNumber.slice(6,10)).join('').substring(0,32);
    const keyTwo = CryptoJS.enc.Hex.parse(newKey);
    const iv3 = CryptoJS.enc.Hex.parse(nanoid(16));
    const iv4 = CryptoJS.enc.Hex.stringify(iv3);

    const encryptedOne = CryptoJS.AES.encrypt(mobileNumber, keyOne, { iv, mode: CryptoJS.mode.CTR }).toString();
    const encryptedTwo = CryptoJS.AES.encrypt(JSON.stringify(data), keyTwo, { iv: iv3, mode: CryptoJS.mode.CTR }).toString();
    
    return {
      mainContent: { iv: iv2, content: encryptedOne },
      subContent: { iv: iv4, content: encryptedTwo }
    };
  } else {
    return data;
  }
};

export default encrypt;
