import { FunctionComponent } from "react";

type Iprops = {
  imageUrl: string;
  alt: string;
  className?: string;
};

const Image: FunctionComponent<Iprops> = ({ imageUrl, alt, className }) => {
  return (
    <div className="h-full rounded-full bg-lotion/50">
      <img
        src={imageUrl + `?time=${Date.now()}`}
        alt={alt}
        className={className}
      />
    </div>
  );
};

export default Image;
