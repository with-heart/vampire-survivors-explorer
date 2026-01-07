import { Image } from '@unpic/react';

export function Icon(props: { alt: string; frameName: string; size: number }) {
  return (
    <Image
      alt={props.alt}
      src={`/icons/${props.frameName}`}
      width={props.size}
      height={props.size}
    />
  )
}
