"use client";
import React from 'react';
import PurchaseItem from '../types/PurchaseItem';
import Money from '../types/Money';
import { useSearchParams } from 'next/navigation'
import { Box, Button, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import CurrencyRow from '../CurrencyRow';
import { calculateReturn } from '../util/calculate';

const defaultMoneyList: Money[] = [
    { value: 1, quantity: 0 },
    { value: 5, quantity: 0 },
    { value: 10, quantity: 0 },
    { value: 20, quantity: 0 },
    { value: 50, quantity: 0 },
    { value: 100, quantity: 0 },
    { value: .01, quantity: 0 },
    { value: .05, quantity: 0 },
    { value: .10, quantity: 0 },
    { value: .25, quantity: 0 },
]

interface CheckoutProps {
    list: PurchaseItem[];
}

export default function Checkout(props: CheckoutProps) {
    const searchParams = useSearchParams()
    const [money, setMoney] = React.useState(defaultMoneyList)
    const jsonString = searchParams.get("list")
    const list: PurchaseItem[] = JSON.parse(jsonString ? jsonString : "[]")
    const purchaseTotal: number = list.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const currencyTotal: number = money.reduce((acc, item) => acc + item.value * item.quantity, 0)

    const handleAdd = (value: number) => {
        setMoney(money.map((item) => {
            if (item.value === value) {
                item.quantity += 1;
            }
            return item;
        }));
    }

    const handleRemove = (value: number) => {
        setMoney(money.map((item) => {
            if (item.value === value && item.quantity > 0) {
                item.quantity -= 1;
            }
            return item;
        }));
    }

    const handleDone = () => {
        const returnAmounts = calculateReturn(currencyTotal - purchaseTotal)
        if (confirm(
            "This is the amount of change to return, hit OK to return to the " +
            "main menu and cancel to return to the payment screen:\n" +
            returnAmounts.map(
                (item) => `${item.quantity}: $${item.value.toFixed(2)}`
            ).join("\n")
        )) {
            window.location.href = "/"
        }
    }

    return (
        <Box sx={{ m: 4 }}>
            <Typography variant="h5">Checkout</Typography >
            <Typography>Amount due: ${purchaseTotal.toFixed(2)}</Typography>
            <Table sx={{ minWidth: 250, maxWidth: 250 }}>
                <TableBody>
                    {money.map((item) => {
                        return (
                            <CurrencyRow
                                key={item.value}
                                money={item}
                                handleAdd={handleAdd}
                                handleRemove={handleRemove}
                            />
                        );
                    })}
                    <TableRow>
                        <TableCell>
                            <Typography>Total</Typography>
                        </TableCell>
                        <TableCell />
                        <TableCell>
                            <Typography>${currencyTotal.toFixed(2)}</Typography>
                        </TableCell>
                        <TableCell>
                            <Button
                                variant="contained"
                                onClick={handleDone}
                                disabled={
                                    currencyTotal - purchaseTotal < 0
                                }>
                                Done
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
}