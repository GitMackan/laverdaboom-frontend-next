import AdminNavigation from "@/components/AdminNavigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminNavigation>{children}</AdminNavigation>;
}
