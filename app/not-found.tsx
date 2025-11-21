import './globals.css'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-24">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-gray-700">Page Not Found</h2>
        <a href="/" className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Go Home
        </a>
      </div>
    </div>
  );
}
