import { Icon } from '@/icon'
import { isValidEntry, nameLocaleCompare } from '@/primary-weapon-entry'
import { PrimaryWeaponEntry } from '@/schema'
import * as Weapon from '@/weapon'
import { Input } from '@base-ui/react'
import { clsx } from 'clsx'
import { Geist } from 'next/font/google'
import { ComponentProps, useCallback, useState } from 'react'
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

  const onChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  return {
    results,
    onChange,
  }
}

export default function Home() {
  const { results, onChange: onSearchChange } = useSearch()

  return (
    <div
      className={`${geistSans.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full max-w-[40ch] flex-col items-stretch py-32 px-16 bg-white dark:bg-black gap-3">
        <Input
          defaultValue=""
          onValueChange={onSearchChange}
          className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        />

        <ul className="flex flex-col gap-1 w-full">
          {primaryWeaponEntries.map((entry) => (
            <WeaponBox
              key={entry.id}
              entry={entry}
              isHidden={!results.includes(entry)}
            />
          ))}
        </ul>

        {results.length === 0 ?
          <p>No results found</p>
        : undefined}
      </main>
    </div>
  )
}

function WeaponBox({
  entry,
  isHidden,
}: {
  entry: PrimaryWeaponEntry
  isHidden: boolean
} & ComponentProps<'li'>) {
  return (
    <li
      className={clsx(
        'flex items-center gap-1 rounded-sm grow p-1 dark:focus:bg-zinc-800 focus:bg-zinc-200 dark:hover:bg-zinc-900 hover:bg-zinc-100',
        {
          hidden: isHidden,
        },
      )}
      tabIndex={0}
    >
      <Icon alt="" frameName={entry.frameName} size={24} />
      {entry.name}
    </li>
  )
}
