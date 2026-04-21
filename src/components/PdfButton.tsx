type Props = {
  onGenerate: () => void;
};

function PdfButton({ onGenerate }: Props) {
  return (
    <div className="text-right">
      <button 
        onClick={onGenerate}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95"
      >
        Generate PDF
      </button>
    </div>
  );
}

export default PdfButton;