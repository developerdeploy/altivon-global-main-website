import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./PageElements";
import { countries } from "@/data/formData";
export default function QuickEnquiry() {
  const [country, setCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const query = new URLSearchParams({ type: "quotation", quantity });
  if (country) query.set("country", country);
  return (
    <div className="quick-enquiry">
      <div>
        <p className="eyebrow">Your requirement</p>
        <h3>What are you sourcing?</h3>
      </div>
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
          <option value="200">200 kg</option>
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
