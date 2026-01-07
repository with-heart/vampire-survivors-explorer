import { Icon } from '@/components/icon'
import type { PrimaryWeaponEntry } from '@/schema'
import { primaryWeaponEntriesById } from '@/weapon'
import { clsx } from 'clsx'
import { Sprite } from './sprite'

export function WeaponPage({ entry }: { entry: PrimaryWeaponEntry }) {
  return (
    <main className="main mx-1 flex flex-col gap-4 px-2">
      <header className="flex items-center gap-2">
        <Icon alt="" frameName={entry.frameName} size={24 * 2} />
        <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-300">
          {entry.name}
        </h1>
      </header>

      {(entry.description?.length ?? 0) > 2 ?
        <p className="italic">{entry.description}</p>
      : undefined}

      <EvolutionInfo entry={entry} />

      <pre>
        <code>{JSON.stringify(entry, null, 2)}</code>
      </pre>
    </main>
  )
}

function EvolutionInfo({ entry }: { entry: PrimaryWeaponEntry }) {
  if (entry.isEvolution && entry.evolvesFrom) {
    const items = [
      ...entry.evolvesFrom.map((id) => primaryWeaponEntriesById[id]),
      entry,
    ]

    return (
      <ul className="flex items-center gap-1 px-2 text-3xl">
        {items.map((item, i) => {
          const isEntry = item === entry
          const isFirst = i === 0
          const isLast = i === items.length - 1

          return (
            <li key={item.id} className="flex items-center">
              {!isFirst ?
                <span className="mx-2" aria-hidden>
                  {isLast ? '=' : '+'}
                </span>
              : undefined}

              <span
                className={clsx('relative inline-flex', {
                  "before:content-[''] after:pointer-events-none after:absolute after:-inset-1.5 after:z-0 after:rounded-full after:bg-yellow-200 after:opacity-60":
                    isEntry,
                })}
              >
                <span className="z-10">
                  <Sprite
                    alt={item.name}
                    frameName={item.frameName}
                    size={36}
                  />
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    )
  }

  if (entry.isEvolution && entry.evolvesFrom) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h2>Evolves From</h2>
          <ul className="flex flex-col gap-1">
            {entry.evolvesFrom.map((id) => {
              const fromEntry = primaryWeaponEntriesById[id]

              return (
                <li key={id} className="flex items-center gap-1">
                  <Icon
                    alt={fromEntry.name}
                    frameName={fromEntry.frameName}
                    size={24}
                  />
                  {fromEntry.name}
                  {entry.requiresMax?.includes(id) ?
                    <p>(max)</p>
                  : undefined}
                </li>
              )
            })}
          </ul>
        </div>

        {!!entry.requires?.length ?
          <div className="flex flex-col gap-2">
            <h2>Requires</h2>
            <ul className="flex flex-col gap-1">
              {entry.requires.map((id) => {
                const requiresEntry = primaryWeaponEntriesById[id]

                return (
                  <li key={id} className="flex items-center gap-1">
                    <Icon
                      alt={requiresEntry.name}
                      frameName={requiresEntry.frameName}
                      size={24}
                    />
                    {requiresEntry.name}
                    {entry.requiresMax?.includes(id) ?
                      <p>(max)</p>
                    : undefined}
                  </li>
                )
              })}
            </ul>
          </div>
        : undefined}
      </div>
    )
  }

  if (entry.evoInto && entry.evoSynergy) {
    const evoInto = primaryWeaponEntriesById[entry.evoInto]
    const items = [
      entry,
      ...entry.evoSynergy.map((id) => primaryWeaponEntriesById[id]),
      evoInto,
    ]

    return (
      <ul className="flex items-center gap-1 px-2 text-3xl">
        {items.map((item) => {
          const className = clsx(
            'relative flex items-center',
            "before:content-['+'] before:mx-2 first:before:content-none last:before:content-['=']",
            {
              ['after:content-[""] after:absolute after:-inset-1.5 after:rounded-full after:bg-yellow-200 after:opacity-60 after:z-0 ']:
                item === entry,
            },
          )
          return (
            <li key={item.id} className={className}>
              <span className="z-10">
                <Sprite alt={item.name} frameName={item.frameName} size={36} />
              </span>
            </li>
          )
        })}
      </ul>
    )
  }

  if (entry.evoInto) {
    const evoInto = primaryWeaponEntriesById[entry.evoInto]

    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h2>Evolves Into</h2>
          <div className="flex items-center gap-1">
            <Icon alt={evoInto.name} frameName={evoInto.frameName} size={24} />
            <p>{evoInto.name}</p>
          </div>
        </div>

        {!!entry.evoSynergy?.length ?
          <div className="flex flex-col gap-2">
            <h2>Evo Synergy</h2>
            <ul className="flex flex-col gap-1">
              {entry.evoSynergy.map((id) => {
                const synergyEntry = primaryWeaponEntriesById[id]

                return (
                  <li key={id} className="flex items-center gap-1">
                    <Icon
                      alt={synergyEntry.name}
                      frameName={synergyEntry.frameName}
                      size={24}
                    />
                    <p>{synergyEntry.name}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        : undefined}
      </div>
    )
  }

  return undefined
}
