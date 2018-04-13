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

const { Data, BlockNumber, TransactionRequest, PrivateTransactionResponse } = require('../types');
const { fromDecimal } = require('../helpers');

module.exports = {
  sendTransaction: {
    desc: 'Make an onchain call to the private contract in order to modify its state.',
    params: [
      {
        type: Data,
        desc: 'Signed regular transaction (in hex)',
        example: '0xf8840180830e57e094cd96d189596c690ff983e4e14d1838d0305186dc80a4bc64b76d2a0000000000000000000000000000000000000000000000000000000000000045a00b3aa43f869f087a3aec97ba4232b15f9f0ab964c17953ca556b944e424d1f84a058d6edf93ad3c2bb0f0513e9ef391bbe8f7400668aaa51344ee4bf1a587e0218'
      }
    ],
    returns: {
      type: PrivateTransactionResponse,
      desc: 'Response object desribing the result of the call',
      example: {
        transactionHash: '0x63c715e88f7291e66069302f6fcbb4f28a19ef5d7cbd1832d0c01e221c0061c6',
        contractAddress: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
        status: fromDecimal(0)
      }
    }
  },

  call: {
    desc: 'Make an local call to the private contract (without its state modification).',
    params: [
      {
        type: BlockNumber,
        desc: 'integer block number, or the string `\'latest\'`, `\'earliest\'`, see the [default block parameter](#the-default-block-parameter).',
        format: 'inputDefaultBlockNumberFormatter',
        example: fromDecimal(2)
    },
    {
        type: TransactionRequest,
        desc: 'The transaction object corresponding to the call',
        example: {
          from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
          to: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
          data: '0x41cd5add4fd13aedd64521e363ea279923575ff39718065d38bd46f0e6632e8e'
        }
    }
    ],
    returns: {
        type: Data,
        desc: 'Result of the call',
        example: '0x62e05075829655752e146a129a044ad72e95ce33e48ff48118b697e15e7b41e4'
    }
  }
};
