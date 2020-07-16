import { StakingContractAuthorized, TokenGrantCreated, TokenGrantRevoked, TokenGrantStaked, TokenGrantWithdrawn } from '../generated/TokenGrant/TokenGrant'
import { Grant, StakingContract, Stake, Withdrawal } from '../generated/schema'
import { createId } from './utils'

export function handleStakingContractAuthorized(event: StakingContractAuthorized): void {
  let stakingContract = new StakingContract(event.params.stakingContract.toHex())
  stakingContract.save()
}

export function handleTokenGrantCreated(event: TokenGrantCreated): void {
  let grant = new Grant(event.params.id.toString())

  grant.status = 'ACTIVE'
  grant.save()
}

export function handleTokenGrantStaked(event: TokenGrantStaked): void {
  let stakeId = createId(event.params.grantId, event.transaction.hash)
  let stake = new Stake(stakeId)
  let grant = Grant.load(event.params.grantId.toString())

  stake.grantId = grant.id
  stake.amount = event.params.amount
  stake.save()
}

export function handleTokenGrantWithdrawn(event: TokenGrantWithdrawn): void {
  let withdrawalId = createId(event.params.grantId, event.transaction.hash)
  let withdrawal = new Withdrawal(withdrawalId)
  let grant = Grant.load(event.params.grantId.toString())

  withdrawal.grantId = grant.id
  withdrawal.amount = event.params.amount
  withdrawal.save()
}

export function handleTokenGrantRevoked(event: TokenGrantRevoked): void {
  let grant = Grant.load(event.params.id.toString())

  grant.status = 'REVOKED'
  grant.save()
}
