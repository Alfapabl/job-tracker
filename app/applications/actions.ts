'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createApplication(formData: FormData) {
  const supabase = await createClient();

  // Get the current user — required to associate the row with them
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be logged in.');
  }

  // Extract form fields
  const company = (formData.get('company') as string)?.trim();
  const role = (formData.get('role') as string)?.trim();
  const link = (formData.get('link') as string)?.trim() || null;
  const notes = (formData.get('notes') as string)?.trim() || null;
  const status = (formData.get('status') as string) || 'applied';

  if (!company || !role) {
    throw new Error('Company and role are required.');
  }

  // Insert
  const { error } = await supabase.from('applications').insert({
    user_id: user.id,
    company,
    role,
    link,
    notes,
    status,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}