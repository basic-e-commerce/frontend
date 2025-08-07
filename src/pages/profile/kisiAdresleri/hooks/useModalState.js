import { useState, useEffect } from "react";

export const useModalState = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (modalOpen || showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen, showPopup]);

  const openAddModal = () => {
    setEditMode(false);
    setSelectedId(null);
    setModalOpen(true);
  };

  const openEditModal = (id) => {
    setEditMode(true);
    setSelectedId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(false);
    setSelectedId(null);
  };

  const openDeletePopup = (id) => {
    setSelectedId(id);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedId(null);
  };

  return {
    modalOpen,
    showPopup,
    editMode,
    selectedId,
    openAddModal,
    openEditModal,
    closeModal,
    openDeletePopup,
    closePopup,
  };
};
