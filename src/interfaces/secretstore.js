// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

const { Address, Data, Hash } = require('../types');
const { withPreamble } = require('../helpers');

module.exports = withPreamble(`
Parity has separate RPC API set - secretstore, which:

- is available in default Parity client (i.e. does not requires Parity to be built with \`--features secretstore\`);
- is considered unsafe and must be enabled separately (by passing secretstore, all or safe as an \`--jsonrpc-apis\` argument value);
- contains dangerous methods and must be enabled with caution.
`, {
    encrypt: {
      desc: 'This method can be used after running document key retrieval session or server and document key generation session. You can use it to encrypt small document:',
      params: [
        {
          type: Address,
          desc: 'address of account, which was used as requester in document [key retrieval session](Secret-Store#document-key-retrieval-session);',
          example: '0x00a329c0648769A73afAc7F9381E08FB43dBEA72'
        },
        {
          type: String,
          desc: 'password for the passed account;',
          example: ''
        },
        {
          type: Data,
          desc: 'Data returned by [document key retrieval session](Secret-Store#document-key-retrieval-session);',
          example: '0x049b05477a02b3197d568e1fa6fbfa4152316eea499d4f6c1c72f215246f87cf910bbd0951067466e8eb8d05437686ab6cf15caaffc9388a5b6c1cfc65eae556c949bae498a36c3bd630b47d852593f9ff9e0cac62e611afc0ae620ccf74b7e3925f2becb64a3afa7d74c33b8761d69af052dd8363d9dd28516ab80521399774737ec98d04bd118325fc242098e71fd9641430b7bde42f6845b86d61fa5fc6b77920c8eca923da955cd136cdc79467bba4'
        },
        {
          type: Data,
          desc: 'hex-encoded document data;',
          example: '0xdeadbeef'
        }],
      returns: {
        type: Data,
        desc: 'Encrypted document',
        example: '0xd164666d070be4d527285a40e84e8d17bf3e88fc'
      }
    },
    decrypt: {
      desc: 'This method can be used to decrypt document, encrypted by `secretstore_encrypt` method.',
      params: [
        {
          type: Address,
          desc: 'address of account, which was used as requester in document [key retrieval session](Secret-Store#document-key-retrieval-session);',
          example: '0x00a329c0648769A73afAc7F9381E08FB43dBEA72'
        },
        {
          type: String,
          desc: 'password for the passed account;',
          example: ''
        },
        {
          type: Data,
          desc: 'Data returned by [document key retrieval session](Secret-Store#document-key-retrieval-session);',
          example: '0x049b05477a02b3197d568e1fa6fbfa4152316eea499d4f6c1c72f215246f87cf910bbd0951067466e8eb8d05437686ab6cf15caaffc9388a5b6c1cfc65eae556c949bae498a36c3bd630b47d852593f9ff9e0cac62e611afc0ae620ccf74b7e3925f2becb64a3afa7d74c33b8761d69af052dd8363d9dd28516ab80521399774737ec98d04bd118325fc242098e71fd9641430b7bde42f6845b86d61fa5fc6b77920c8eca923da955cd136cdc79467bba4'
        },
        {
          type: Data,
          desc: 'the encrypted document data (result of `secretstore_encrypt` call);',
          example: '0xd164666d070be4d527285a40e84e8d17bf3e88fc'
        }],
      returns: {
        type: Data,
        desc: 'Decrypted document',
        example: '0xdeadbeef'
      }
    },
    shadowDecrypt: {
      desc: 'This method can be used to decrypt document, encrypted by `[secretstore_encrypt](#secretstore_encrypt)` method before.',
      params: [
        {
          type: Address,
          desc: 'address of account, which was used as requester in document [key retrieval session](Secret-Store#document-key-retrieval-session);',
          example: '0xfeacd0d28fd158ba2d3adb6d69d20c723214edc9'
        },
        {
          type: String,
          desc: 'password for the passed account;',
          example: 'bobpwd'
        },
        {
          type: Data,
          desc: 'the value of `decrypted_secret` field from [document key shadow retrieval](Secret-Store#document-key-shadow-retrieval-session) session result;',
          example: '0x9b5aa977f537d24c5f523f67a95329bdd147e6be1b0d913c1506d2a0a210ab24ce380787d9b81f88fd05dfcfc083c8df56569a763440a1159a41db144a0d3d6b'
        },
        {
          type: Data,
          desc: 'the value of `common_point` field from [document key shadow retrieval](Secret-Store#document-key-shadow-retrieval-session) session result;',
          example: '0xf0e62b05b68b1847ad948572a1b04a91dee7d7dca2f675fd00c136eb706d4916fb1fcdd446ab9df236eba3ab8d6184b7b3f4e8584259b5e2dc6dff8bcb07c632'
        },
        {
          type: Array,
          desc: 'the value of `decrypt_shadows` field from [document key shadow retrieval](Secret-Store#document-key-shadow-retrieval-session) session result;',
          example: ['0x0478055ba0c544032560c4db1fbe02cd848217a9d9e476dc3a4f7f2c6dbe9535f64b947d813a42e77a3d21ccbd46a50f10c6a556daa897ed4e80d9938f696b2efde9558da7a1e0c2290fc97d0594a134a2a2fc316250808fb43e42bcfb3586e74a97dde2c6403f25b0952e15e7b2a4d11dab01f1d77d0e39fc98a83bf2971e190bed38108dfe9f6be7c29f9fe1c868df7c', '0x04733d896fc8279b3c8209e10dd12f7c052ac9d8f171dff174e2183f68720294b162e879166ae744883c74cbe56528c2908a4d17c6f245d9158491351cc1f11ecf79f8e9b828963e07c839eaf923c2db29d2c85d282326f83e9ccac334e3abf3e99b7e41811940426f97995494e2bae53f0ddd38ccd6dba26847723a77629f703c564c14da4880521e192976e09e7499a4']
        },
        {
          type: Data,
          desc: 'the encrypted document data (result of `secretstore_encrypt` call);',
          example: '0x237ac394e3f6cbe7395fc7076a3b58036a0e185a519e41b35a87ba73679cc1bb'
        }],
      returns: {
        type: Data,
        desc: 'The decrypted document',
        example: '0x6d79536563726574446f63756d656e74'
      }
    },
    serversSetHash: {
      desc: 'Computes the hash of nodes ids, required to compute nodes set signature for manual [nodes set change session](Secret-Store-Configuration#changing-servers-set-configuration)',
      params: [
        {
          type: Array,
          desc: 'Set of node id',
          example: ['0x843645726384530ffb0c52f175278143b5a93959af7864460f5a4fec9afd1450cfb8aef63dec90657f43f55b13e0a73c7524d4e9a13c051b4e5f1e53f39ecd91', '0x07230e34ebfe41337d3ed53b186b3861751f2401ee74b988bba55694e2a6f60c757677e194be2e53c3523cc8548694e636e6acb35c4e8fdc5e29d28679b9b2f3']
        }
      ],
      returns:
      {
        type: Data,
        desc: 'the hash of nodes ids',
        example: '0x67d808b1c7a0e5521d6e1b91c9604eaa303e5cd40149fc7af5731e0274845357'
      }
    },
    generateDocumentKey: {
      desc: 'This method is used to securely generate document key, so that it remains unknown to all key servers.',
      params: [
        {
          type: Address,
          desc: 'address of account, which was used as requester in document [key retrieval session](Secret-Store#document-key-retrieval-session);',
          example: '0x00a329c0648769A73afAc7F9381E08FB43dBEA72'
        },
        {
          type: String,
          desc: 'password for the passed account;',
          example: ''
        },
        {
          type: Data,
          desc: 'Data returned by [document key retrieval session](Secret-Store#document-key-retrieval-session);',
          example: '0x049b05477a02b3197d568e1fa6fbfa4152316eea499d4f6c1c72f215246f87cf910bbd0951067466e8eb8d05437686ab6cf15caaffc9388a5b6c1cfc65eae556c949bae498a36c3bd630b47d852593f9ff9e0cac62e611afc0ae620ccf74b7e3925f2becb64a3afa7d74c33b8761d69af052dd8363d9dd28516ab80521399774737ec98d04bd118325fc242098e71fd9641430b7bde42f6845b86d61fa5fc6b77920c8eca923da955cd136cdc79467bba4'
        }],
      returns: {
        type: Object,
        desc: 'All required data to encrypt your document',
        details: {
          common_point: {
            type: Data,
            desc: 'To be used in [document key storing session](Secret-Store#document-key-storing-session) in conjunction with `encrypted_point` to safely store document key in the Secret Store',
            example: '0xff67022701f180a881a0fb7ce6a0370e64c9a1c7b2d4429fb4b5f41b2e74520289807769a02d5b6a35fa2c41b420d26187d7f8a0ea1f6cc19346f7b6208dbdac'
          },
          encrypted_key: {
            type: Data,
            desc: 'Encryption key to use `secretstore_encrypt`',
            example: '0x0468bb2e0b7ebbdd7d3d43372a653561c3fca0361aa18054156ed21ceeb3b424b0b7fc52fd4c99a8346156b7d45bc81fc556027276c07663a71dd30d7ec9626883729ea93d7f854352c7a8c36db0027c6be68d89f8ea6e71a35e72a2fdf646b0b69eb76ffc9ccc0725835fcfee3bad65206c6ac2048ea120e394bbdfb46d08d82cb0db03035fdf783d4a594fe407e9d67da94dd8eda706d4a52d9910a018b52908fc4dc016ec48f6ef099ade946192c781'
          },
          encrypted_point: {
            type: Data,
            desc: 'To be used in [document key storing session](Secret-Store#document-key-storing-session) in conjunction with `common_point` to safely store document key in the Secret Store',
            example: '0xed6ab24f91afd8f5c2a6d98e2ea1cfeb9bafff83f02a659628d7684c0f0453706d041adc414e7bb63ae24bf54a39eb0e6a387235e2463aabe788b92ca4ca234d'
          }
        }
      }
    },
    signRawHash: {
      desc: 'This method is used to compute recoverrable ECDSA signatures, used in Secret Store: signatures of server key id and signatures of nodes set hash.\n **WARNING**: this method can be used to generate Ethereum-compatible signature of arbitrary hash, and should be enabled with caution.',
      params: [
        {
          type: Address,
          desc: 'address of account, which was used as requester in document [key retrieval session](Secret-Store#document-key-retrieval-session);',
          example: '0x00a329c0648769A73afAc7F9381E08FB43dBEA72'
        },
        {
          type: String,
          desc: 'password for the passed account;',
          example: ''
        },
        {
          type: Hash,
          desc: '256-bit hash to be signed (server key id or nodes set hash).',
          example: '0x0000000000000000000000000000000000000000000000000000000000000001'
        }],
      returns: {
        type: Data,
        desc: "Signed message with the given account's private key.",
        example: '0x7e11e1023d77135d6f395656fc66eeeffe7795824f1a5b2ffc78b1c5e8c84d5503de758f549a1372f797e124c0bd7b9f351bd8d6a8fa7cb4f173e8b431912aa300'
      }
    }
  });
