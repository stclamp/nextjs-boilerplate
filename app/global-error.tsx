'use client';

import {useEffect} from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & {digest?: string};
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
          <div style={{textAlign: 'center'}}>
            <h2 style={{marginBottom: '16px', fontSize: '24px', fontWeight: 'bold'}}>Something went wrong!</h2>
            <button onClick={() => reset()} style={{padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px', border: 'none', cursor: 'pointer'}}>
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
