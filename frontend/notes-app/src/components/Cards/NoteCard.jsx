import moment from "moment";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="relative border border-slate-200 rounded-2xl p-5 bg-white hover:shadow-lg transition-all duration-300">
  
  {/* Header */}
  <div className="flex items-start justify-between">
    <div>
      <h6 className="text-base font-semibold text-slate-800 line-clamp-1">
        {title}
      </h6>
      <span className="text-xs text-slate-400">
        {moment(date).format("Do MMM YYYY")}
      </span>
    </div>

    <MdOutlinePushPin
      className={`text-lg cursor-pointer shrink-0
      ${isPinned ? "text-yellow-500" : "text-slate-300 hover:text-yellow-400"}`}
      onClick={onPinNote}
    />
  </div>

  {/* Content */}
  <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
    {content}
  </p>

  {/* Tags */}
  <div className="flex flex-wrap gap-2 mt-4 max-w-[70%]">
    {tags.map((item, index) => (
      <span
        key={index}
        className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md"
      >
        #{item}
      </span>
    ))}
  </div>

  {/* Actions pinned bottom-right */}
  <div className="absolute bottom-3 right-3 flex items-center gap-2">
    <MdCreate
      className="text-slate-400 hover:text-green-600 cursor-pointer text-lg"
      onClick={onEdit}
    />
    <MdDelete
      className="text-slate-400 hover:text-red-500 cursor-pointer text-lg"
      onClick={onDelete}
    />
  </div>
</div>
  );
};

export default NoteCard;
