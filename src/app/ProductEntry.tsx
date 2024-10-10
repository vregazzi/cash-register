"use client";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PurchaseItem from "./types/PurchaseItem";
import { useState } from "react";

const checkForDuplicates = (list: PurchaseItem[], itemName: string) => {
    return list.some((item) => item.name === itemName);
}

interface ProductEntryProps {
    list: PurchaseItem[];
    setList: (list: PurchaseItem[]) => void;
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
        if (checkForDuplicates(props.list, inputText)) {
            setInputText("");
            props.setList(props.list.map((item) => {
                if (item.name === inputText) {
                    item.quantity += 1;
                }
                return item;
            }, []));
            return;
        }

        props.setList([...props.list, {
            name: inputText,
            id: "0",
            price: 0,
            quantity: 1
        }]);
        setInputText("");
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