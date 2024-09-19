"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";

import React from "react";

type ListPaginationProps = {
  page: number;
  pages: number;
};

export default function ListPagination({ page, pages }: ListPaginationProps) {
  const currentRange = [-2, -1, 0, 1, 2].map((a) => a + page);
  const nextPage = page + 1;
  const previousPage = page - 1;

  const updateQuery = useUpdateSearchParams();

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious isActive={1 < page} href={updateQuery("page", `${previousPage}`)} />
        </PaginationItem>
        <PaginationItem className={`${Math.min(...currentRange) <= 1 && "hidden"}`}>
          <PaginationLink href={updateQuery("page", "1")}>1</PaginationLink>
        </PaginationItem>
        <PaginationItem className={`${Math.min(...currentRange) <= 2 && "hidden"}`}>
          <PaginationEllipsis />
        </PaginationItem>
        {currentRange.map(
          (p) =>
            p > 0 &&
            p <= pages && (
              <PaginationItem key={p}>
                <PaginationLink isActive={p === page} href={updateQuery("page", `${p}`)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
        )}
        <PaginationItem className={`${Math.max(...currentRange) >= pages - 1 && "hidden"}`}>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem className={`${Math.max(...currentRange) >= pages && "hidden"}`}>
          <PaginationLink href={updateQuery("page", `${pages}`)}>{pages}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext isActive={page < pages} href={updateQuery("page", `${nextPage}`)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
