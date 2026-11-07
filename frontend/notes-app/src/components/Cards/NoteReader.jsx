import moment from "moment";
import {
  MdArrowBack,
  MdCreate,
  MdOutlinePushPin,
} from "react-icons/md";

const NoteReader = ({ note, onClose, onEdit }) => {
  if (!note) return null;

  return (
    <article
      className="note-reader"
      style={{ "--reader-color": note.color || "#ffffff" }}
    >
      <header className="note-reader-header">
        <button type="button" className="reader-back-button" onClick={onClose}>
          <MdArrowBack />
          <span>Back to notes</span>
        </button>
        <div className="reader-header-actions">
          {note.isPinned && (
            <span className="reader-pinned-label">
              <MdOutlinePushPin /> Pinned
            </span>
          )}
          <button type="button" className="reader-edit-button" onClick={() => onEdit(note)}>
            <MdCreate />
            <span>Edit note</span>
          </button>
        </div>
      </header>

      <div className="note-reader-paper">
        <div className="reader-meta">
          <span className="reader-date">{moment(note.createdOn).format("MMMM D, YYYY")}</span>
          <span className="reader-meta-dot" />
          <span>{note.content?.trim() ? note.content.trim().split(/\s+/).length : 0} words</span>
        </div>
        <h1>{note.title || "Untitled note"}</h1>
        <div className="reader-divider" />
        <div className="reader-content">{note.content}</div>
        {note.tags?.length > 0 && (
          <footer className="reader-tags">
            <span className="reader-tags-label">FILED UNDER</span>
            <div className="note-tags">
              {note.tags.map((tag) => <span key={tag}>#{tag}</span>)}
            </div>
          </footer>
        )}
      </div>

      <p className="reader-footer">A thought worth keeping <span>✳</span></p>
    </article>
  );
};

export default NoteReader;
