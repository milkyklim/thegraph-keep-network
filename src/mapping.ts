import {
  Grant,
  Stake,
  StakingContract,
  Transaction,
  Withdrawal,
} from '../generated/schema'
import {
  StakingContractAuthorized,
  TokenGrantCreated,
  TokenGrantRevoked,
  TokenGrantStaked,
  TokenGrantWithdrawn,
} from '../generated/TokenGrant/TokenGrant'
import { createId, createTransaction } from './utils'

export function handleStakingContractAuthorized(event: StakingContractAuthorized): void {
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  let stakingContract = new StakingContract(event.params.stakingContract.toHex())

  if (transaction == null) {
    transaction = createTransaction(event.transaction, event.block)
  }
  stakingContract.transaction = transaction.id

  transaction.save()
  stakingContract.save()
}

export function handleTokenGrantCreated(event: TokenGrantCreated): void {
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  let grant = new Grant(event.params.id.toString())

  if (transaction == null) {
    transaction = createTransaction(event.transaction, event.block)
  }
  grant.status = 'Active'
  grant.transaction = transaction.id

  transaction.save()
  grant.save()
}

export function handleTokenGrantStaked(event: TokenGrantStaked): void {
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  let stakeId = createId(event.params.grantId, event.transaction.hash)
  // @ts-ignore: assign wrapper object to primitive
  let stake = new Stake(stakeId)
  let grant = Grant.load(event.params.grantId.toString())

  if (transaction == null) {
    transaction = createTransaction(event.transaction, event.block)
  }
  stake.grantId = grant.id
  stake.amount = event.params.amount
  stake.transaction = transaction.id

  transaction.save()
  stake.save()
}

export function handleTokenGrantWithdrawn(event: TokenGrantWithdrawn): void {
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  let withdrawalId = createId(event.params.grantId, event.transaction.hash)
  // @ts-ignore: assign wrapper object to primitive
  let withdrawal = new Withdrawal(withdrawalId)
  let grant = Grant.load(event.params.grantId.toString())

  if (transaction == null) {
    transaction = createTransaction(event.transaction, event.block)
  }
  withdrawal.grantId = grant.id
  withdrawal.amount = event.params.amount
  withdrawal.transaction = transaction.id

  transaction.save()
  withdrawal.save()
}

export function handleTokenGrantRevoked(event: TokenGrantRevoked): void {
  let transaction = Transaction.load(event.transaction.hash.toHexString())
  let grant = Grant.load(event.params.id.toString())

  if (transaction == null) {
    transaction = createTransaction(event.transaction, event.block)
  }
  grant.status = 'Revoked'
  grant.transaction = transaction.id

  transaction.save()
  grant.save()
}
