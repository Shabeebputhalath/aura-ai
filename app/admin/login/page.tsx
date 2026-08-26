'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AdminAuthModal from '@/components/admin/AdminAuthModal';

export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
      <AdminAuthModal
        onAuthenticated={() => {
          router.push('/admin');
        }}
      />
    </div>
  );
}
