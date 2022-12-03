// // require('dotenv').config();
// // const key = process.env.REACT_APP_PINATA_KEY;
// // const secret = process.env.REACT_APP_PINATA_SECRET;
// const key = '21e8b3dcc78a6e8cf5ef';
// const secret = '2796ed2b25fea4aa86b033ddd4d8ae35ad80069d840a8db218bf182e31396630';

// //require(['axios'], function (axios) {
//     //axios is now loaded.
// //});
// import axios from 'axios';

// //alchemy univ used form-data library to read form data

//  export const uploadJSONToIPFS = async(JSONBody) => {
//     const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
//     //making axios POST request to Pinata ⬇️
//     return axios 
//         .post(url, JSONBody, {
//             headers: {
//                 pinata_api_key: key,
//                 pinata_secret_api_key: secret,
//             }
//         })
//         .then(function (response) {
//           return {
//             success: true,
//             pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
//           };
//         })
//         .catch(function (error) {
//           console.log(error)
//           return {
//             success: false,
//             message: error.message
//           }
//         });
// };


//  export const uploadFileToIPFS = async(file) => {
//     const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
//     //making axios POST request to Pinata ⬇️
    
//     let data = new FormData();
//     data.append('file', file);

//     const metadata = JSON.stringify({
//         name: 'testname',
//         keyvalues: {
//             exampleKey: 'exampleValue'
//         }
//     });
//     data.append('pinataMetadata', metadata);

//     //pinataOptions are optional
//     const pinataOptions = JSON.stringify({
//         cidVersion: 0,
//         customPinPolicy: {
//             regions: [
//                 {
//                     id: 'FRA1',
//                     desiredReplicationCount: 1
//                 },
//                 {
//                     id: 'NYC1',
//                     desiredReplicationCount: 2
//                 }
//             ]
//         }
//     });
//     data.append('pinataOptions', pinataOptions);

//     return axios 
//         .post(url, data, {
//             maxBodyLength: 'Infinity',
//             headers: {
//                 'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
//                 pinata_api_key: key,
//                 pinata_secret_api_key: secret,
//             }
//         })
//         .then(function (response) {
//             console.log("image uploaded", response.data.IpfsHash)
//             return {
//                success: true,
//                pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
//            };
//         })
//         .catch(function (error) {
//             console.log(error)
//             return {
//                 success: false,
//                 message: error.message,
//             }
//         });
// };