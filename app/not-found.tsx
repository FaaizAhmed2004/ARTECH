import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Container size="sm">
        <Card className="text-center">
          <CardHeader>
            <div className="text-6xl mb-4">🔍</div>
            <CardTitle className="text-secondary-900">
              Page Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-secondary-600">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. 
              The page may have been moved, deleted, or the URL might be incorrect.
            </p>
            
            <div className="flex gap-2 justify-center">
              <Link href="/">
                <Button variant="primary">
                  Go Home
                </Button>
              </Link>
              <Link href="/store">
                <Button variant="outline">
                  Browse Store
                </Button>
              </Link>
            </div>
            
            <div className="pt-4 border-t border-secondary-200">
              <p className="text-sm text-secondary-500">
                Need help? <Link href="/contact" className="text-primary-600 hover:underline">Contact us</Link> or 
                check our <Link href="/faq" className="text-primary-600 hover:underline">FAQ page</Link>.
              </p>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}