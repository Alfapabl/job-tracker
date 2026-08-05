'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createApplication(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be logged in.');
  }

  const company = (formData.get('company') as string)?.trim();
  const role = (formData.get('role') as string)?.trim();
  const link = (formData.get('link') as string)?.trim() || null;
  const notes = (formData.get('notes') as string)?.trim() || null;
  const status = (formData.get('status') as string) || 'applied';

  if (!company || !role) {
    throw new Error('Company and role are required.');
  }

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

export async function updateApplication(id: string, formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be logged in.');
  }

  const company = (formData.get('company') as string)?.trim();
  const role = (formData.get('role') as string)?.trim();
  const link = (formData.get('link') as string)?.trim() || null;
  const notes = (formData.get('notes') as string)?.trim() || null;
  const status = (formData.get('status') as string) || 'applied';

  if (!company || !role) {
    throw new Error('Company and role are required.');
  }

  const { error } = await supabase
    .from('applications')
    .update({
      company,
      role,
      link,
      notes,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  revalidatePath(`/dashboard/applications/${id}`);
  redirect('/dashboard');
}

export async function deleteApplication(id: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be logged in.');
  }

  const { error } = await supabase
    .from('applications')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateStatus(id: string, status: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('You must be logged in.');
  }

  const { error } = await supabase
    .from('applications')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard');
}