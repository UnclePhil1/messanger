import { NextResponse } from "next/server";
import getCurrentUser from "../../actions/getCurrentUser";
import prisma from "@/../../app/libs/prismadb";


export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { message, image, conversationId } = body

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('UnAuthorized( MessageRoute)', { status: 401 });
        }

    const newMessage = await prisma.message.create({
        data: {
            body: message,
            image: image,
            conversation: {
                connect: {
                    id: conversationId
                }
            },
            sender: {
                connect: {
                    id: currentUser.id
                }
            },
            seen: {
                connect: {
                    id: currentUser.id
                }
            }
        },
        include: {
            seen: true,
            sender: true
        }
    });


    } catch (error: any) {
        console.log(error, "Error Message from Message Route.");
        return new NextResponse('Internal Message Error', { status: 500 });
    }
}