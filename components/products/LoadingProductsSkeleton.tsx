export default function LoadingProductsSkeleton() {
  return (
    <>
      {Array(6)
        .fill(1)
        .map((i) => (
          <ProductListItem key={i} />
        ))}
    </>
  );
}

function ProductListItem() {
  return (
    <div className=" skeleton p-3 pt-8 border rouneded  border-gray-200 rounded-lg shadow relative flex h-[200px] ">
      <div className="absolute top-2 right-2 flex gap-3 z-20  px-2 py-1 ">
        <div className=" px-3 py-3  bg-gray-100 rounded-md "></div>
        <div className=" px-3 py-3  bg-gray-100 rounded-md "></div>
        <div className=" px-3 py-3  bg-gray-100 rounded-md "></div>
      </div>
      <div className="z-20 relative flex flex-col flex-1 justify-between ">
        <h5 className="mb-2 mt-3 z-10   py-4 rounded-lg bg-gray-100 "></h5>

        <div className="flex justify-between mt-3  z-10 ">
          <div className="flex items-center justify-center">
            <span className=" px-3 py-3 bg-gray-100  rounded-md "></span>
          </div>

          <p className=" px-3 py-3 bg-gray-100  rounded-md "> </p>
        </div>
      </div>
    </div>
  );
}
