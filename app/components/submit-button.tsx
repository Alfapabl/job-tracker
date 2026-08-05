'use client';

import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
  variant?: 'primary' | 'danger';
};

export default function SubmitButton({
  children,
  pendingText = 'Loading...',
  className = '',
  variant = 'primary',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  const variantClasses =
    variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-400'
      : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400';

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full ${variantClasses} text-white py-2 rounded-md transition font-medium disabled:cursor-not-allowed ${className}`}
    >
      {pending ? pendingText : children}
    </button>
  );
}