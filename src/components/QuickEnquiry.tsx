import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./PageElements";
import { countries } from "@/data/formData";
import { products } from "@/data/products";
export default function QuickEnquiry() {
  const [country, setCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [product, setProduct] = useState(products[0].id);
  const query = new URLSearchParams({ type: "quotation", quantity, product });
  if (country) query.set("country", country);
  return (
    <div className="quick-enquiry">
      <div>
        <p className="eyebrow">Your requirement</p>
        <h3>What are you sourcing?</h3>
      </div>
      <label className="full-field">
        Product
        <select value={product} onChange={event => setProduct(event.target.value)}>
          {products.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </label>
      <label>
        Destination
        <select
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        >
          <option value="">Choose destination</option>
          {countries.map(value => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label>
        Estimated quantity
        <select
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        >
          <option value="">To be discussed</option>
          <option value="500">500 kg</option>
          <option value="1000">1,000 kg</option>
          <option value="5000">5,000 kg+</option>
        </select>
      </label>
      <Link to={`/request-quote?${query}`} className="btn-primary">
        Build my enquiry <Icon>north_east</Icon>
      </Link>
    </div>
  );
}
