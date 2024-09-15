import Navigation from "@/components/layout/Navigation";
import RepositorySubNavigation from "@/components/layout/RepositorySubNavigation";
import React from "react";

type PageParams = {
  params: {
    slug: string[];
  };
};

export default function Page({ params }: PageParams) {
  return (
    <>
      <Navigation route={params.slug} subnavigation={<RepositorySubNavigation />} />
    </>
  );
}
