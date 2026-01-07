import { Image } from '@unpic/react'

export function Sprite(props: {
  alt: string
  frameName: string
  size: number
}) {
  return (
    <Image
      alt={props.alt}
      src={`/sprites/${props.frameName}`}
      width={props.size}
      height={props.size}
    />
  )
}
