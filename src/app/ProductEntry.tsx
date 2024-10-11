"use client";
import { TextField } from "@mui/material";
import PurchaseItem from "./types/PurchaseItem";
import { useState } from "react";

const checkForDuplicates = (list: PurchaseItem[], itemName: string) => {
    return list.some((item) => item.name === itemName);
}

interface ProductEntryProps {
    list: PurchaseItem[];
    addItem: (text: string) => void;
}

export default function ProductEntry(props: ProductEntryProps) {
    const [inputText, setInputText] = useState("");

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
        event
    ) => {
        event.preventDefault();
        if (inputText === "") {
            return;
        }
        props.addItem(inputText);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                variant="standard"
                value={inputText}
                onChange={handleChange}
                autoFocus={true}
                autoComplete="off"
            />
        </form>
    );
}