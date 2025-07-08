'use client';

import { Suspense } from 'react';
import UseResetPassword from './UseResetPassword';

export default function UseResetPasswordWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UseResetPassword />
    </Suspense>
  );
}
