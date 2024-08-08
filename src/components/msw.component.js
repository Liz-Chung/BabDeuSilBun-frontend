'use client';

import { useEffect } from 'react';

function MswComponent() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (typeof window === 'undefined') {
        (async () => {
          const { server } = await import('@/mocks/server');
          server.listen();
        })();
      } else {
        (async () => {
          const { worker } = await import('@/mocks/browser');
          worker.start();
        })();
      }
    }
  });

  return null;
}

export default MswComponent;
