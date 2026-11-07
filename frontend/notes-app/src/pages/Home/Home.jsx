import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MdAdd,
  MdAutoAwesome,
  MdCheck,
  MdGridView,
  MdLabelOutline,
  MdOutlinePushPin,
  MdSort,
  MdViewAgenda,
} from "react-icons/md";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import NoteReader from "../../components/Cards/NoteReader";
import Toast from "../../components/ToastMessage/Toast";
import AddEditNotes from "./AddEditNotes";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTag, setActiveTag] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const searchInputRef = useRef(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [toast, setToast] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const navigate = useNavigate();

  const showToastMessage = (message, type = "add") => {
    setToast({ isShown: true, message, type });
  };

  const closeEditor = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  const getAllNotes = useCallback(async () => {
    setLoadError("");
    try {
      const response = await axiosInstance.get("/notes/get-all-notes");
      setAllNotes(response.data?.notes || []);
    } catch (error) {
      setLoadError(
        error.response?.data?.message || "We couldn't load your notes. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserInfo = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/users/get-user");
      if (response.data?.user) setUserInfo(response.data.user);
    } catch {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, [getAllNotes, getUserInfo]);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.key === "Escape" && !selectedNoteId && searchQuery) {
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [searchQuery, selectedNoteId]);

  const tags = useMemo(
    () => [...new Set(allNotes.flatMap((note) => note.tags || []))].sort(),
    [allNotes],
  );

  const visibleNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = allNotes.filter((note) => {
      const matchesSearch =
        !query ||
        [note.title, note.content, ...(note.tags || [])]
          .join(" ")
          .toLowerCase()
          .includes(query);
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "pinned" && note.isPinned) ||
        (activeFilter === "tag" && (note.tags || []).includes(activeTag));
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((first, second) => {
      if (sortBy === "title") return first.title.localeCompare(second.title);
      const firstDate = new Date(first.createdOn || 0).getTime();
      const secondDate = new Date(second.createdOn || 0).getTime();
      return sortBy === "oldest" ? firstDate - secondDate : secondDate - firstDate;
    });
  }, [allNotes, searchQuery, activeFilter, activeTag, sortBy]);

  const openNewNote = () =>
    setOpenAddEditModal({ isShown: true, type: "add", data: null });

  const handleEdit = (note) =>
    setOpenAddEditModal({ isShown: true, type: "edit", data: note });

  const selectedNote = allNotes.find((note) => note._id === selectedNoteId) || null;
  const closeNoteReader = () => setSelectedNoteId(null);
  const editSelectedNote = (note) => {
    closeNoteReader();
    handleEdit(note);
  };

  const deleteNote = async (note) => {
    try {
      await axiosInstance.delete(`/notes/delete-note/${note._id}`);
      setAllNotes((currentNotes) =>
        currentNotes.filter((currentNote) => currentNote._id !== note._id),
      );
      showToastMessage("Note deleted", "delete");
    } catch (error) {
      showToastMessage(
        error.response?.data?.message || "Couldn't delete this note. Please try again.",
        "error",
      );
    }
  };

  const togglePinned = async (note) => {
    try {
      const response = await axiosInstance.put(
        `/notes/update-note-pinned/${note._id}`,
        { isPinned: !note.isPinned },
      );
      if (response.data?.note) {
        setAllNotes((currentNotes) =>
          currentNotes.map((currentNote) =>
            currentNote._id === note._id ? response.data.note : currentNote,
          ),
        );
        showToastMessage(note.isPinned ? "Note unpinned" : "Note pinned");
      }
    } catch (error) {
      showToastMessage(
        error.response?.data?.message || "Couldn't update the pin. Please try again.",
        "error",
      );
    }
  };

  const chooseFilter = (filter) => {
    setActiveFilter(filter);
    setActiveTag("");
  };

  const chooseTag = (tag) => {
    setActiveFilter("tag");
    setActiveTag(tag);
  };

  const heading =
    activeFilter === "pinned"
      ? "Pinned notes"
      : activeFilter === "tag"
        ? `# ${activeTag}`
        : "All notes";
  const emptyTitle = searchQuery
    ? "No notes found"
    : activeFilter === "pinned"
      ? "Nothing pinned just yet"
      : activeFilter === "tag"
        ? "No notes with this tag"
        : "Your page is still blank";
  const emptyDescription = searchQuery
    ? "Try another search or clear the search field."
    : activeFilter === "pinned"
      ? "Pin a note you want to keep close and it will show up here."
      : activeFilter === "tag"
        ? "Try another tag or browse all of your notes."
        : "Start with a thought, a reminder, or something you don't want to forget.";

  return (
    <div className="app-shell">
      <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        searchInputRef={searchInputRef}
        onSearchNote={setSearchQuery}
        handleClearSearch={() => setSearchQuery("")}
      />

      <div className="workspace">
        <aside className="sidebar">
          <button className="create-note-button" onClick={openNewNote}>
            <MdAdd size={21} />
            <span>Create a note</span>
            <span className="create-shortcut">+</span>
          </button>

          <div className="sidebar-section">
            <p className="sidebar-label">YOUR SPACE</p>
            <button
              className={`sidebar-link ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => chooseFilter("all")}
            >
              <MdGridView />
              <span>All notes</span>
              <span className="sidebar-count">{allNotes.length}</span>
            </button>
            <button
              className={`sidebar-link ${activeFilter === "pinned" ? "active" : ""}`}
              onClick={() => chooseFilter("pinned")}
            >
              <MdOutlinePushPin />
              <span>Pinned</span>
              <span className="sidebar-count">
                {allNotes.filter((note) => note.isPinned).length}
              </span>
            </button>
          </div>

          <div className="sidebar-section tag-section">
            <div className="sidebar-label-row">
              <p className="sidebar-label">YOUR TAGS</p>
              <MdLabelOutline />
            </div>
            {tags.length ? (
              tags.map((tag) => (
                <button
                  key={tag}
                  className={`sidebar-link tag-link ${
                    activeFilter === "tag" && activeTag === tag ? "active" : ""
                  }`}
                  onClick={() => chooseTag(tag)}
                >
                  <span className="tag-dot" />
                  <span className="tag-name">{tag}</span>
                  {activeFilter === "tag" && activeTag === tag && <MdCheck />}
                </button>
              ))
            ) : (
              <p className="sidebar-hint">Tags you add will show up here.</p>
            )}
          </div>

          <div className="sidebar-tip">
            <div className="tip-icon"><MdAutoAwesome /></div>
            <p className="tip-title">A little note goes a long way.</p>
            <p className="tip-copy">Capture a thought before it slips away.</p>
            <button onClick={openNewNote}>Write one now <span>↗</span></button>
          </div>
          <p className="sidebar-footer">A calmer place for your thoughts.</p>
        </aside>

        <main className="notes-main">
          <div className="page-intro">
            <div>
              <p className="eyebrow">YOUR PERSONAL SPACE</p>
              <h1>Good ideas live here<span>.</span></h1>
              <p className="page-subtitle">A little space to think, plan, and remember.</p>
            </div>
            <div className="notes-total">
              <span>{allNotes.length.toString().padStart(2, "0")}</span>
              <span>notes saved</span>
            </div>
          </div>

          <section className="notes-section">
            <div className="notes-heading-row">
              <div>
                <h2>{heading}</h2>
                <p>
                  {searchQuery
                    ? `${visibleNotes.length} result${visibleNotes.length === 1 ? "" : "s"} for “${searchQuery}”`
                    : `${visibleNotes.length} note${visibleNotes.length === 1 ? "" : "s"} to explore`}
                </p>
              </div>
              <div className="notes-controls">
                <label className="sort-control">
                  <MdSort />
                  <select
                    aria-label="Sort notes"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="title">Title A–Z</option>
                  </select>
                </label>
                <div className="view-toggle" aria-label="Note layout">
                  <button
                    aria-label="Grid view"
                    title="Grid view"
                    aria-pressed={viewMode === "grid"}
                    className={viewMode === "grid" ? "selected" : ""}
                    onClick={() => setViewMode("grid")}
                  >
                    <MdGridView />
                  </button>
                  <button
                    aria-label="List view"
                    title="List view"
                    aria-pressed={viewMode === "list"}
                    className={viewMode === "list" ? "selected" : ""}
                    onClick={() => setViewMode("list")}
                  >
                    <MdViewAgenda />
                  </button>
                </div>
              </div>
            </div>

            {loadError ? (
              <div className="notes-message error-message">
                <p>{loadError}</p>
                <button onClick={getAllNotes}>Try again</button>
              </div>
            ) : isLoading ? (
              <div className="notes-grid">
                {[1, 2, 3].map((item) => <div className="note-skeleton" key={item} />)}
              </div>
            ) : visibleNotes.length ? (
              <div className={`notes-grid ${viewMode === "list" ? "list-view" : ""}`}>
                {visibleNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onOpen={() => setSelectedNoteId(note._id)}
                    onEdit={() => handleEdit(note)}
                    onDelete={() => deleteNote(note)}
                    onPinNote={() => togglePinned(note)}
                  />
                ))}
              </div>
            ) : (
              <div className="notes-message empty-message">
                <div className="empty-art"><MdAutoAwesome /></div>
                <h3>{emptyTitle}</h3>
                <p>{emptyDescription}</p>
                {searchQuery ? (
                  <button onClick={() => setSearchQuery("")}>Clear search</button>
                ) : activeFilter !== "all" ? (
                  <button onClick={() => chooseFilter("all")}>Browse all notes</button>
                ) : (
                  <button onClick={openNewNote}><MdAdd /> Create your first note</button>
                )}
              </div>
            )}
          </section>
          <footer className="workspace-footer">Made for the thoughts worth keeping <span>✳</span></footer>
        </main>
      </div>

      <button className="mobile-create-button" aria-label="Create a note" onClick={openNewNote}>
        <MdAdd />
      </button>

      <Modal
        isOpen={Boolean(selectedNote)}
        onRequestClose={closeNoteReader}
        className="read-modal"
        overlayClassName="read-modal-overlay"
        contentLabel={selectedNote?.title || "Read note"}
      >
        <NoteReader
          note={selectedNote}
          onClose={closeNoteReader}
          onEdit={editSelectedNote}
        />
      </Modal>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={closeEditor}
        className="note-modal"
        overlayClassName="note-modal-overlay"
        contentLabel={openAddEditModal.type === "edit" ? "Edit note" : "Create a note"}
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={closeEditor}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={toast.isShown}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((current) => ({ ...current, isShown: false }))}
      />
    </div>
  );
};

export default Home;
