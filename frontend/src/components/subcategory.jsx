import "../styles/subcategory.css";
import { useData } from "./Datacontext";
const Subcategory = () => {
  const { subcategories, setSubcategories } = useData();
  console.log("inside subcategory component", subcategories);
  return (
    <div className="sub-menu">
      {subcategories.subcategory.map((subcategory, index) => (
        <div key={index} className="subcategory-item">
          {subcategory}
        </div>
      ))}
    </div>
  );
};

export default Subcategory;
