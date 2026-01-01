import { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'

export default function Icons(
  props: InferGetServerSidePropsType<typeof getStaticProps>,
) {
  return (
    <main>
      <ul className="flex flex-wrap">
        {props.icons.map((icon) => (
          <li key={icon}>
            <Image src={icon} width={24} height={24} alt="" />
          </li>
        ))}
      </ul>
    </main>
  )
}

export async function getStaticProps() {
  const publicDirectory = path.join(process.cwd(), 'public')
  const iconsDirectory = path.join(publicDirectory, 'icons')

  const files = await Array.fromAsync(fs.glob(`${iconsDirectory}/*.png`))
  const icons = files.map(
    (file) =>
      '/' + path.relative(publicDirectory, file).replaceAll(path.sep, '/'),
  )
  return { props: { icons } }
}
