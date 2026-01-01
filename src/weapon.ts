import { PrimaryWeaponEntry, WeaponEntries, WeaponJson } from './schema'
import * as S from 'effect/Schema'

export const decodeSync = S.decodeSync(WeaponJson)

export const getPrimaryWeaponEntry = (
  entries: WeaponEntries,
): PrimaryWeaponEntry => entries[0]
