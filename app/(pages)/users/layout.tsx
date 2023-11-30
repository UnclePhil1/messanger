import getUsers from "../../actions/getUsers";
import Sidebar from "../../components/sidebar/sidebar";
import UserList from "./components/userList";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();
  return (
    <Sidebar>
      <div className="h-full w-[100%] lg:flex justify-start items-center bg-primary lg:px-8 gap-10">
        <div className="lg:w-[25%] w-[100%] lg:rounded-md rounded-none">
          <UserList items={users} />
        </div>
        <div className="w-[75%]">{children}</div>
      </div>
    </Sidebar>
  );
}
