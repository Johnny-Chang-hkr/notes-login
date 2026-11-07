import moment from "moment";
import {
  MdCreate,
  MdDeleteOutline,
  MdOutlinePushPin,
} from "react-icons/md";

const NoteCard = ({ note, onOpen, onEdit, onDelete, onPinNote }) => {
  const { title, createdOn, content, tags = [], isPinned, color } = note;

  return (
    <article
      className="note-card"
      style={{ "--note-color": color || "#ffffff" }}
    >
      <button
        type="button"
        className="note-card-open-overlay"
        onClick={onOpen}
        aria-label={`Read note: ${title || "Untitled note"}`}
      />
      <div className="note-card-topline">
        <span className="note-date">{moment(createdOn).format("MMM D, YYYY")}</span>
        <button
          className={`note-pin ${isPinned ? "is-pinned" : ""}`}
          onClick={onPinNote}
          aria-label={isPinned ? "Unpin note" : "Pin note"}
          title={isPinned ? "Unpin note" : "Pin note"}
        >
          <MdOutlinePushPin />
        </button>
      </div>
      <h3>{title || "Untitled note"}</h3>
      <p className="note-content">{content}</p>
      <span className="note-read-hint">Open note <span aria-hidden="true">↗</span></span>
      <div className="note-card-bottom">
        <div className="note-tags">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
          {tags.length > 3 && <span className="more-tags">+{tags.length - 3}</span>}
        </div>
        <div className="note-actions">
          <button onClick={onEdit} aria-label="Edit note" title="Edit note">
            <MdCreate />
          </button>
          <button onClick={onDelete} aria-label="Delete note" title="Delete note">
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </article>
  );
};

export default NoteCard;
