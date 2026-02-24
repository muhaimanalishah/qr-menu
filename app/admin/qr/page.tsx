'use client';
import dynamic from 'next/dynamic';
import { AdminContainer } from '@/components/admin/admin-container';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

export default function QRCodePage() {
  const menuUrl = 'http://localhost:3000/menu';

  return (
    <AdminContainer
      header={
        <div>
          <h1 className="text-2xl font-semibold">Menu QR Code</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Share your menu with customers
          </p>
        </div>
      }
      toolbar={
        <Button onClick={() => window.print()} variant="outline">
          <Printer className="h-4 w-4 mr-2" />
          Print
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-6">
        <div className="p-4 bg-white shadow-lg rounded-xl">
          {/* <MenuQRCode url={menuUrl} /> */}
        </div>
      </div>
    </AdminContainer>
  );
}
