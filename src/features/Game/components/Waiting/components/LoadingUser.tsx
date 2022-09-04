export default function LoadingPlayer() {
  return (
    // <div className=" w-fit flex items-center">
    //   <div className="rounded-full w-16 h-16 bg-queenBlue/50 mr-2"></div>
    //   <div className="grow flex flex-col gap-1">
    //     <div className="rounded-3xl h-4 w-20 bg-queenBlue"></div>
    //     <div className="rounded-3xl h-3 w-16 bg-queenBlue"></div>
    //   </div>
    // </div>
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full w-16 h-16 bg-queenBlue/70"></div>
      <div className="flex-1 space-y-2 pt-2">
        <div className="h-4 w-24 bg-queenBlue/70 rounded-2xl"></div>
        <div className="w-16">
          <div className="h-[12px] bg-queenBlue/70 rounded-2xl col-span-1"></div>
        </div>
      </div>
    </div>
  );
}
