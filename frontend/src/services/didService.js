const API_URL = 'https://917b-110-227-204-245.ngrok-free.app/api/did';

/**
 * Create a new DID using fetch.
 */
export const createDID = async () => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST', // specify the HTTP method
      headers: {
        'Content-Type': 'application/json', // Content type if needed
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create DID');
    }

    const data = await response.json(); // Parse the response as JSON
    console.log('DID Creation Response:', data);
    return data;
  } catch (error) {
    console.error('Error creating DID:', error);
    throw error; // Rethrow the error so it can be caught by the calling function
  }
};

/**
 * Generate a DID key pair.
 */
export const generateKeyPair = async () => {
  try {
    // Call the createDID function first to generate DID (or modify it to handle only key pair generation)
    const didData = await createDID();

    if (!didData.didDocument || !didData.didDocument.verificationMethod) {
      throw new Error('Invalid DID document structure.');
    }

    const privateKey = didData.privateKey; // Assuming privateKey is in the response
    const publicKey = didData.didDocument.verificationMethod[0].publicKeyMultibase; // Public key from DID document

    console.log('Generated Public Key:', publicKey);
    console.log('Generated Private Key:', privateKey);

    return { publicKey, privateKey };
  } catch (error) {
    console.error('Error generating key pair:', error);
    throw error; // Rethrow the error for further handling
  }
};
