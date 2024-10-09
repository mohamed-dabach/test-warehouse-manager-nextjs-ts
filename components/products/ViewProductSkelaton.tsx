import React from "react";

export default function ViewProductSkelaton() {
  return (
    <div className="w-full">
      <div className="container max-w-2xl m-auto p-2 ">
        <div className="flex  justify-end w-full gap-4 mb-3">
          <div className="px-7 py-3 skeleton"></div>
          <div className="px-7 py-3 skeleton"></div>
        </div>
        <div className="md:flex gap-2 justify-btween items-center ">
          <div className="w-[200px]  h-[250px] skeleton"></div>
          <div>
            <h3 className="px-2 py-3 mt-2 skeleton w-[200px] rounded-lg"></h3>
            <p className="px-2 py-3 mt-2 skeleton w-full"></p>
            <p className="px-2 py-3 mt-2 skeleton w-full"></p>
            <p className="px-2 py-3 mt-2 skeleton w-full"></p>
            <p className="my-2 px-2 py-3 mt-2 skeleton w-[200px] rounded-lg"></p>
            <div className="px-4 py-3 skeleton w-fit rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
