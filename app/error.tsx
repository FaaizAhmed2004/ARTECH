'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Container size="sm">
        <Card className="text-center">
          <CardHeader>
            <div className="text-6xl mb-4">⚠️</div>
            <CardTitle className="text-error-600">
              Something went wrong!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-secondary-600">
              We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="text-left text-sm bg-secondary-50 p-3 rounded">
                <summary className="cursor-pointer font-medium">Error Details</summary>
                <pre className="mt-2 whitespace-pre-wrap text-xs">
                  {error.message}
                </pre>
                {error.digest && (
                  <p className="mt-2 text-xs text-secondary-500">
                    Error ID: {error.digest}
                  </p>
                )}
              </details>
            )}
            
            <div className="flex gap-2 justify-center">
              <Button onClick={reset} variant="primary">
                Try Again
              </Button>
              <Button onClick={() => window.location.href = '/'} variant="outline">
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}