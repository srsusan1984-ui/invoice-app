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
    <div className="w-full overflow-x-auto">
      <div className="min-w-max md:min-w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="p-2 md:p-4 font-semibold uppercase tracking-wider text-xs md:text-sm text-center min-w-[150px] md:min-w-auto">Description</th>
              <th className="p-2 md:p-4 font-semibold uppercase tracking-wider text-xs md:text-sm text-center min-w-[80px] md:min-w-auto">Qty</th>
              <th className="p-2 md:p-4 font-semibold uppercase tracking-wider text-xs md:text-sm text-center min-w-[80px] md:min-w-auto">Rate</th>
              <th className="p-2 md:p-4 font-semibold uppercase tracking-wider text-xs md:text-sm text-center min-w-[100px] md:min-w-auto">Amount</th>
              <th className="p-2 md:p-4 font-semibold uppercase tracking-wider text-xs md:text-sm text-center min-w-[90px] md:min-w-auto">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-2 md:p-3 min-w-[150px] md:min-w-auto">
                  <input
                    type="text"
                    placeholder="Service..."
                    value={item.description}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                    className="w-full p-2 md:p-3 text-xs md:text-sm bg-white border border-slate-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </td>

                <td className="p-2 md:p-3 min-w-[80px] md:min-w-auto">
                  <input
                    type="number"
                    min="1"  
                    value={item.qty}
                    onChange={(e) => updateItem(index, "qty", e.target.value)}
                    className="w-full p-2 md:p-3 text-center text-xs md:text-sm bg-white border border-slate-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono"
                  />
                </td>

                <td className="p-2 md:p-3 min-w-[80px] md:min-w-auto">
                  <input
                    type="number"
                    min="0"  
                    placeholder="0"
                    value={item.rate}
                    onChange={(e) => updateItem(index, "rate", e.target.value)}
                    className="w-full p-2 md:p-3 text-center text-xs md:text-sm bg-white border border-slate-200 rounded-lg md:rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono"
                  />
                </td>

                <td className="p-2 md:p-3 text-center font-bold text-slate-700 font-mono text-xs md:text-sm min-w-[100px] md:min-w-auto">
                  ₹ {(item.qty * item.rate).toLocaleString('en-IN')}
                </td>

                <td className="p-2 md:p-3 text-center min-w-[90px] md:min-w-auto">
                  <button
                    onClick={() => deleteItem(index)}
                    className="px-2 md:px-4 py-1 md:py-2 text-xs md:text-sm bg-rose-50 text-rose-500 font-bold rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-200 hover:scale-110 active:shake"
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