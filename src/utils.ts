import { BigInt, Bytes } from '@graphprotocol/graph-ts'

// make a derived ID from transaction hash and big number
export function createId(n: BigInt, tx: Bytes): String {
  return n.toHex() + '-' + tx.toHex()
}
