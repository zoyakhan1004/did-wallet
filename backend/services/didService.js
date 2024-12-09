// const crypto = require('crypto');

// /**
//  * Generate public and private keys using Ed25519.
//  */
// async function generateKeyPair() {
//     const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519', {
//         modulusLength: 256,
//     });

//     return {
//         publicKey: publicKey.export({ format: 'pem', type: 'spki' }).toString(),
//         privateKey: privateKey.export({ format: 'pem', type: 'pkcs8' }).toString(),
//     };
// }

// /**
//  * Generate a DID using the iden3 method.
//  * @param {string} publicKey - The public key to include in the DID document.
//  */
// async function generateDID(publicKey, blockchain, network) {
//     const uniqueIdentifier = crypto.createHash('sha256').update(publicKey).digest('hex');
//     const did = `did:iden3:${blockchain}:${network}:${uniqueIdentifier}`;
//     const didDocument = {
//         "@context": "https://www.w3.org/ns/did/v1",
//         id: did,
//         verificationMethod: [
//             {
//                 id: `${did}#keys-1`,
//                 type: "Ed25519VerificationKey2020",
//                 controller: did,
//                 publicKeyMultibase: publicKey,
//             },
//         ],
//         authentication: [`${did}#keys-1`],
//     };

//     return { did, didDocument };
// }

// module.exports = {
//     generateKeyPair,
//     generateDID,
// };
