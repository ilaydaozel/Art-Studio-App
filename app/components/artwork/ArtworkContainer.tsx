"use client";
import { UserArtwork } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";

interface ArtworkContainerProps {
  artwork?: UserArtwork | null;
  label: string;
}
const ArtworkContainer: React.FC<ArtworkContainerProps> = ({
  artwork,
  label,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    console.log("clicked ", label);

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
      console.log("currentQuery 2", qs.parse(params.toString()));
      console.log("params", params);
    }

    const updatedQuery: any = {
      ...currentQuery,
      labelName: label,
    };
    console.log("updated ", updatedQuery);
    if (params?.get("labelName") == label) {
      delete updatedQuery.labelName;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className="p-4
            md:py-2
            md:px-2
            md:my-1
            border-[1px] 
            text-neutral-500 
            bg-amber-100
            w-[20vw]"
    >
      This is an artwork
    </div>
  );
};

export default ArtworkContainer;
