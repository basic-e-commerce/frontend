import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.scss";

const Pagination = ({ itemsPerPage, items, setCurrentItems }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const pageCount = Math.ceil(items?.length / itemsPerPage);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
  }, [itemOffset, items, itemsPerPage, setCurrentItems]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      className="paginate"
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      activeLinkClassName="activePageLink"
      activeClassName="activePage"
      previousClassName="prevButton"
      nextClassName="nextButton"
    />
  );
};

export default Pagination;
