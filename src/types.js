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

class Address {}

class Data {}

class Float {}

class Hash {}

class Integer {}

class Quantity {}

class BlockNumber {}

class EIP712 {}

class EIP191 {}

class PresignedTransaction {}

PresignedTransaction.details = {
  data: {
    type: Data,
    desc: 'Presigned Transaction data'
  },
  validator: {
    type: Address,
    desc: 'address of the contract that validates the presigned transaction'
  }
}

EIP191.print = '`EIP712` or `Data` or `PresignedTransaction`'

BlockNumber.print = '`Quantity` or `Tag`'

class CallRequest {}

CallRequest.print = '`Object`'

EIP712Domain.print = {
  name: {
    type: String,
    desc: 'User readable name of signing domain, i.e. the name of the DApp or the protocol',
    example: 'Ether Mail'
  },
  verifyingContract: {
    type: Address,
    desc: 'Address of the contract that verifies the signed message'
  },
  chainId: {
    type: Integer,
    desc: 'chain id this signature is valid for to prevent chain replay attacks'
  },
  version: {
    type: Integer,
    desc: 'The current major version of the signing domain. Signatures from different versions are not compatible.'
  },
  salt: {
    type: Data,
    desc: '(Optional) should be used as a last resort domain seperator'
  }
}

EIP712.print = {
  primaryType: {
    type: String,
    desc: 'name of the struct defined in `types` that is the same type as `message`'
  },
  domain: {
    type: EIP712Domain,
    desc: 'EIP712Domain'
  },
  message: {
    type: Object,
    desc: 'Structured message to be signed',
    example: {
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
  },
  types: {
    type: Object,
    desc: "type definitions for the EIP712Domain and the primaryType as well as it's dependent types",
    example: {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
      ],
      Person: [{ name: 'name', type: 'string' }, { name: 'wallet', type: 'address' }],
      Mail: [{ name: 'from', type: 'Person' }, { name: 'to', type: 'Person' }, { name: 'contents', type: 'string' }]
    }
  }
}

CallRequest.details = {
  from: {
    type: Address,
    desc: '20 Bytes - The address the transaction is send from.',
    optional: true
  },
  to: {
    type: Address,
    desc: '(optional when creating new contract) 20 Bytes - The address the transaction is directed to.'
  },
  gas: {
    type: Quantity,
    desc:
      'Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.',
    optional: true
  },
  gasPrice: {
    type: Quantity,
    desc: 'Integer of the gas price used for each paid gas.',
    optional: true
  },
  value: {
    type: Quantity,
    desc: 'Integer of the value sent with this transaction.',
    optional: true
  },
  data: {
    type: Data,
    desc:
      '4 byte hash of the method signature followed by encoded parameters. For details see [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI).',
    optional: true
  }
}

class RecoveredAccount {}

RecoveredAccount.print = '`Object`'

RecoveredAccount.details = {
  address: {
    type: Address,
    desc: 'The address recovered from the signature'
  },
  publicKey: {
    type: Quantity,
    desc: 'Public key recovered from the signature'
  },
  isValidForCurrentChain: {
    type: Boolean,
    desc: 'Flag that reports if this signture was produced for the current chain spec'
  }
}

class TransactionRequest {}

TransactionRequest.print = '`Object`'

TransactionRequest.details = {
  from: {
    type: Address,
    desc: '20 Bytes - The address the transaction is send from.'
  },
  to: {
    type: Address,
    desc: '20 Bytes - The address the transaction is directed to.',
    optional: true
  },
  gas: {
    type: Quantity,
    desc:
      'Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions.',
    optional: true
  },
  gasPrice: {
    type: Quantity,
    desc: 'Integer of the gas price used for each paid gas.',
    optional: true
  },
  value: {
    type: Quantity,
    desc: 'Integer of the value sent with this transaction.',
    optional: true
  },
  data: {
    type: Data,
    desc:
      '4 byte hash of the method signature followed by encoded parameters. For details see [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI).',
    optional: true
  },
  nonce: {
    type: Quantity,
    desc: 'Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.',
    optional: true
  },
  condition: {
    type: Object,
    desc:
      'Conditional submission of the transaction. Can be either an integer block number `{ block: 1 }` or UTC timestamp (in seconds) `{ time: 1491290692 }` or `null`.',
    optional: true
  }
}

class PrivateTransactionResponse {}

PrivateTransactionResponse.print = '`Object`'

PrivateTransactionResponse.details = {
  transactionHash: {
    type: Hash,
    desc: '32 Bytes - hash of the transaction.'
  },
  contractAddress: {
    type: Address,
    desc: '20 Bytes - address of the public contract.'
  },
  status: {
    type: Quantity,
    desc: 'Status of the request.'
  }
}

class TransactionResponse {}

TransactionResponse.print = '`Object`'

TransactionResponse.details = {
  hash: {
    type: Hash,
    desc: '32 Bytes - hash of the transaction.'
  },
  nonce: {
    type: Quantity,
    desc: 'The number of transactions made by the sender prior to this one.'
  },
  blockHash: {
    type: Hash,
    desc: '32 Bytes - hash of the block where this transaction was in. `null` when its pending.'
  },
  blockNumber: {
    type: BlockNumber,
    desc: 'Block number where this transaction was in. `null` when its pending.'
  },
  transactionIndex: {
    type: Quantity,
    desc: 'Integer of the transactions index position in the block. `null` when its pending.'
  },
  from: {
    type: Address,
    desc: '20 Bytes - address of the sender.'
  },
  to: {
    type: Address,
    desc: '20 Bytes - address of the receiver. `null` when its a contract creation transaction.'
  },
  value: {
    type: Quantity,
    desc: 'Value transferred in Wei.'
  },
  gasPrice: {
    type: Quantity,
    desc: 'Gas price provided by the sender in Wei.'
  },
  gas: {
    type: Quantity,
    desc: 'Gas provided by the sender.'
  },
  input: {
    type: Data,
    desc: 'The data send along with the transaction.'
  },
  creates: {
    type: Address,
    optional: true,
    desc: 'Address of a created contract or `null`.'
  },
  raw: {
    type: Data,
    desc: 'Raw transaction data.'
  },
  publicKey: {
    type: Data,
    desc: 'Public key of the signer.'
  },
  chainId: {
    type: Quantity,
    desc: 'The chain id of the transaction, if any.'
  },
  standardV: {
    type: Quantity,
    desc: 'The standardized V field of the signature (0 or 1).'
  },
  v: {
    type: Quantity,
    desc: 'The V field of the signature.'
  },
  r: {
    type: Quantity,
    desc: 'The R field of the signature.'
  },
  s: {
    type: Quantity,
    desc: 'The S field of the signature.'
  },
  condition: {
    type: Object,
    optional: true,
    desc: 'Conditional submission, Block number in `block` or timestamp in `time` or `null`.'
  }
}

module.exports = {
  Address,
  Data,
  Float,
  Hash,
  Integer,
  Quantity,
  BlockNumber,
  CallRequest,
  TransactionRequest,
  TransactionResponse,
  RecoveredAccount,
  PrivateTransactionResponse
}
