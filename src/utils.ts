import { BigInt, Bytes, ethereum as eth } from '@graphprotocol/graph-ts'

import { Transaction } from '../generated/schema'

// make a derived ID from transaction hash and big number
export function createId(n: BigInt, tx: Bytes): String {
  return n.toHex() + '-' + tx.toHex()
}

export function createTransaction(tx: eth.Transaction, block: eth.Block): Transaction {
  let transaction = new Transaction(tx.hash.toHexString())
  transaction.timestamp = block.timestamp
  transaction.block = block.number

  return transaction
}
