import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { signOut } from '@/app/auth/actions';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: applications, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-700 mt-1">{user.email}</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition"
            >
              Log out
            </button>
          </form>
        </div>

        <div className="mb-6">
          <Link
            href="/dashboard/applications/new"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            + New Application
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded mb-4">
            Error loading applications: {error.message}
          </div>
        )}

        {applications && applications.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600">No applications yet. Add your first one!</p>
          </div>
        )}

        {applications && applications.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-800">Company</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-800">Role</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-800">Status</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-800">Date</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900 font-medium">{app.company}</td>
                    <td className="px-4 py-3 text-gray-800">{app.role}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium capitalize">
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}