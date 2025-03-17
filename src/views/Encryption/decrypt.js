var CryptoJS = require('crypto-js')
const isDecrypt=process.env.REACT_APP_IS_DECRYPTION
const decrypt = (hash) => {
  var keyOne =process.env.REACT_APP_APIKEY
 

    if (isDecrypt) {
        var keydata=JSON.parse(localStorage.getItem("mN"))
var mainContentKeydata=keydata.mainContent

        var decryptedMobileNo = CryptoJS.AES.decrypt(mainContentKeydata.content,keyOne, { iv: mainContentKeydata.iv,
            mode: CryptoJS.mode.CTR,
          });
        var getConvertedMobileNumber=decryptedMobileNo.toString(CryptoJS.enc.Utf8)
          let findPermutations = (string) => {
            if (!string || typeof string !== "string"){
              return "Please enter a string"
            } else if (string.length < 2 ){
              return string
            }
          
            let permutationsArray = [] 
             
            for (let i = 0; i < string.length; i++){
              let char = string[i]
          
              let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length)
          
              for (let permutation of findPermutations(remainingChars)){
        
                permutationsArray.push(char + permutation) 
            }
            }
            return permutationsArray
          }
        var newKey=findPermutations(getConvertedMobileNumber.slice(6,10))
        var keyTwo = CryptoJS.enc.Hex.parse(newKey.join('').substring(0,32))
        
        var keyiv = CryptoJS.enc.Hex.parse(hash.iv)
         var decryptedTwo = CryptoJS.AES.decrypt(hash.content,keyTwo, { iv:keyiv,
           mode: CryptoJS.mode.CTR,
          });
          //console.log("dec from dec2",decryptedTwo.toString(CryptoJS.enc.Utf8))
          return JSON.parse(decryptedTwo.toString(CryptoJS.enc.Utf8))
    }else{
        console.log("dec",hash)
        return hash
       
    }
    }
export default decrypt 