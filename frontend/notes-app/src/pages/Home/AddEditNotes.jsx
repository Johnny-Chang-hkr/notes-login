import { useState } from "react";
import { MdAutoAwesome, MdClose, MdOutlineNotes } from "react-icons/md";
import TagInput from "../../components/Input/TagInput";
import axiosInstance from "../../utils/axiosInstance";

const noteColors = [
  { value: "#fffefa", label: "Warm white" },
  { value: "#f3f0e8", label: "Sand" },
  { value: "#f3ebea", label: "Rose" },
  { value: "#edf0eb", label: "Sage" },
  { value: "#edf0f2", label: "Slate" },
  { value: "#f0edf2", label: "Lilac" },
];

const AddEditNotes = ({ onClose, noteData, type, getAllNotes, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [color, setColor] = useState(noteData?.color || noteColors[0].value);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim()) {
      setError("Give your note a title to save it.");
      return;
    }
    if (!content.trim()) {
      setError("Add a little content before saving.");
      return;
    }

    setError("");
    setIsSaving(true);
    try {
      const note = { title: title.trim(), content: content.trim(), tags, color };
      if (type === "edit") {
        await axiosInstance.put(`/notes/edit-note/${noteData._id}`, note);
        showToastMessage("Your note has been updated");
      } else {
        await axiosInstance.post("/notes/add-note", note);
        showToastMessage("A new note, safely saved");
      }
      await getAllNotes();
      onClose();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Couldn't save your note. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="note-editor" onSubmit={handleSubmit}>
      <div className="editor-header">
        <div className="editor-heading-icon"><MdOutlineNotes /></div>
        <div>
          <p className="editor-eyebrow">{type === "edit" ? "EDIT NOTE" : "NEW NOTE"}</p>
          <h2>{type === "edit" ? "Edit your note" : "Create a note"}</h2>
        </div>
        <button type="button" className="editor-close" onClick={onClose} aria-label="Close editor">
          <MdClose />
        </button>
      </div>

      <label className="editor-label" htmlFor="note-title">TITLE</label>
      <input
        id="note-title"
        autoFocus
        className="editor-title-input"
        type="text"
        placeholder="Give this note a title"
        value={title}
        maxLength={120}
        onChange={(event) => setTitle(event.target.value)}
      />

      <div className="editor-content-label">
        <label className="editor-label" htmlFor="note-content">CONTENT</label>
        <span>{content.trim() ? content.trim().split(/\s+/).length : 0} words</span>
      </div>
      <textarea
        id="note-content"
        className="editor-content-input"
        placeholder="Write something you want to remember..."
        rows={8}
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />

      <div className="editor-label color-label">NOTE COLOR</div>
      <div className="color-options" role="group" aria-label="Note color">
        {noteColors.map((noteColor) => (
          <button
            key={noteColor.value}
            type="button"
            className={`color-option ${color === noteColor.value ? "chosen" : ""}`}
            style={{ "--swatch-color": noteColor.value }}
            onClick={() => setColor(noteColor.value)}
            aria-label={noteColor.label}
            aria-pressed={color === noteColor.value}
          />
        ))}
      </div>

      <div className="editor-label tag-label">TAGS</div>
      <TagInput tags={tags} setTags={setTags} />

      {error && <p className="editor-error">{error}</p>}

      <div className="editor-footer">
        <p><MdAutoAwesome /> Your notes are saved to your account.</p>
        <div>
          <button type="button" className="editor-cancel" onClick={onClose}>Cancel</button>
          <button type="submit" className="editor-save" disabled={isSaving}>
            {isSaving ? "Saving..." : type === "edit" ? "Save changes" : "Save note"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEditNotes;
