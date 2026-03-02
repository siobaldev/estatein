export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-sub-foreground mt-1 text-sm">
          Welcome back. Here&apos;s an overview of your platform.
        </p>
      </div>
      {/* Stats, listings, charts go here */}
    </main>
  );
}
