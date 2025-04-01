
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

interface DataPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  pageSize?: number;
  totalItems?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  position?: 'left' | 'center' | 'right';
  showPageSize?: boolean;
}

const DataPagination: React.FC<DataPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage,
  pageSize,
  totalItems,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  position = 'right',
  showPageSize = false
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
          if (i <= totalPages) {
            pages.push({ type: 'page', number: i });
          }
        }
        if (totalPages > 4) {
          pages.push({ type: 'ellipsis' });
        }
      } else if (currentPage >= totalPages - 2) {
        pages.push({ type: 'ellipsis' });
        for (let i = totalPages - 3; i <= totalPages - 1; i++) {
          if (i > 1) {
            pages.push({ type: 'page', number: i });
          }
        }
      } else {
        pages.push({ type: 'ellipsis' });
        pages.push({ type: 'page', number: currentPage - 1 });
        pages.push({ type: 'page', number: currentPage });
        pages.push({ type: 'page', number: currentPage + 1 });
        pages.push({ type: 'ellipsis' });
      }
      
      // Always show last page if it's different from first page
      if (totalPages > 1) {
        pages.push({ type: 'page', number: totalPages });
      }
    }
    
    return pages;
  };

  const positionClass = {
    'left': 'justify-start',
    'center': 'justify-center',
    'right': 'justify-end'
  }[position];

  // Calculate displayed item range
  const startItem = Math.min(totalItems || 0, (currentPage - 1) * (pageSize || 10) + 1);
  const endItem = Math.min(totalItems || 0, currentPage * (pageSize || 10));

  return (
    <div className={`mt-4 flex ${positionClass}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        {(totalItems !== undefined && pageSize !== undefined) && (
          <div className="text-sm text-muted-foreground">
            Showing {startItem}-{endItem} of {totalItems} items
          </div>
        )}
        
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
        
        {showPageSize && onPageSizeChange && pageSize && (
          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-muted-foreground">Items per page:</span>
            <select 
              value={pageSize} 
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-8 px-2 rounded border border-input bg-background text-sm"
            >
              {pageSizeOptions.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPagination;
