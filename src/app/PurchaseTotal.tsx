import { Typography } from '@mui/material';
import PurchaseItem from './types/PurchaseItem';

interface purchaseTotalProps {
    list: PurchaseItem[];
}

export default function PurchaseTotal(props: purchaseTotalProps) {
    let total = 0;
    props.list.forEach((item) => {
        total += item.price * item.quantity;
    });

    return (
        <>
            <Typography>Total</Typography>
            <Typography>${total}</Typography>
        </>
    );
}