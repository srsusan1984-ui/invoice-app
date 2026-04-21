import { useState } from "react";
import html2pdf from "html2pdf.js";

// Component Imports
import ClientForm from "./components/ClientForm";
import ItemsTable from "./components/ItemsTable";
import Totals from "./components/Totals";
import InvoiceTemplate from "./components/InvoiceTemplate";

function App() {
  const [clientName, setClientName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([{ description: "", qty: 1, rate: 0 }]);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    // 1. Validation
    const isClientInfoValid = clientName.trim() && invoiceNumber.trim() && address.trim() && date.trim();
    const validItems = items.filter((item) => item.description.trim() !== "");

    if (!isClientInfoValid || validItems.length === 0) {
      alert("⚠️ Please fill all Client Details and add at least one item.");
      return;
    }

    const element = document.getElementById("invoice-download-area");
    if (!element) return;

    // 2. Start "Anti-Freeze" Mode
    setIsGenerating(true);

    // 3. Temporary UI Fix: Remove Scale so PDF captures at 1:1 ratio
    const parent = element.parentElement;
    const originalTransform = parent ? parent.style.transform : "";
    if (parent) {
      parent.style.transform = "none";
    }

    const opt = {
      margin: 0,
      filename: `Invoice_${invoiceNumber || "Draft"}.pdf`,
      image: { type: "jpeg", quality: 0.95 },
      html2canvas: {
        scale: 1.5, // 1.5 is the "Sweet Spot" for mobile RAM to prevent crashing
        useCORS: true,
        letterRendering: true,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
      // 4. Use a tiny timeout to let the 'scale: none' render before capture
      setTimeout(async () => {
        await html2pdf().from(element).set(opt).save();
        
        // 5. Cleanup
        if (parent) parent.style.transform = originalTransform;
        setIsGenerating(false);
        setShowPreview(false);
      }, 150);
    } catch (err) {
      console.error("PDF Export Error:", err);
      alert("Download failed. Your phone memory might be low. Try Chrome browser.");
      if (parent) parent.style.transform = originalTransform;
      setIsGenerating(false);
    }
  };

  return (
    /* MAIN WRAPPER: min-h-screen + overflow-y-auto is critical for mobile scrolling */
    <div className="min-h-screen w-full overflow-y-auto bg-slate-50 py-10 md:py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-10 md:space-y-12">
        
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-indigo-600">
            Invoice Builder
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Professional documents for your studio.
          </p>
        </header>

        {/* Main Interface Card */}
        <main className="bg-white border border-slate-100 shadow-2xl rounded-[2.5rem] p-6 md:p-16 space-y-12">
          
          {/* Client Details */}
          <section>
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Client Information</h2>
            <ClientForm 
              clientName={clientName} setClientName={setClientName}
              invoiceNumber={invoiceNumber} setInvoiceNumber={setInvoiceNumber}
              address={address} setAddress={setAddress}
              date={date} setDate={setDate}
            />
          </section>

          {/* Line Items */}
          <section className="space-y-10">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Line Items</h2>
            
            {/* Horizontal scroll for the table on mobile */}
            <div className="w-full overflow-x-auto no-scrollbar -mx-2 px-2">
               <ItemsTable items={items} setItems={setItems} />
            </div>
            
            <div className="flex justify-center pt-4">
              <button 
                onClick={() => setItems([...items, { description: "", qty: 1, rate: 0 }])}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg transition-transform active:scale-95"
              >
                + Add New Item
              </button>
            </div>
          </section>

          {/* Footer Totals */}
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="hidden md:block text-slate-300 text-sm italic">
              All amounts are in INR
            </div>
            <div className="w-full md:w-80">
              <Totals items={items} />
            </div>
          </div>

          {/* Main Action Button */}
          <div className="flex justify-center pt-6">
            <button 
              onClick={() => setShowPreview(true)}
              className="w-full md:w-auto px-16 py-5 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl shadow-2xl transition-all active:scale-95"
            >
              Preview & Export
            </button>
          </div>
        </main>

        <footer className="text-center text-slate-400 text-[10px] uppercase tracking-widest pb-10">
          &copy; 2026 Premium Studio &bull; Bangalore
        </footer>
      </div>

      {/* MODAL OVERLAY */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md overflow-y-auto">
          <div className="flex justify-center items-start md:items-center min-h-screen p-0 md:p-4">
            <div className="bg-white w-full max-w-4xl rounded-none md:rounded-3xl shadow-2xl flex flex-col my-0 md:my-8 overflow-hidden">
              
              {/* Modal Header */}
              <div className="px-6 py-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                <span className="font-bold text-slate-800">Final Preview</span>
                <button 
                  onClick={() => !isGenerating && setShowPreview(false)} 
                  className="p-2 text-slate-400 text-xl"
                >✕</button>
              </div>
              
              {/* Scrollable Preview Area */}
              <div className="flex-1 overflow-auto p-4 md:p-12 bg-slate-200 flex justify-center items-start min-h-[60vh]">
                <div className="shadow-2xl bg-white origin-top scale-[0.55] sm:scale-75 md:scale-90 lg:scale-100 mb-20 transition-transform">
                  <div id="invoice-download-area">
                     <InvoiceTemplate data={{ 
                        clientName: clientName.toUpperCase(), 
                        invoiceNumber, 
                        address: address.toUpperCase(), 
                        date, 
                        items: items.filter(i => i.description.trim() !== "") 
                     }} />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="px-6 py-6 border-t flex flex-col md:flex-row justify-end gap-3 bg-white sticky bottom-0">
                <button 
                  disabled={isGenerating}
                  onClick={() => setShowPreview(false)} 
                  className="order-2 md:order-1 px-8 py-3 text-slate-500 font-bold disabled:opacity-50"
                >
                  Back to Edit
                </button>
                <button 
                  disabled={isGenerating}
                  onClick={handleDownloadPdf} 
                  className={`order-1 md:order-2 px-12 py-4 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 ${
                    isGenerating ? 'bg-slate-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isGenerating ? "Processing PDF..." : "Download PDF"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;