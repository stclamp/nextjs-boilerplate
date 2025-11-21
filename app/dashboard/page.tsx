import { auth } from '@/auth';
import { Button } from '@/components/ui/Button';
import { signOut } from '@/auth';

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <Button variant="outline" type="submit">
              Sign out
            </Button>
          </form>
        </div>
        <div className="mt-6">
          <p className="text-gray-600">
            Welcome back, <span className="font-semibold text-gray-900">{session?.user?.email}</span>
          </p>
          <div className="mt-4 rounded-md bg-gray-100 p-4">
            <h3 className="text-sm font-medium text-gray-500">Session Data:</h3>
            <pre className="mt-2 overflow-auto text-xs text-gray-800">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
