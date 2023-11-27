import prisma from "@/../../app/libs/prismadb";
import getSessions from "./getSession";
import { Console } from "console";

const getCurrentUser = async () => {
  try {
    const session = await getSessions();
    if (!session?.user?.email) {
      console.log("No User Found");
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
        return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
  }
};


export default getCurrentUser;