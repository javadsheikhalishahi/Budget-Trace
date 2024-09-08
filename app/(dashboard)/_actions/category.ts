"use server";
import prisma from '@/lib/prisma';
import { CreateCategorySchema, CreateCategorySchemaType } from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';


export async function CreateCategory(_from: CreateCategorySchemaType) {
    const parsedBody = CreateCategorySchema.safeParse(_from);
    if (!parsedBody.success) {
        throw new Error("Bad request");
    }

    const user = await currentUser();
    if(!user) {
        redirect("/sign-in");
    }
    const {name, icon, type} = parsedBody.data;
    return await prisma.category.create({
        data: {
            userId: user.id,
            name,
            icon,
            type,
        }
    })
 }
