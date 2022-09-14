import { useRef } from "react";
import useOutsideAlerter from "~/src/hooks/useOutSide";

type Props = {
  className: string;
  children: JSX.Element;
  close: () => void;
};

const Dropdown = ({ className, children, close }: Props) => {
  const dropRef = useRef<null | HTMLDivElement>(null);
  useOutsideAlerter(dropRef, close);
  return (
    <div className={`dropdown ${className}`} ref={dropRef}>
      {children}
    </div>
  );
};
export default Dropdown;
