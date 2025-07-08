'use client';

import { Suspense } from 'react';
import SuccessReservation from './page';

export default function SuccessReservationWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessReservation />
    </Suspense>
  );
}
