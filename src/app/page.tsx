import Navigation from "@/components/layout/Navigation";
import RepositorySearchModal from "@/components/layout/RepositorySearchModal";

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="grid justify-center items-center flex-1">
        <RepositorySearchModal />
      </div>
    </>
  );
}
