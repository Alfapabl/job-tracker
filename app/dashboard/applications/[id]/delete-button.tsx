'use client';

import { useState, useTransition } from 'react';
import { deleteApplication } from '@/app/applications/actions';

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application? This cannot be undone.'
    );

    if (!confirmed) return;

    startTransition(async () => {
      await deleteApplication(id);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 rounded-md transition font-medium disabled:cursor-not-allowed"
    >
      {isPending ? 'Deleting...' : 'Delete Application'}
    </button>
  );
}