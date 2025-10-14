"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  total: number;
  size: number;
  pageRange?: number;
  modal?: boolean;
  light?: boolean;
  pageChange?: (page: number) => void;
}

export default function Pagination({
  total,
  size,
  pageRange = 5,
  modal = false,
  light = false,
  pageChange,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    modal ? 1 : parseInt(searchParams.get("page") || "1")
  );
  const totalPages = Math.ceil(total / size);

  useEffect(() => {
    if (!modal) setCurrentPage(parseInt(searchParams.get("page") || "1"));
  }, [searchParams, modal]);

  const handlePageClick = (page: number) => {
    if (modal) {
      setCurrentPage(page);
      pageChange?.(page);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const pages: number[] = [];
  const half = Math.floor(pageRange / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  if (currentPage - half < 1) {
    end = Math.min(totalPages, end + (half - currentPage + 1));
  }
  if (currentPage + half > totalPages) {
    start = Math.max(1, start - (currentPage + half - totalPages));
  }

  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className={`pagenation ${light ? "light" : ""}`}>
      <button disabled={currentPage === 1} onClick={() => handlePageClick(1)}>
        {"<<"}
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        {"<"}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        {">"}
      </button>
      <button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => handlePageClick(totalPages)}
      >
        {">>"}
      </button>
    </div>
  );
}
