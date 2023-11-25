import getCurrentUSer from "../../actions/getCurrentUser";
import DesktopSidebar from "./desktopSidebar";
import MobileFooter from "./mobileFooter";

export default async function Sidbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUSer();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full bg-gray-100 rounded-md">{children}</main>
    </div>
  );
}
