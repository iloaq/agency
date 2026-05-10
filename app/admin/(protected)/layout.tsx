import Link from "next/link";
import { requireAdminSession } from "@/lib/admin/require-admin";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireAdminSession();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col bg-gradient-to-b from-slate-900 to-slate-950">
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
