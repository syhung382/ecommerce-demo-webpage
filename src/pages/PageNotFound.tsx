import { useEffect, useState } from "react";
import LoadingComponent from "../components/layouts/LoadingComponent";

const PageNotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "404 Not Found!";

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingComponent></LoadingComponent>;

  return <div>PageNotFound</div>;
};

export default PageNotFound;
