import { QRCodeCanvas } from 'qrcode.react'

type Props = {
  value: string
}

export default function QRCodePanel({ value }: Props) {
  return (
    <QRCodeCanvas
      value={value}
      size={240}
    />
  )
}
