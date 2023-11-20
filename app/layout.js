import { AuthContext } from "./context/authContext";
import { ToasterContext } from "./context/toasterContext";
import "./globals.css";

export const metadata = {
  title: "Messanger",
  description: "GChatting Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
