import type { PrimaryWeaponEntry } from './schema'

export const hasValidName = (entry: PrimaryWeaponEntry): boolean =>
  entry.name.trim().length !== 0 && entry.name !== '.' && entry.name !== '-'

export const isAlwaysHidden = (entry: PrimaryWeaponEntry): boolean =>
  Boolean(entry.alwaysHidden)

export const isSpecialOnly = (entry: PrimaryWeaponEntry): boolean =>
  Boolean(entry.isSpecialOnly)

export const isValidEntry = (entry: PrimaryWeaponEntry): boolean =>
  hasValidName(entry) && !isAlwaysHidden(entry) && !isSpecialOnly(entry)

export const nameLocaleCompare = (
  a: PrimaryWeaponEntry,
  b: PrimaryWeaponEntry,
) => a.name.localeCompare(b.name)
