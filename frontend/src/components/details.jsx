import "../styles/details.css";
import { useData } from "./Datacontext";
const Details = () => {
  const { detailsHtml, setDetailsHtml } = useData();

  return (
    <div>
      <div
        className="details"
        dangerouslySetInnerHTML={{ __html: detailsHtml }}
      />
    </div>
  );
};

export default Details;
