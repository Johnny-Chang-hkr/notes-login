import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/Cards/EmptyCard";

const Home = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false, // Changed from isShow to isShown to match the prop
    message: "",
    type: "add",
  });

  const navigate = useNavigate();

  // Helper to trigger toast
  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/users/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      localStorage.clear();
      navigate("/login");
    }
  };

  // Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred.", error);
    }
  };

  // Delete Note logic
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/notes/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred.");
    }
  };

  // Search for a Note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/notes/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Clear Search
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  // update IsPinned
const updateIsPinned = async (noteData) => {
  const noteId = noteData._id;

  try {
    const response = await axiosInstance.put("/notes/update-note-pinned/" + noteId, {
      // FIX: Use noteData.isPinned instead of noteId.isPinned
      isPinned: !noteData.isPinned,
    });

    if (response.data && response.data.note) {
      // Suggestion: Change message to "Note Pinned Successfully" for better UX
      showToastMessage("Note Updated Successfully", "add");
      getAllNotes();
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
  <Navbar
    userInfo={userInfo}
    onSearchNote={onSearchNote}
    handleClearSearch={handleClearSearch}
  />

  {/* Main Content */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
    {allNotes.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {allNotes.map((item) => (
          <NoteCard
            key={item._id}
            title={item.title}
            date={item.createdOn}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => deleteNote(item)}
            onPinNote={() => updateIsPinned(item)}
          />
        ))}
      </div>
    ) : (
      <div className="mt-10">
        <EmptyCard />
      </div>
    )}
  </div>

  {/* Floating Add Button */}
  <button
    className="
      w-14 h-14 sm:w-16 sm:h-16
      flex items-center justify-center
      rounded-2xl
      bg-primary hover:bg-blue-600
      fixed bottom-5 right-5 sm:bottom-8 sm:right-8
      shadow-xl
      transition-all duration-200
      hover:scale-105
      z-50
    "
    onClick={() =>
      setOpenAddEditModal({
        isShown: true,
        type: "add",
        data: null,
      })
    }
  >
    <MdAdd className="text-[28px] sm:text-[32px] text-white" />
  </button>

  {/* Modal */}
  <Modal
    isOpen={openAddEditModal.isShown}
    onRequestClose={() =>
      setOpenAddEditModal({
        isShown: false,
        type: "add",
        data: null,
      })
    }
    style={{
      overlay: {
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 1000,
      },
    }}
    className="
      w-full
      max-w-lg
      max-h-[90vh]
      overflow-y-auto
      bg-white
      rounded-2xl
      p-4 sm:p-6
      shadow-2xl
      outline-none
    "
  >
    <AddEditNotes
      type={openAddEditModal.type}
      noteData={openAddEditModal.data}
      onClose={() =>
        setOpenAddEditModal({
          isShown: false,
          type: "add",
          data: null,
        })
      }
      getAllNotes={getAllNotes}
      showToastMessage={showToastMessage}
    />
  </Modal>

  {/* Toast */}
  <Toast
    isShown={showToastMsg.isShown}
    message={showToastMsg.message}
    type={showToastMsg.type}
    onClose={handleCloseToast}
  />
</>
  );
};

export default Home;


/* 
<>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto px-6">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10 shadow-lg"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
  onRequestClose={() =>
    setOpenAddEditModal({ isShown: false, type: "add", data: null })
  }
  style={{
    overlay: {
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  }}
  className="w-[90%] md:w-[500px] max-h-[80vh] bg-white rounded-2xl p-6 shadow-2xl outline-none"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      {/* FIXED PROP NAME HERE *//*}
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </> */