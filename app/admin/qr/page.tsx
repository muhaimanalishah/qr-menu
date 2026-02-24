'use client';
import dynamic from 'next/dynamic';

export default function QRCodePage() {
  const menuUrl = 'http://localhost:3000/menu';

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Menu QR Code</h1>
      <div className="p-4 bg-white shadow-lg rounded-xl">
        {/* <MenuQRCode url={menuUrl} /> */}
      </div>
      <button onClick={() => window.print()} className="mt-4 border p-2">
        Print
      </button>
    </div>
  );
}
