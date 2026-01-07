import * as S from 'effect/Schema'
import { WeaponJson } from './schema'
import weaponJson from './weapon.json'

export const weaponEntriesById = S.decodeSync(WeaponJson)(
  weaponJson as unknown as any,
)

export const primaryWeaponEntriesById = Object.fromEntries(
  Object.entries(weaponEntriesById).map(([id, entries]) => [id, entries[0]]),
)
