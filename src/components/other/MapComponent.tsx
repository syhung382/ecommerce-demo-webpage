import { useNavigate } from "react-router-dom";
import type { MapComponentProps } from "../../utils/interface";
import { IconChevronRight } from "../icons";

const MapComponent = ({ title, mapItem }: MapComponentProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-10 lg:px-30 xl:px-60 py-10 lg:py-20 bg-blue-100 dark:bg-gray-900/20">
      <h1 className="font-bold text-3xl text-blue-950 dark:text-blue-800">
        {title}
      </h1>
      <div className="flex gap-x-2 font-semibold text-sm items-center">
        {mapItem?.map((item, index) => {
          const isLast = index === mapItem.length - 1;
          return (
            <div key={item.title} className="flex items-center gap-x-2">
              <span
                onClick={() => navigate(item.url)}
                className={`cursor-pointer ${isLast ? "text-pink-600" : ""}`}
              >
                {item.title}
              </span>
              {!isLast && <IconChevronRight width={10} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapComponent;
