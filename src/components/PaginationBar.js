import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationBar = ({ pageNum, setPageNum, totalPageNum, loading }) => {
  const handleClick = (page) => {
    if (!loading) {
      setPageNum(parseInt(page));
    }
  };

  const handleClickOnNext = () => {
    if (pageNum < totalPageNum && !loading) {
      setPageNum((num) => num + 1);
    }
  };

  const handleClickOnPrev = () => {
    if (pageNum > 1 && !loading) {
      setPageNum((num) => num - 1);
    }
  };

  return (
    <Pagination>
      <Pagination.Prev disabled={pageNum === 1} onClick={handleClickOnPrev} />
      <Pagination.Item active={pageNum === 1} onClick={() => handleClick(1)}>
        {1}
      </Pagination.Item>

      {pageNum - 2 > 1 && <Pagination.Ellipsis />}

      {pageNum - 1 > 1 && (
        <Pagination.Item
          active={pageNum === pageNum - 1}
          onClick={() => handleClick(pageNum - 1)}
        >
          {pageNum - 1}
        </Pagination.Item>
      )}
      {pageNum > 1 && pageNum < totalPageNum && (
        <Pagination.Item active>{pageNum}</Pagination.Item>
      )}
      {pageNum + 1 < totalPageNum && (
        <Pagination.Item
          active={pageNum === pageNum + 1}
          onClick={() => handleClick(pageNum + 1)}
        >
          {pageNum + 1}
        </Pagination.Item>
      )}

      {totalPageNum > pageNum + 2 && <Pagination.Ellipsis />}

      {totalPageNum > 1 && (
        <Pagination.Item
          active={pageNum === totalPageNum}
          onClick={() => handleClick(totalPageNum)}
        >
          {totalPageNum}
        </Pagination.Item>
      )}
      <Pagination.Next
        disabled={pageNum === totalPageNum}
        onClick={handleClickOnNext}
      />
    </Pagination>
  );
};

export default PaginationBar;
