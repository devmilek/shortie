"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <>
      <Input
        className="max-w-xs"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Search by destination or short code"
        defaultValue={searchParams.get("query")?.toString()}
      />
      <p>
        {process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
          ? "https://app.dub.co"
          : "dupa"}
      </p>
    </>
  );
};

export default SearchInput;
