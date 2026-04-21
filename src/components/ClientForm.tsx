import React from "react";

type Props = {
  clientName: string;
  setClientName: React.Dispatch<React.SetStateAction<string>>;
  invoiceNumber: string;
  setInvoiceNumber: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

function ClientForm({
  clientName, setClientName,
  invoiceNumber, setInvoiceNumber,
  address, setAddress,
  date, setDate,
}: Props) {

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    let cleanValue = input.replace(/[^\d/]/g, "");
    cleanValue = cleanValue.replace(/\/+/g, "/"); 

    let parts = cleanValue.split("/");
    
    if (parts[0]) {
      if (parseInt(parts[0]) > 31) parts[0] = "31";
      if (parts[0].length > 2) parts[0] = parts[0].slice(0, 2);
    }
    if (parts[1]) {
      if (parseInt(parts[1]) > 12) parts[1] = "12";
      if (parts[1].length > 2) parts[1] = parts[1].slice(0, 2);
    }
    if (parts[2]) {
      if (parts[2].length > 4) parts[2] = parts[2].slice(0, 4);
    }

    let joined = parts.join("/");
   
    if (joined.length === 2 && !joined.includes("/") && input.length > date.length) {
        joined += "/";
    } else if (joined.length === 5 && (joined.match(/\//g) || []).length === 1 && input.length > date.length) {
        joined += "/";
    }

    setDate(joined);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 shadow-xl">
      
      {/* Client Name with Floating Label */}
      <div className="relative group">
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder=" "
          className="peer w-full bg-white/60 border-2 border-slate-200 rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] placeholder-transparent"
        />
        <label className="absolute left-5 top-4 text-slate-400 font-medium transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-indigo-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2">
          Client Name
        </label>
      </div>

      {/* Invoice Number with Floating Label */}
      <div className="relative group">
        <input
          type="text"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          placeholder=" "
          className="peer w-full bg-white/60 border-2 border-slate-200 rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] placeholder-transparent"
        />
        <label className="absolute left-5 top-4 text-slate-400 font-medium transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-indigo-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2">
          Invoice Number
        </label>
      </div>

      {/* Address with Floating Label */}
      <div className="relative group">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder=" "
          className="peer w-full bg-white/60 border-2 border-slate-200 rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] placeholder-transparent"
        />
        <label className="absolute left-5 top-4 text-slate-400 font-medium transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-indigo-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2">
          Client Address
        </label>
      </div>

      {/* Modern Date Input */}
      <div className="relative group">
        <div className="relative flex items-center">
          <input
            type="text"
            value={date}
            onChange={handleDateChange}
            placeholder=" "
            className="peer w-full bg-white/60 border-2 border-slate-200 rounded-2xl px-5 py-4 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_20px_rgba(99,102,241,0.15)] font-mono tracking-widest placeholder-transparent"
          />
          <label className="absolute left-5 top-4 text-slate-400 font-medium transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-indigo-600 peer-focus:bg-white peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-indigo-600 peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2">
            Date (DD/MM/YYYY)
          </label>
          
          <input 
            id="hidden-picker" 
            type="date" 
            style={{position: 'fixed', left: '-9999px', top: '-9999px', visibility: 'hidden'}}
            onChange={(e) => {
              if (e.target.value) {
                const [y, m, d] = e.target.value.split("-");
                setDate(`${d}/${m}/${y}`);
              }
            }}
          />
          
          <button 
            type="button" 
            onClick={() => {
              const picker = document.getElementById("hidden-picker") as HTMLInputElement;
              if (picker) {
                picker.click();
              }
            }}
            className="absolute right-4 p-2 text-indigo-500 hover:bg-indigo-50 rounded-xl transition-all active:scale-90 cursor-pointer z-10"
          >
            📅
          </button>
        </div>
      </div>

    </div>
  );
}

export default ClientForm;







