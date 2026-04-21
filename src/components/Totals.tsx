type Item = {
  description: string;
  qty: number;
  rate: number;
};

type Props = {
  items: Item[];
};

function Totals({ items }: Props) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.qty * item.rate,
    0
  );

  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="text-right space-y-2 text-lg mb-6">
      <p>Subtotal: ₹ {subtotal.toFixed(2)}</p>
      <p>Tax (18%): ₹ {tax.toFixed(2)}</p>
      <p className="text-2xl font-bold">
        Total: ₹ {total.toFixed(2)}
      </p>
    </div>
  );
}

export default Totals;