
import { LuFilePlus2 } from "react-icons/lu";

const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20 animate-in fade-in duration-500">
      {/* Decorative Icon Container */}
      <div className="relative w-24 h-24 flex items-center justify-center bg-blue-50 rounded-full mb-6 group">
        {/* Subtle ring effect */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-200 animate-[spin_10s_linear_infinite]" />
        
        <LuFilePlus2 className="text-5xl text-blue-400 group-hover:scale-110 transition-transform duration-300" />
      </div>

      {/* Primary Message */}
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        No notes 
      </h3>

      
    </div>
  );
};

export default EmptyCard;