"use server";
import { revalidateTag } from "next/cache";

const baseUrl = "http://api:5001";

export async function getItem(id: string) {
    const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
        next: {
            tags: ["GET_TODO_ITEMS"],
        },
    };

    const response = await fetch(`${baseUrl}/todo${id}`, requestOptions);
    return await response.json();
}
