
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from "@/components/ui/pagination";

interface UserPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const UserPagination: React.FC<UserPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage 
}) => {
  // Generate page numbers for pagination with ellipsis
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are few pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push({ type: 'page', number: i });
      }
    } else {
      // Always show first page
      pages.push({ type: 'page', number: 1 });
      
      // Add ellipsis or pages
      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push({ type: 'page', number: i });
        }
        pages.push({ type: 'ellipsis' });
      } else if (currentPage >= totalPages - 2) {
        pages.push({ type: 'ellipsis' });
        for (let i = totalPages - 3; i <= totalPages - 1; i++) {
          pages.push({ type: 'page', number: i });
        }
      } else {
        pages.push({ type: 'ellipsis' });
        pages.push({ type: 'page', number: currentPage - 1 });
        pages.push({ type: 'page', number: currentPage });
        pages.push({ type: 'page', number: currentPage + 1 });
        pages.push({ type: 'ellipsis' });
      }
      
      // Always show last page
      pages.push({ type: 'page', number: totalPages });
    }
    
    return pages;
  };

  return (
    <div className="mt-4 flex justify-end">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {getPageNumbers().map((page, index) => (
            page.type === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={page.number}>
                <PaginationLink 
                  isActive={currentPage === page.number}
                  onClick={() => setCurrentPage(page.number)}
                >
                  {page.number}
                </PaginationLink>
              </PaginationItem>
            )
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default UserPagination;
