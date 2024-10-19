"use server";
import { revalidateTag } from "next/cache";

const baseUrl = "http://api:5100";

export async function getItem(id: string) {
    const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
        next: {
            tags: ["GET_MERCH_ITEMS"],
        },
    };

    const response = await fetch(`${baseUrl}/inventory/${id}`, requestOptions);
    return await response.json();
}
