// //const { generateKeyPair, generateDID } = require('../services/didService');
// const DID = require('../models/Did');

// exports.createDID = async (req, res) => {
//     try {
//         const { blockchain, network } = req.body; // Receive network details from frontend
//         if (!blockchain || !network) {
//             return res.status(400).json({ error: 'Blockchain and network are required.' });
//         }

//         const { publicKey, privateKey } = generateKeyPair();
//         const { did, didDocument } = await generateDID(publicKey, blockchain, network);

//         // Optionally store the DID in the database
//         const didEntry = new DID({
//             did,
//             userId: req.userId,  // Assuming user authentication is handled
//             networkConfig: { blockchain, network },
//             publicKey,
//             privateKey,
//             didDocument
//         });
        
//         await didEntry.save();

//         res.status(200).json({ did, didDocument, privateKey });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to create DID' });
//     }
// };

// exports.getDID = async (req, res) => {
//     try {
//         const { publicKey } = req.query;

//         if (!publicKey) {
//             return res.status(400).json({ error: 'Public key is required' });
//         }

//         // Recreate the DID and DID Document from the public key
//         const { did, didDocument } = await generateDID(publicKey);

//         res.status(200).json({ did, didDocument });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to fetch DID' });
//     }
// };
