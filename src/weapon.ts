import * as S from 'effect/Schema'
import type { PrimaryWeaponEntry, WeaponEntries } from './schema'
import { WeaponJson } from './schema'
import weaponJson from './weapon.json'

export const decodeSync = S.decodeSync(WeaponJson)

export const getPrimaryWeaponEntry = (
  entries: WeaponEntries,
): PrimaryWeaponEntry => entries[0]

export const loadWeaponJson = () => decodeSync(weaponJson as unknown as any)

export const loadPrimaryWeaponEntries = (): Array<PrimaryWeaponEntry> => {
  const weapons = loadWeaponJson()
  const primaryEntries = Object.values(weapons).map(getPrimaryWeaponEntry)
  return primaryEntries
}
