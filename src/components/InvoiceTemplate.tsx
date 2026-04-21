

const InvoiceTemplate = ({ data }: any) => {
  
  const subtotal = data.items.reduce((acc: number, item: any) => acc + (Number(item.qty) * Number(item.rate)), 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div className="w-[210mm] h-[297mm] overflow-hidden p-[25mm] bg-white text-slate-900 font-sans mx-auto shadow-2xl">
      {}
      <div className="flex justify-between items-start mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xl">P</div>
            <div className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Premium<span className="text-indigo-600">Studio</span></div>
          </div>
          <div className="text-slate-400 text-[11px] leading-relaxed uppercase tracking-widest font-bold">
            <p>123 Tech Park, Whitefield</p>
            <p>Bangalore, KA 560066</p>
            <p className="text-indigo-500 mt-1">GSTIN: 29AAAAA0000A1Z5</p>
          </div>
        </div>

        <div className="text-right">
          <h1 className="text-7xl font-black text-slate-100 uppercase tracking-tighter -mt-4 leading-none select-none">
            Invoice
          </h1>
          <div className="mt-6 space-y-2">
            <div className="flex justify-end gap-4 text-xs">
              <span className="text-slate-400 uppercase font-bold tracking-widest">No.</span>
              <span className="font-mono font-bold text-slate-900">#{data.invoiceNumber || "2026-001"}</span>
            </div>
            <div className="flex justify-end gap-4 text-xs">
              <span className="text-slate-400 uppercase font-bold tracking-widest">Date</span>
              <span className="font-mono font-bold text-slate-900">{data.date}</span>
            </div>
          </div>
        </div>
      </div>

      { }
      <div className="mb-20 grid grid-cols-2 gap-12">
        <div>
          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-4">Recipient</p>
          {}
          <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase">
            {data.clientName || "Valued Client"}
          </h3>
          { }
          <p className="text-slate-500 text-sm leading-relaxed max-w-[250px] uppercase">
            {data.address || "Client Address details will appear here."}
          </p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Payment Terms</p>
           <p className="text-xs font-bold text-slate-700">Due within 15 days via Bank Transfer</p>
           <p className="text-[10px] text-slate-400 mt-4 leading-tight">Please include the invoice number in your payment reference.</p>
        </div>
      </div>

      {}
      <table className="w-full mb-12 border-collapse">
        <thead>
          <tr className="border-b-2 border-slate-900 text-left text-[10px] font-black uppercase tracking-[0.2em]">
            <th className="py-5">Description</th>
            <th className="py-5 text-center w-24">Quantity</th>
            <th className="py-5 text-right w-32">Rate</th>
            <th className="py-5 text-right w-32">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.items.length > 0 ? data.items.map((item: any, i: number) => (
            <tr key={i} className="group">
              <td className="py-8">
                <p className="text-sm font-bold text-slate-900 mb-1">{item.description || "Design Services"}</p>
                <p className="text-[10px] text-slate-400 uppercase font-medium tracking-wide">Professional Creative Consultation</p>
              </td>
              <td className="py-8 text-center text-sm font-mono">{item.qty}</td>
              <td className="py-8 text-right text-sm font-mono">₹{Number(item.rate).toLocaleString()}</td>
              <td className="py-8 text-right text-sm font-bold font-mono">₹{(item.qty * item.rate).toLocaleString()}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={4} className="py-10 text-center text-slate-300 italic">No items added to this invoice.</td>
            </tr>
          )}
        </tbody>
      </table>

      { }
      <div className="flex justify-end pt-12 border-t-2 border-slate-900">
        <div className="w-80 space-y-4">
          <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold">
            <span className="text-slate-400">Net Subtotal</span>
            <span className="text-slate-900 font-mono">₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-xs uppercase tracking-widest font-bold">
            <span className="text-slate-400">IGST (18%)</span>
            <span className="text-slate-900 font-mono">₹{tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-6 border-t border-slate-100 mt-4">
            <span className="text-sm font-black uppercase tracking-[0.2em] text-indigo-600">Total Payable</span>
            <span className="text-2xl font-black text-slate-900 font-mono">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {}
      <div className="mt-auto pt-32">
        <div className="grid grid-cols-2 gap-8 items-end border-t border-slate-100 pt-10">
          <div>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mb-4">Authorized Signatory</p>
            <div className="h-12 w-48 border-b border-slate-200 mb-2 italic text-indigo-600/30 text-2xl font-serif">Premium Studio</div>
            <p className="text-[10px] text-slate-400">Digital document. No physical signature required.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 font-bold mb-1">Thank you for your business!</p>
            <p className="text-[9px] text-slate-300 tracking-tighter">© 2026 Premium Creative Studio Pvt Ltd &bull; Bangalore &bull; New York</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InvoiceTemplate;