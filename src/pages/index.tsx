import { Icon } from '@/icon'
import { isValidEntry, nameLocaleCompare } from '@/primary-weapon-entry'
import * as Weapon from '@/weapon'
import { Geist } from 'next/font/google'
import { ChangeEvent, useCallback, useState } from 'react'
import weaponJson from '../../public/weapon.json'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

// @ts-expect-error ignore error from automatic json import typing
const weaponById = Weapon.decodeSync(weaponJson)
const primaryWeaponEntries = Object.values(weaponById)
  .map(Weapon.getPrimaryWeaponEntry)
  .filter(isValidEntry)
  .toSorted(nameLocaleCompare)

const useSearch = () => {
  const [value, setSearch] = useState('')
  const results = primaryWeaponEntries.filter((e) =>
    e.name.toLowerCase().includes(value.toLowerCase()),
  )

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])

  return {
    value,
    results,
    onChange,
  }
}

export default function Home() {
  const { value: searchValue, results, onChange: onSearchChange } = useSearch()

  return (
    <div
      className={`${geistSans.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full max-w-[40ch] flex-col items-stretch py-32 px-16 bg-white dark:bg-black gap-3">
        <input
          value={searchValue}
          onChange={onSearchChange}
          className="bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950 px-2 py-1"
        />

        {results.length > 0 ?
          <ul className="flex flex-col gap-2 w-full">
            {results.map((entry) => (
              <li key={entry.id} className="flex items-center gap-1">
                <Icon frameName={entry.frameName} alt={entry.name} size={24} />{' '}
                {entry.name}
              </li>
            ))}
          </ul>
        : <p>No results found</p>}
      </main>
    </div>
  )
}
