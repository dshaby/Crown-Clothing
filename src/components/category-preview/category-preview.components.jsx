import { Link } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";
import Spinner from "../../components/spinner/spinner.component";
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading } from "../../store/categories/categories.selector";

const CategoryPreview = ({ title, products }) => {
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <div className="category-preview-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h2>
            <Link className="title" to={title}>
              {title.toUpperCase()}
            </Link>
          </h2>
          <div className="preview">
            {products
              .filter((product, index) => index < 4)
              .map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};
export default CategoryPreview;
