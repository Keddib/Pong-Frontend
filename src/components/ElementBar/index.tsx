type Props = {
  children: JSX.Element;
  rank: number;
};

const RANKS = [
  {
    className: "border-crayola hover:border-crayola",
    line: "bg-crayola group-hover:bg-crayola",
  },
  {
    className: "border-[#D7D7D7] hover:border-[#D7D7D7]",
    line: "bg-[#D7D7D7] group-hover:bg-[#D7D7D7]",
  },
  {
    className: "border-[#AD8A56] hover:border-[#AD8A56]",
    line: "bg-[#AD8A56] group-hover:bg-[#AD8A56]",
  },
];

const ElementBar = (props: Props) => {
  return (
    <div
      className={`group element-bar gap-10 ${
        props.rank != -1 && props.rank < 3 ? RANKS[props.rank].className : ""
      }`}
    >
      <span
        className={`element-bar-line ${
          props.rank != -1 && props.rank < 3 ? RANKS[props.rank].line : ""
        }`}
      ></span>
      {props.children}
    </div>
  );
};

export default ElementBar;
