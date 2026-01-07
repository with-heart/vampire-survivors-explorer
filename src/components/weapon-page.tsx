import { Icon } from '@/components/icon'
import type { PrimaryWeaponEntry } from '@/schema'

export function WeaponPage({ entry }: { entry: PrimaryWeaponEntry }) {
  return (
    <main className="main flex flex-col gap-3 px-2">
      <header className="flex gap-2 items-center">
        <Icon alt="" frameName={entry.frameName} size={24 * 2} />
        <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-300">
          {entry.name}
        </h1>
      </header>

      {(entry.description?.length ?? 0) > 2 ?
        <p className="italic">{entry.description}</p>
      : undefined}

      <pre>
        <code>{JSON.stringify(entry, null, 2)}</code>
      </pre>
    </main>
  )
}
