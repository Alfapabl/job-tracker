import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Logged in → straight to dashboard
  if (user) {
    redirect('/dashboard');
  }

  // Logged out → landing page
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Job Tracker
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Keep your job applications organized. Track companies, roles,
          statuses, and follow-ups — all in one place.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition font-medium"
          >
            Log In
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Track Everything</h3>
            <p className="text-sm text-gray-700">
              Log every application with company, role, status, links, and notes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Stay Organized</h3>
            <p className="text-sm text-gray-700">
              Move applications through statuses: Applied, Interview, Offer, and more.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-gray-900 mb-2">Never Miss a Follow-Up</h3>
            <p className="text-sm text-gray-700">
              Keep your pipeline flowing — see every application at a glance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}