import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="w-9 h-9 rounded-full flex items-center justify-center text-ivory/70 hover:bg-base-850 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <HiOutlineChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
            page === currentPage
              ? "bg-gradient-to-r from-gold-400 to-gold-600 text-base-950"
              : "text-ivory/70 hover:bg-base-850"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="w-9 h-9 rounded-full flex items-center justify-center text-ivory/70 hover:bg-base-850 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <HiOutlineChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

export default Pagination;
