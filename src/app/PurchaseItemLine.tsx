import PurchaseItem from "./types/PurchaseItem";
import { Button, TableCell, TableRow } from "@mui/material";
import { TextField } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/Clear";
import EditRoundedIcon from "@mui/icons-material/Edit";
import SaveRoundedIcon from "@mui/icons-material/Save";
import React, { useState } from "react";


interface purchaseItemLineProps {
    item: PurchaseItem;
    list: PurchaseItem[];
    deleteItem: (id: string) => Promise<void>;
    editItem: (id: string, text: number) => Promise<void>;
}

export default function PurchaseItemLine(props: purchaseItemLineProps) {
    const [editMode, setEditMode] = useState(false);
    const [inputText, setEditText] = useState(props.item.quantity);

    const handleDeleteClick = async () => {
        props.deleteItem(props.item.id);
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSubmit = async () => {
        props.item.quantity = inputText
        setEditMode(false);
        props.editItem(props.item.id, inputText);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (!/[0-9]/.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();
        }
        if (event.key === "Escape") {
            setEditText(props.item.quantity);
            setEditMode(false);
        } else if (event.key === "Enter") {
            handleSubmit();
        }
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setEditText(Number(event.target.value));
    };

    return (
        <TableRow>
            <TableCell>
                {editMode ? (
                    <TextField
                        variant="standard"
                        value={inputText}
                        onChange={handleChange}
                        autoFocus={true}
                        autoComplete="off"
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    props.item.quantity + "x "
                )}
                {props.item.name}

            </TableCell>
            <TableCell>
                ${props.item.price}
            </TableCell>
            <TableCell width={20}>
                {editMode ? (
                    <Button
                        title="Save purchase item."
                        variant="contained"
                        size={"small"}
                        style={{ minWidth: 20, backgroundColor: "green", color: "white" }}
                        onClick={handleSubmit}
                    >
                        <SaveRoundedIcon />
                    </Button>
                ) : (
                    <Button
                        title="Edit purchase item."
                        variant="contained"
                        onClick={handleEditClick}
                        size="small"
                        style={{ minWidth: 20, color: "white" }}
                        disabled={editMode}
                    >
                        <EditRoundedIcon />
                    </Button>
                )}
            </TableCell>
            <TableCell width={50}>
                <Button
                    title="Delete purchase item."
                    variant="contained"
                    onClick={handleDeleteClick}
                    size="small"
                    style={{ minWidth: 20, backgroundColor: "red", color: "black" }}
                    disabled={editMode}
                >
                    <ClearRoundedIcon />
                </Button>
            </TableCell>
        </TableRow>
    );
}
