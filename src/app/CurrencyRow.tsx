import { Button, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";
import Money from "./types/Money";

interface CurrencyRowProps {
    money: Money;
    handleAdd: (value: number) => void;
    handleRemove: (value: number) => void;
}

export default function CurrencyRow(props: CurrencyRowProps) {
    const handleAddClick = () => {
        props.handleAdd(props.money.value);
    }
    const handleRemoveClick = () => {
        if (props.money.quantity === 0) {
            return;
        }
        props.handleRemove(props.money.value);
    }

    return (
        <TableRow>
            <TableCell>${props.money.value.toFixed(2)}</TableCell>
            <TableCell>
                <Button onClick={handleRemoveClick} style={{ minWidth: 20, backgroundColor: "red", color: "white" }}>
                    <RemoveIcon />
                </Button>
            </TableCell>
            <TableCell>
                <Typography align="center">
                    {props.money.quantity}
                </Typography>
            </TableCell>
            <TableCell>
                <Button onClick={handleAddClick} style={{ minWidth: 20, backgroundColor: "green", color: "white" }}>
                    <AddIcon />
                </Button>
            </TableCell>
        </TableRow >
    );
}
