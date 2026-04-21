import React from "react";

type Item = {
  description: string;
  qty: number;
  rate: number;
};

type Props = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

function ItemsTable({ items, setItems }: Props) {
  
 
  const updateItem = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    const updated = [...items];
    let finalValue = value;

    if (field === "qty") {
      
      finalValue = Math.max(1, Number(value));
    } else if (field === "rate") {
      
      finalValue = Math.max(0, Number(value));
    }

    updated[index] = {
      ...updated[index],
      [field]: field === "description" ? value : finalValue,
    };
    setItems(updated);
  };

  const deleteItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-4 font-semibold uppercase tracking-wider text-sm text-center">Description</th>
              <th className="p-4 font-semibold uppercase tracking-wider text-sm text-center">Qty</th>
              <th className="p-4 font-semibold uppercase tracking-wider text-sm text-center">Rate</th>
              <th className="p-4 font-semibold uppercase tracking-wider text-sm text-center">Amount</th>
              <th className="p-4 font-semibold uppercase tracking-wider text-sm text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Service description..."
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </td>

                <td className="p-3 w-24">
                  <input
                    type="number"
                    min="1"  
                    value={item.qty}
                    onChange={(e) => updateItem(index, "qty", e.target.value)}
                    className="w-full p-3 text-center bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono"
                  />
                </td>

                <td className="p-3 w-32">
                  <input
                    type="number"
                    min="0"  
                    placeholder="0"
                    value={item.rate}
                    onChange={(e) => updateItem(index, "rate", e.target.value)}
                    className="w-full p-3 text-center bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono"
                  />
                </td>

                <td className="p-3 text-center font-bold text-slate-700 font-mono">
                  ₹ {(item.qty * item.rate).toLocaleString('en-IN')}
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteItem(index)}
                    className="px-4 py-2 bg-rose-50 text-rose-500 font-bold rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-200 hover:scale-110 active:shake"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemsTable;