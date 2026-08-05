import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { updateApplication, deleteApplication } from '@/app/applications/actions';
import DeleteButton from './delete-button';
import SubmitButton from '@/app/components/submit-button';

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { data: application, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !application) {
    notFound();
  }

  const updateWithId = updateApplication.bind(null, id);
  const deleteWithId = deleteApplication.bind(null, id);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Application</h1>
          <Link
            href="/dashboard"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            ← Back to dashboard
          </Link>
        </div>

        <form action={updateWithId} className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1 text-gray-800">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              defaultValue={application.company}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1 text-gray-800">
              Role <span className="text-red-500">*</span>
            </label>
            <input
              id="role"
              name="role"
              type="text"
              required
              defaultValue={application.role}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1 text-gray-800">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={application.status}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="applied">Applied</option>
              <option value="phone_screen">Phone Screen</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="ghosted">Ghosted</option>
            </select>
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium mb-1 text-gray-800">
              Job Post URL
            </label>
            <input
              id="link"
              name="link"
              type="url"
              defaultValue={application.link || ''}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1 text-gray-800">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              defaultValue={application.notes || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <div className="flex gap-3 pt-2">
              <SubmitButton pendingText="Saving...">Save Changes</SubmitButton>
            </div>
          </div>
        </form>

        <div className="mt-6">
          <DeleteButton id={id} />
        </div>
      </div>
    </div>
  );
}