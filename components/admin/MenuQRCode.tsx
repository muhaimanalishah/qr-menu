'use client';
import { QRCode } from 'react-qrcode-logo';

export default function MenuQRCode({ url }: { url: string }) {
  return <QRCode value={url} size={280} qrStyle="dots" eyeRadius={10} />;
}
