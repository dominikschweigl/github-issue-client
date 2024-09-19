import React, { ReactNode } from "react";
import ListPagination from "./ListPagination";

type CodeTreeProps = {
  head?: ReactNode;
  items: ReactNode[] | undefined;
  page?: number;
  pages?: number;
};

export default function ListTable({ head, items, page, pages }: CodeTreeProps) {
  if (!items || items.length === 0) return "empty repository";

  return (
    <>
      <div className="flex flex-col border rounded-lg overflow-clip">
        <div
          className={`
           min-h-10 bg-white bg-opacity-[5%] py-3 px-4`}
        >
          {head}
        </div>
        {items.map((item, index) => (
          <div className={`${index < items.length ? "border-t" : ""} py-2.5 px-4`} key={index}>
            {item}
          </div>
        ))}
      </div>
      {page && pages && <ListPagination page={page} pages={pages} />}
    </>
  );
}
