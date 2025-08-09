import { useState, useEffect } from "react";

export const useModalStateKargo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showFavoritePopup, setShowFavoritePopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (modalOpen || showFavoritePopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpen, showFavoritePopup]);

  const openAddModal = () => {
    setSelectedId(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  const openFavoritePopup = (id) => {
    setSelectedId(id);
    setShowFavoritePopup(true);
  };

  const closeFavoritePopup = () => {
    setShowFavoritePopup(false);
    setSelectedId(null);
  };

  return {
    modalOpen,
    selectedId,
    openAddModal,
    closeModal,
    showFavoritePopup,
    openFavoritePopup,
    closeFavoritePopup,
  };
};
