"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DeleteTransaction(id: string) {
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
        return;
    }

    // Convert `id` to an integer since it's defined as Int in the schema
    const transactionId = parseInt(id, 10);
    if (isNaN(transactionId)) {
        throw new Error("Invalid transaction ID");
    }

    // Find the transaction by `id` and ensure the user owns it
    const transaction = await prisma.transaction.findUnique({
        where: {
            id: transactionId,
        },
    });

    if (!transaction || transaction.userId !== user.id) {
        throw new Error("Bad request");
    }

    await prisma.$transaction([
        prisma.transaction.delete({
            where: {
                id: transactionId,
            },
        }),
        prisma.monthHistory.update({
            where: {
                userID_year_month_day: {
                    userID: user.id,
                    year: transaction.date.getUTCFullYear(),
                    month: transaction.date.getUTCMonth(),
                    day: transaction.date.getUTCDate(),
                },
            },
            data: {
                ...(transaction.type === "expense" && {
                    expense: {
                        decrement: transaction.amount,
                    },
                }),
                ...(transaction.type === "income" && {
                    income: {
                        decrement: transaction.amount,
                    },
                }),
            },
        }),
        prisma.yearHistory.update({
            where: {
                userID_year_month: {
                    userID: user.id,
                    year: transaction.date.getUTCFullYear(),
                    month: transaction.date.getUTCMonth(),
                },
            },
            data: {
                ...(transaction.type === "expense" && {
                    expense: {
                        decrement: transaction.amount,
                    },
                }),
                ...(transaction.type === "income" && {
                    income: {
                        decrement: transaction.amount,
                    },
                }),
            },
        }),
    ]);
}
