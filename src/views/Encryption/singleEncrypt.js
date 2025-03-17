var CryptoJS = require('crypto-js')
const isEncrypt=process.env.REACT_APP_IS_ENCRYPTION
const singleEncrypt = (data) => { 
    if (isEncrypt) {
    //   var mobileNumber=data.mobileNumber
    var keyOne =process.env.REACT_APP_APIKEY
    var temp=encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), `${keyOne}`).toString());
      return temp
    } else {
      return data
    }
  }
  export default singleEncrypt
  