import { Icon } from '@/icon'
import { isValidEntry, nameLocaleCompare } from '@/primary-weapon-entry'
import type { PrimaryWeaponEntry } from '@/schema'
import * as Weapon from '@/weapon'
import weaponJson from '@/weapon.json'
import { Input } from '@base-ui/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { clsx } from 'clsx'
import type { ComponentProps } from 'react'
import { useCallback, useState } from 'react'

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

  const onChange = useCallback((newValue: string) => {
    setSearch(newValue)
  }, [])

  return {
    results,
    onChange,
  }
}

export const Route = createFileRoute('/{-$id}')({
  component: Home,
})

function Home() {
  const { id = 'BOCCE' } = Route.useParams()
  const entries = weaponById[id]
  const entry = Weapon.getPrimaryWeaponEntry(entries)
  const { results, onChange: onSearchChange } = useSearch()

  return (
    <div className="app bg-zinc-50 font-sans dark:bg-black">
      <div className="search">
        <Input
          defaultValue=""
          onValueChange={onSearchChange}
          className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        />
      </div>
      <header className="header self-center">
        <h1 className="text-lg text-zinc-700 dark:text-zinc-300">
          Vampire Survivors Explorer
        </h1>
      </header>
      <aside className="sidebar">
        <ul className="flex flex-col gap-1 w-full">
          {primaryWeaponEntries.map((primaryEntry) => (
            <WeaponBox
              key={primaryEntry.id}
              entry={primaryEntry}
              isHidden={!results.includes(primaryEntry)}
            />
          ))}
        </ul>

        {results.length === 0 ?
          <p>No results found</p>
        : undefined}
      </aside>
      <main className="main flex flex-col gap-3">
        <header className="flex gap-2 items-center">
          <Icon alt="" frameName={entry.frameName} size={24 * 2} />
          <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-300">
            {entry.name}
          </h1>
        </header>

        <div>
          <p>Rarity: {entry.rarity}</p>
          {(entry.description?.length ?? 0) > 2 ?
            <p className="italic">{entry.description}</p>
          : undefined}
        </div>

        <pre>
          <code>{JSON.stringify(entry, null, 2)}</code>
        </pre>
      </main>
      <footer className="footer">Footer</footer>
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
    <li>
      <Link
        to="."
        params={{ id: entry.id }}
        className={clsx(
          'flex items-center gap-1 rounded-sm grow p-1 dark:focus:bg-zinc-800 focus:bg-zinc-200 dark:hover:bg-zinc-900 hover:bg-zinc-100',
          {
            hidden: isHidden,
          },
        )}
      >
        <Icon alt="" frameName={entry.frameName} size={24} />
        {entry.name}
      </Link>
    </li>
  )
}
