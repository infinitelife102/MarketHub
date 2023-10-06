'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth callback error:', error);
        router.push('/auth/login?error=callback');
        return;
      }

      if (session?.user) {
        const uid = session.user.id;
        const email = session.user.email ?? '';
        const fullName = session.user.user_metadata?.full_name ?? session.user.user_metadata?.name ?? null;
        const avatarUrl = session.user.user_metadata?.avatar_url ?? null;

        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', uid)
          .single();

        if (!profile) {
          const { error: insertError } = await supabase.from('profiles').insert({
            id: uid,
            email: email || 'unknown',
            full_name: fullName,
            avatar_url: avatarUrl,
            role: 'customer',
          });
          if (insertError) console.error('Auth callback profile insert error:', insertError);
        } else {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ full_name: fullName, avatar_url: avatarUrl })
            .eq('id', uid);
          if (updateError) console.error('Auth callback profile update error:', updateError);
        }

        router.push('/');
        router.refresh();
      } else {
        router.push('/auth/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="spinner border-primary-600 h-12 w-12 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900">Completing sign in...</h2>
        <p className="text-gray-500 mt-2">Please wait while we redirect you</p>
      </div>
    </div>
  );
}
