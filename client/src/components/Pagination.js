/* eslint-disable jsx-a11y/anchor-is-valid */
import paginate from '../utils/paginate';

export default function Pagination({
  className,
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  children,
}) {
  const {
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    pages,
    totalPages,
  } = paginate(totalItems, currentPage, pageSize);

  if (totalPages === 1) return null;

  return (
    <div className={className}>
      {children({
        pages,
        previousPage,
        nextPage,
        hasPreviousPage,
        hasNextPage,
        totalPages,
        currentPage,
      })}
    </div>
    // <div className="pagination-wrapper">
    //   <ul className="pagination">
    //     <li className="pagination-meta">
    //       Page {currentPage} of {totalPages}
    //     </li>
    //     {hasPreviousPage && (
    //       <>
    //         <li className="page-item pagination-first">
    //           <a className="page-link" onClick={() => onPageChange(1)}>
    //             First
    //           </a>
    //         </li>
    //         <li className="page-item pagination-prev">
    //           <a
    //             className="page-link"
    //             onClick={() => onPageChange(previousPage)}
    //           >
    //             &#8592;&nbsp;Previous
    //           </a>
    //         </li>
    //       </>
    //     )}
    //     {pages.map((page) => (
    //       <li
    //         key={page}
    //         className={currentPage === page ? "page-item active" : "page-item"}
    //       >
    //         <a className="page-link" onClick={() => onPageChange(page)}>
    //           {page}
    //         </a>
    //       </li>
    //     ))}
    //     {hasNextPage && (
    //       <>
    //         <li className="page-item pagination-next">
    //           <a className="page-link" onClick={() => onPageChange(nextPage)}>
    //             Next&nbsp;&#8594;
    //           </a>
    //         </li>
    //         <li className="page-item pagination-last">
    //           <a className="page-link" onClick={() => onPageChange(totalPages)}>
    //             Last
    //           </a>
    //         </li>
    //       </>
    //     )}
    //   </ul>
    // </div>
  );
}