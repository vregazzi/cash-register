import Button from "@mui/material/Button";
import PurchaseItem from "./types/PurchaseItem";

interface CheckoutButtonProps {
    list: PurchaseItem[];
}

export default function CheckoutButton(props: CheckoutButtonProps) {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let total = 0;
        props.list.forEach((item) => {
            total += item.price * item.quantity;
        });
        alert("total: $" + total);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Button
                variant="contained"
                type="submit"
                className="submitButton"
                size="small"
            >
                Checkout
            </Button>
        </form>
    );
}