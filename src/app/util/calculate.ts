import Money from "../types/Money";

export function calculateReturn(paidExtra: number): Money[] {
    const denominations = [100, 50, 20, 10, 5, 1, 0.25, 0.10, 0.05, 0.01];
    const returnAmounts: Money[] = [];
    let remaining = paidExtra;
    denominations.forEach((denomination) => {
        const quantity = Math.floor(remaining / denomination);
        if (quantity > 0) {
            returnAmounts.push({
                value: denomination,
                quantity: quantity,
            });
            remaining -= denomination * quantity;
        }
    });
    return returnAmounts;
}
