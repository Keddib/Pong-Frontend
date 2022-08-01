import Award from "assets/icons/award.svg";
import { FunctionComponent } from "react";

const Rank: FunctionComponent<{ index: number }> = ({ index }) => {
  return (
    <>
      {index > 2 ? (
        <span className="w-6 h-6">{index + 1}</span>
      ) : (
        <Award
          className={`w-6 h-6 ${
            index == 0
              ? "fill-crayola"
              : index == 1
              ? "fill-[#D7D7D7]"
              : "fill-[#AD8A56]"
          }`}
        />
      )}
    </>
  );
};

export default Rank;
