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

const { Address, Data, Quantity, TransactionRequest, EIP712, EIP191 } = require('../types');

module.exports = {
  ecRecover: {
    desc:
      'Returns the address associated with the private key that was used to calculate the signature in `personal_sign`.',
    params: [
      {
        type: Data,
        desc: 'The data which hash was signed.',
        example: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675'
      },
      {
        type: Data,
        desc: 'Signed data.',
        example:
          '0xe7225f986f192f859a9bf84e34b2b7001dfa11aeb5c7164f81a2bee0d79943e2587be1faa11502eba0f803bb0ee071a082b6fe40fba025f3309263a1eef52c711c'
      }
    ],
    returns: {
      type: Address,
      desc: 'Address of the signer of the message.',
      example: '0xb60e8dd61c5d32be8058bb8eb970870f07233155'
    }
  },

  listAccounts: {
    desc: 'Lists all stored accounts.',
    params: [],
    returns: {
      type: Array,
      desc: 'A list of 20 byte account identifiers.',
      example: ['0x7bf87721a96849d168de02fd6ea5986a3a147383', '0xca807a90fd64deed760fb98bf0869b475c469348']
    }
  },

  newAccount: {
    desc:
      'Creates new account.\n\n**Note:** it becomes the new current unlocked account. There can only be one unlocked account at a time.',
    params: [
      {
        type: String,
        desc: 'Password for the new account.',
        example: 'hunter2'
      }
    ],
    returns: {
      type: Address,
      desc: '20 Bytes - The identifier of the new account.',
      example: '0x8f0227d45853a50eefd48dd4fec25d5b3fd2295e'
    }
  },

  sendTransaction: {
    desc:
      'Sends transaction and signs it in a single call. The account does not need to be unlocked to make this call, and will not be left unlocked after.',
    params: [
      {
        type: TransactionRequest,
        desc: 'The transaction object',
        example: {
          from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
          to: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
          data: '0x41cd5add4fd13aedd64521e363ea279923575ff39718065d38bd46f0e6632e8e',
          value: '0x186a0'
        }
      },
      {
        type: String,
        desc: 'Passphrase to unlock the `from` account.',
        example: 'hunter2'
      }
    ],
    returns: {
      type: Data,
      desc: '32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available',
      example: '0x62e05075829655752e146a129a044ad72e95ce33e48ff48118b697e15e7b41e4'
    }
  },
  signTransaction: {
    desc:
      'Signs a transaction without dispatching it to the network. It can later be submitted using `eth_sendRawTransaction`. The account does not need to be unlocked to make this call, and will not be left unlocked after.',
    params: [
      {
        type: TransactionRequest,
        desc: 'The transaction object',
        example: {
          from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
          to: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
          data: '0x41cd5add4fd13aedd64521e363ea279923575ff39718065d38bd46f0e6632e8e',
          value: '0x186a0'
        }
      },
      {
        type: String,
        desc: 'Passphrase to unlock the `from` account.',
        example: 'hunter2'
      }
    ],
    returns: {
      type: Object,
      desc: 'Signed transaction and its details:',
      details: {
        raw: {
          type: Data,
          desc: 'The signed, RLP encoded transaction.'
        },
        tx: {
          type: TransactionRequest,
          desc: 'Transaction object.'
        }
      },
      example: {
        raw: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
        tx: {
          hash: '0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b',
          nonce: '0x0',
          blockHash: '0xbeab0aa2411b7ab17f30a99d3cb9c6ef2fc5426d6ad6fd9e2a26a6aed1d1055b',
          blockNumber: '0x15df',
          transactionIndex: '0x1',
          from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
          to: '0x853f43d8a49eeb85d32cf465507dd71d507100c1',
          value: '0x7f110',
          gas: '0x7f110',
          gasPrice: '0x09184e72a000',
          input: '0x603880600c6000396000f300603880600c6000396000f3603880600c6000396000f360'
        }
      }
    }
  },

  sign: {
    desc:
      'Calculates an Ethereum specific signature with: `sign(keccak256("Ethereum Signed Message: " + len(message) + message)))`.',
    params: [
      {
        type: Data,
        desc: 'The data to sign',
        example: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675'
      },
      {
        type: Address,
        desc: '20 Bytes - The address of the account to sign with',
        example: '0xb60e8dd61c5d32be8058bb8eb970870f07233155'
      },
      {
        type: String,
        desc: 'Passphrase to unlock the `from` account.',
        example: 'hunter'
      }
    ],
    returns: {
      type: Data,
      desc: 'Signed data.',
      example:
        '0xe7225f986f192f859a9bf84e34b2b7001dfa11aeb5c7164f81a2bee0d79943e2587be1faa11502eba0f803bb0ee071a082b6fe40fba025f3309263a1eef52c711c'
    }
  },

  signTypedData: {
    desc: 'Hashes and signs typed structured data',
    params: [
      {
        type: EIP712,
        desc: 'EIP-712 compliant data structure to be signed',
        example: {
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'version', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'verifyingContract', type: 'address' }
            ],
            Person: [{ name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }],
            Mail: [
              { name: 'from', type: 'Person' },
              { name: 'to', type: 'Person' },
              { name: 'contents', type: 'string' }
            ]
          },
          primaryType: 'Mail',
          domain: {
            name: 'Ether Mail',
            version: '1',
            chainId: 1,
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
          },
          message: {
            from: {
              name: 'Cow',
              wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
            },
            to: {
              name: 'Bob',
              wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
            },
            contents: 'Hello, Bob!'
          }
        }
      },
      {
        type: Address,
        desc: '20 Bytes - The address of the account to sign with',
        example: '0xb60e8dd61c5d32be8058bb8eb970870f07233155'
      },
      {
        type: String,
        desc: 'The account password',
        example: 'password'
      }
    ],
    returns: {
      type: Data,
      desc: 'Signed data.',
      example:
        '0xe7225f986f192f859a9bf84e34b2b7001dfa11aeb5c7164f81a2bee0d79943e2587be1faa11502eba0f803bb0ee071a082b6fe40fba025f3309263a1eef52c711c'
    }
  },

  sign191: {
    desc: 'EIP-191 compliant signing, allows signing of different data formats depending on the version specifier',
    params: [
      {
        type: String,
        desc: 'EIP-191 version specifier',
        example: '0x00 for pre-signed transactions, 0x01 for structured data(EIP712), 0x45 for personal messages'
      },
      {
        type: EIP191,
        desc: 'data to be signed, depending on the version specified in the first argument',
        example: '`PresignedTransaction` or `EIP712` or `Data`'
      },
      {
        type: Address,
        desc: '20 Bytes - The address of the account to sign with',
        example: '0xb60e8dd61c5d32be8058bb8eb970870f07233155'
      },
      {
        type: String,
        desc: 'The account password',
        example: 'password'
      }
    ],
    returns: {
      type: Data,
      desc: 'Signed data.',
      example:
        '0xe7225f986f192f859a9bf84e34b2b7001dfa11aeb5c7164f81a2bee0d79943e2587be1faa11502eba0f803bb0ee071a082b6fe40fba025f3309263a1eef52c711c'
    }
  },

  unlockAccount: {
    desc:
      'Unlocks specified account for use.\n\nIf permanent unlocking is disabled (the default) then the duration argument will be ignored, and the account will be unlocked for a single signing. With permanent locking enabled, the duration sets the number of seconds to hold the account open for. It will default to 300 seconds. Passing 0 unlocks the account indefinitely.\n\nThere can only be one unlocked account at a time.',
    params: [
      {
        type: Address,
        desc: '20 Bytes - The address of the account to unlock.',
        example: '0x8f0227d45853a50eefd48dd4fec25d5b3fd2295e'
      },
      {
        type: String,
        desc: 'Passphrase to unlock the account.',
        example: 'hunter2'
      },
      {
        type: Quantity,
        default: 300,
        desc: 'Integer or `null` - Duration in seconds how long the account should remain unlocked for.',
        example: null
      }
    ],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful',
      example: true
    }
  }
};
