import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Source: https://supabase.com/docs/guides/auth/server-side/nextjs

function getSupabaseUrlAndKey(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;
  return { url, key };
}

/** Server Components / Route Handlers: anon (или publishable) + cookies для SSR. */
export async function createSupabaseServerClient() {
  const creds = getSupabaseUrlAndKey();
  if (!creds) return null;

  const cookieStore = await cookies();

  return createServerClient(creds.url, creds.key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component — set cookie недоступен; см. Supabase SSR / middleware.
        }
      },
    },
  });
}
