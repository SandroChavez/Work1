'use client';

import { trpc } from '@/trpc/routers/client';

export default function MainPage() {
  const { data, isLoading } = trpc.hello.useQuery({
    text: 'sandro',
  });

  if (isLoading) return <p>Cargando...</p>;

  return <div>{data?.greeting}</div>;
}

