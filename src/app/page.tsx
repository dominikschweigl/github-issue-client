import Navigation from "@/components/layout/Navigation";
import RepositorySearchModal from "@/components/layout/RepositorySearchModal";
import { ArrowRight, CircleDot, MessagesSquare } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-48 justify-between items-start lg:items-center lg:flex-1 px-3 sm:px-4 md:px-6 mx-auto pt-10 lg:pt-0 pb-4">
        <div className="grid gap-4">
          <h1 className="text-5xl sm:text-7xl font-bold">GitHub Viewer</h1>
          <p>Search your repository and browse through issues and discussions.</p>
          <div className="grid sm:grid-cols-2 gap-4 sm:mt-6">
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
      <div className="absolute w-screen h-screen overflow-hidden -z-10">
        <Image
          src={"blurry_blob.svg"}
          alt=""
          width={1800}
          height={400}
          className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 -z-10 opacity-20"
        />
      </div>
    </>
  );
}
