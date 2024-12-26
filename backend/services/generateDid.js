const { Identity } = require('@iden3/js-iden3-core');
const { generateKeyPair } = require('@iden3/js-crypto');

async function generateDid(blockchain, network) {
  // Generate a key pair
  const { publicKey, privateKey } = await generateKeyPair();

  // Create a new identity
  const identity = new Identity({
    blockchain,
    network,
    publicKey,
  });

  // Generate the DID
  const did = `did:iden3:${blockchain}:${network}:${identity.id}`;

  return {
    did,
    publicKey,
    privateKey,
  };
}

// Example usage
(async () => {
  const blockchain = 'polygon';
  const network = 'mainnet';
  const { did, publicKey, privateKey } = await generateDid(blockchain, network);

  console.log('DID:', did);
  console.log('Public Key:', publicKey);
  console.log('Private Key:', privateKey);
})();