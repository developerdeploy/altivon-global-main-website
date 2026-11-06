import { Link } from "react-router-dom";
import { products } from "@/data/products";

export default function ProductCollection() {
  return (
    <div className="product-collection">
      {products.map(product => (
        <article className="collection-item" key={product.id} data-reveal>
          <Link to={`/products/${product.slug}`} className="collection-photo" aria-label={`Explore ${product.name}`}>
            <img src={product.image} alt={product.imageAlt} width="461" height="461" loading="lazy" decoding="async" />
            <span aria-hidden="true">Explore ↗</span>
          </Link>
          <h3><Link to={`/products/${product.slug}`}>{product.name}</Link></h3>
          <p>{product.summary}</p>
        </article>
      ))}
    </div>
  );
}
