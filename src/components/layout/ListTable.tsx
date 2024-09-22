import React, { ReactNode } from "react";
import ListPagination from "./ListPagination";

type CodeTreeProps = {
  head?: ReactNode;
  items: ReactNode[] | undefined;
  page?: number;
  pages?: number;
  emptyMessage?: string;
};

export default function ListTable({ head, items, page, pages, emptyMessage }: CodeTreeProps) {
  if (!items || items.length === 0)
    return <div className="flex justify-center">{emptyMessage ?? "Empty."}</div>;

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
      {page != undefined && pages != undefined && <ListPagination page={page} pages={pages} />}
    </>
  );
}
