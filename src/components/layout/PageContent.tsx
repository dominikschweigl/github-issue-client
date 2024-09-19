import React from "react";

type PageContentProps = {
  children?: React.ReactNode;
};

export default function PageContent({ children }: PageContentProps) {
  return <div className="pt-8 px-3 sm:px-4 md:px-6 mx-auto w-screen max-w-[880px] mb-10">{children}</div>;
}
