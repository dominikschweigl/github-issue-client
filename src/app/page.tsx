import Navigation from "@/components/layout/Navigation";
import RepositorySearchModal from "@/components/layout/RepositorySearchModal";
import { ArrowRight, CircleDot, MessagesSquare } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="grid lg:grid-cols-2 gap-48 justify-between items-center flex-1 sm:px-4 md:px-6 mx-auto">
        <div className="grid gap-4">
          <h1 className="text-7xl font-bold">GitHub Viewer</h1>
          <p>Search your repository and browse through issues and discussions.</p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-2 border rounded-lg p-4 hover:bg-white hover:bg-opacity-10 transition-colors">
              <CircleDot className="w-5 h-5" />
              Watch Issues
              <ArrowRight className="ml-auto w-5 h-5" />
            </div>
            <div className="flex items-center gap-2 border rounded-lg p-4 hover:bg-white hover:bg-opacity-10 transition-colors">
              <MessagesSquare className="w-5 h-5" />
              Follow Discussions
              <ArrowRight className="ml-auto w-5 h-5" />
            </div>
          </div>
        </div>
        <div>
          <RepositorySearchModal />
        </div>
      </div>
      <Image
        src={"blurry_blob.svg"}
        alt=""
        width={1800}
        height={500}
        className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 -z-10 opacity-20"
      />
    </>
  );
}
