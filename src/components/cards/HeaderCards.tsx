import React from "react";

// components

import HeaderCard from "./HeaderCard";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-10 pt-2">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <HeaderCard/>
              </div>
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <HeaderCard/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}