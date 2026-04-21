import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


import ClientForm from "./components/ClientForm";
import ItemsTable from "./components/ItemsTable";
import Totals from "./components/Totals";
import InvoiceTemplate from "./components/InvoiceTemplate";

function App() {
  const [clientName, setClientName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([
    { description: "", qty: 1, rate: 0 },
  ]);

  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    const isClientInfoValid =
      clientName.trim() &&
      invoiceNumber.trim() &&
      address.trim() &&
      date.trim();

    const validItems = items.filter(
      (item) => item.description.trim() !== ""
    );

    if (!isClientInfoValid || validItems.length === 0) {
      alert(
        "⚠️ Please fill all Client Details and add at least one item."
      );
      return;
    }

    try {
      setIsGenerating(true);

       
      const hiddenDiv = document.createElement("div");
      hiddenDiv.style.position = "fixed";
      hiddenDiv.style.left = "-9999px";
      hiddenDiv.style.top = "0";
      hiddenDiv.style.width = "210mm";
      hiddenDiv.style.height = "297mm";
      hiddenDiv.style.backgroundColor = "#ffffff";
      hiddenDiv.style.zIndex = "-9999";

      
      const invoiceHTML = `
        <div style="width: 210mm; height: 297mm; padding: 25mm; background: white; font-family: sans-serif; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
            <div>
              <div style="font-size: 20px; font-weight: bold; color: #1e293b;">PremiumStudio</div>
              <div style="font-size: 11px; color: #94a3b8; margin-top: 10px;">
                <p>123 Tech Park, Whitefield</p>
                <p>Bangalore, KA 560066</p>
              </div>
            </div>
            <div style="text-align: right;">
              <h1 style="font-size: 48px; font-weight: bold; color: #e2e8f0; margin: 0;">INVOICE</h1>
              <div style="margin-top: 15px; font-size: 12px;">
                <div style="margin: 5px 0;"><strong>No. </strong>#${invoiceNumber}</div>
                <div style="margin: 5px 0;"><strong>Date: </strong>${date}</div>
              </div>
            </div>
          </div>

          <div style="margin-bottom: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
            <div>
              <p style="font-size: 10px; font-weight: bold; color: #4f46e5; margin-bottom: 8px; text-transform: uppercase;">Recipient</p>
              <h3 style="font-size: 18px; font-weight: bold; text-transform: uppercase; margin: 8px 0;">${clientName}</h3>
              <p style="font-size: 12px; color: #64748b; margin: 0;">${address}</p>
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 12px;">
            <thead>
              <tr style="border-bottom: 2px solid #e2e8f0;">
                <th style="text-align: left; padding: 10px; color: #94a3b8; font-weight: bold; text-transform: uppercase;">Description</th>
                <th style="text-align: center; padding: 10px; color: #94a3b8; font-weight: bold; text-transform: uppercase; width: 80px;">Qty</th>
                <th style="text-align: center; padding: 10px; color: #94a3b8; font-weight: bold; text-transform: uppercase; width: 100px;">Rate</th>
                <th style="text-align: right; padding: 10px; color: #94a3b8; font-weight: bold; text-transform: uppercase; width: 100px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${items
                .filter((i) => i.description.trim() !== "")
                .map(
                  (item) => `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px;">${item.description}</td>
                  <td style="text-align: center; padding: 10px;">${item.qty}</td>
                  <td style="text-align: center; padding: 10px;">₹${Number(item.rate).toFixed(2)}</td>
                  <td style="text-align: right; padding: 10px; font-weight: bold;">₹${(
                    Number(item.qty) * Number(item.rate)
                  ).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <div style="border-top: 2px solid #e2e8f0; padding-top: 20px; text-align: right; font-size: 12px;">
            ${(() => {
              const subtotal = items.reduce(
                (acc, item) => acc + Number(item.qty) * Number(item.rate),
                0
              );
              const tax = subtotal * 0.18;
              const total = subtotal + tax;
              return `
                <div style="margin-bottom: 10px;">
                  <span style="display: inline-block; width: 150px; text-align: left;">Subtotal:</span>
                  <span style="font-weight: bold;">₹${subtotal.toFixed(2)}</span>
                </div>
                <div style="margin-bottom: 10px;">
                  <span style="display: inline-block; width: 150px; text-align: left;">IGST (18%):</span>
                  <span style="font-weight: bold;">₹${tax.toFixed(2)}</span>
                </div>
                <div style="margin-top: 15px; font-size: 16px; font-weight: bold; color: #4f46e5;">
                  <span style="display: inline-block; width: 150px; text-align: left;">TOTAL PAYABLE:</span>
                  <span>₹${total.toFixed(2)}</span>
                </div>
              `;
            })()}
          </div>
        </div>
      `;

      hiddenDiv.innerHTML = invoiceHTML;
      document.body.appendChild(hiddenDiv);

     
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(hiddenDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      
      document.body.removeChild(hiddenDiv);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save(`Invoice_${invoiceNumber}.pdf`);

      setShowPreview(false);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("PDF generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-y-auto bg-slate-50 py-10 md:py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-10 md:space-y-12">

        { }
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-indigo-600">
            Invoice Builder
          </h1>

          <p className="text-slate-500 font-medium text-sm">
            Professional documents for your studio.
          </p>
        </header>

        {}
        <main className="bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] p-6 md:p-16 space-y-12">

          { }
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">
              Client Information
            </h2>

            <ClientForm
              clientName={clientName}
              setClientName={setClientName}
              invoiceNumber={invoiceNumber}
              setInvoiceNumber={setInvoiceNumber}
              address={address}
              setAddress={setAddress}
              date={date}
              setDate={setDate}
            />
          </section>

          { }
          <section className="space-y-10">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
              Line Items
            </h2>

            <ItemsTable
              items={items}
              setItems={setItems}
            />

            <div className="flex justify-center pt-4">
              <button
                onClick={() =>
                  setItems([
                    ...items,
                    {
                      description: "",
                      qty: 1,
                      rate: 0,
                    },
                  ])
                }
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-transform active:scale-95"
              >
                + Add New Item
              </button>
            </div>
          </section>

          { }
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="hidden md:block text-slate-300 text-sm italic">
              All amounts are in INR
            </div>

            <div className="w-full md:w-80">
              <Totals items={items} />
            </div>
          </div>

          {}
          <div className="flex justify-center pt-6">
            <button
              onClick={() => setShowPreview(true)}
              className="w-full md:w-auto px-16 py-5 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-2xl transition-all active:scale-95"
            >
              Preview & Export
            </button>
          </div>
        </main>

        {}
        <footer className="text-center text-slate-400 text-[10px] uppercase tracking-widest pb-10">
          &copy; 2026 Premium Studio • Bangalore
        </footer>
      </div>

      {}
      {showPreview && (
        <>
          <style>{`body { overflow: hidden !important; }`}</style>
          <div className="fixed inset-0 z-50 bg-slate-900/90 overflow-hidden">

            <div className="flex justify-center items-center w-full h-full p-2 md:p-4">

              <div className="bg-white w-full rounded-lg md:rounded-3xl flex flex-col overflow-hidden max-w-2xl md:max-w-4xl max-h-[90vh]">

                {}
                <div className="px-4 md:px-6 py-3 md:py-4 border-b flex justify-between items-center bg-white flex-shrink-0">
                  <span className="font-bold text-slate-800 text-sm md:text-base">
                    Final Preview
                  </span>

                  <button
                    onClick={() =>
                      !isGenerating &&
                      setShowPreview(false)
                    }
                    className="p-2 text-slate-400 text-xl"
                  >
                    ✕
                  </button>
                </div>

                {}
                <div className="flex-1 overflow-hidden bg-slate-200 flex justify-center items-center py-3 md:py-8 px-2">

                  <div className="bg-white origin-center scale-[0.25] sm:scale-[0.35] md:scale-50 lg:scale-75">

                    <div id="invoice-download-area">
                      <InvoiceTemplate
                        data={{
                          clientName:
                            clientName.toUpperCase(),
                          invoiceNumber,
                          address:
                            address.toUpperCase(),
                          date,
                          items: items.filter(
                            (i) =>
                              i.description.trim() !== ""
                          ),
                        }}
                      />
                    </div>

                  </div>
                </div>

                { }
                <div className="px-4 md:px-6 py-4 border-t flex flex-col md:flex-row justify-end gap-2 md:gap-3 bg-white flex-shrink-0">

                  <button
                    disabled={isGenerating}
                    onClick={() =>
                      setShowPreview(false)
                    }
                    className="order-2 md:order-1 px-6 md:px-8 py-2 md:py-3 text-slate-500 font-bold disabled:opacity-50 text-sm md:text-base"
                  >
                    Back to Edit
                  </button>

                  <button
                    disabled={isGenerating}
                    onClick={handleDownloadPdf}
                    className={`order-1 md:order-2 px-8 md:px-12 py-3 md:py-4 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 text-sm md:text-base ${
                      isGenerating
                        ? "bg-slate-400"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {isGenerating
                      ? "Processing PDF..."
                      : "Download PDF"}
                  </button>

                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;