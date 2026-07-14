import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('applications').select('*');

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>Supabase Connection Test</h1>
      <p>Error: {error ? error.message : 'none'}</p>
      <p>Rows: {data ? data.length : 'null'}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}