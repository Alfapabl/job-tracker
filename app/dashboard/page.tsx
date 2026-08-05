import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { signOut } from '@/app/auth/actions';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <form action={signOut}>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Log out
            </button>
          </form>
        </div>

        <p className="text-gray-700">
          Welcome, <span className="font-semibold">{user.email}</span>
        </p>
        <p className="text-gray-500 text-sm mt-2">User ID: {user.id}</p>
      </div>
    </div>
  );
}