import Button from "@mui/material/Button";
import PurchaseItem from "./types/PurchaseItem";
import Link from 'next/link';

interface CheckoutButtonProps {
    list: PurchaseItem[];
}

export default function CheckoutButton(props: CheckoutButtonProps) {
    return (
        <Link
            href={{
                pathname: "/checkout",
                query: { list: JSON.stringify(props.list) },
            }}
        >
            <Button
                variant="contained"
                type="submit"
                className="submitButton"
                size="small"
            >
                Checkout
            </Button>
        </Link>
    );
}