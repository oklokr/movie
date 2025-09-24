"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  total: number; // 전체 건수
  size: number; // 페이지당 건수
  pageRange?: number;
}

export default function Pagination({ total, size, pageRange = 5 }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const totalPages = Math.ceil(total / size);

  const handlePageClick = (page: number) => {
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
    <div className="pagenation">
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
