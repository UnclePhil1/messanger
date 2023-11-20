import DesktopSidebar from "./desktopSidebar";

export default async function Sidbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
        <DesktopSidebar />
      <main className="lg:pl-20 h-full bg-gray-100 rounded-md">{children}</main>
    </div>
  );
}
