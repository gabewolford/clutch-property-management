"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import properties from "./data/dummyData";

export default function FilterSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    available: "",
    minPrice: "",
    maxPrice: "",
    minSqFootage: "",
    maxSqFootage: "",
    bedrooms: "",
    bathrooms: "",
    type: "",
  });

  useEffect(() => {
    const query = Object.fromEntries(searchParams.entries());

    const filtered = properties.filter((property) => {
      const available = query.available
        ? property.available.toString() === query.available
        : true;
      const minPrice = query.minPrice
        ? parseFloat(query.minPrice) <= property.price
        : true;
      const maxPrice = query.maxPrice
        ? parseFloat(query.maxPrice) >= property.price
        : true;
      const minSqFootage = query.minSqFootage
        ? parseFloat(query.minSqFootage) <= property.sqFootage
        : true;
      const maxSqFootage = query.maxSqFootage
        ? parseFloat(query.maxSqFootage) >= property.sqFootage
        : true;
      const bedrooms = query.bedrooms
        ? parseInt(query.bedrooms, 10) <= property.bedrooms
        : true;
      const bathrooms = query.bathrooms
        ? parseInt(query.bathrooms, 10) <= property.bathrooms
        : true;
      const type = query.type ? property.type === query.type : true;

      return (
        available &&
        minPrice &&
        maxPrice &&
        minSqFootage &&
        maxSqFootage &&
        bedrooms &&
        bathrooms &&
        type
      );
    });

    setFilteredProperties(filtered);
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        query.set(key, filters[key]);
      }
    });

    router.push(`/properties?${query.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setFilters({
      available: "",
      minPrice: "",
      maxPrice: "",
      minSqFootage: "",
      maxSqFootage: "",
      bedrooms: "",
      bathrooms: "",
    });
    router.push(`/properties`, { scroll: false });
  };

  return (
    <section className="bg-primaryLight text-primaryDark">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-5 px-5 py-10 border-b-secondaryBlue text-sm"
      >
        <label className="flex items-center border border-black px-4 py-2 rounded-full w-fit h-fit gap-1">
          Available:
          <select
            name="available"
            value={filters.available}
            onChange={handleChange}
            className="bg-transparent w-fit p-1"
          >
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
        <label className="flex items-center border border-black px-4 py-2 rounded-full w-fit h-fit gap-1">
          Type:
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="bg-transparent w-fit p-1"
          >
            <option value="">Any</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed-use">Mixed-Use</option>
          </select>
        </label>
        <label className="flex items-center border border-black px-4 py-2 rounded-full w-fit h-fit gap-1">
          Min Price:
          <input
            type="number"
            step={100}
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min Price"
            className="bg-transparent w-[100px] p-1"
          />
        </label>
        <label className="flex items-center border border-black px-4 py-2 rounded-full w-fit h-fit gap-1">
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max Price"
            className="bg-transparent w-[100px] p-1"
          />
        </label>
        <label className="flex items-center border border-black px-4 py-2 rounded-full w-fit h-fit gap-1">
          Min ft²:
          <input
            type="number"
            name="minSqFootage"
            value={filters.minSqFootage}
            onChange={handleChange}
            placeholder="Min ft²"
            className="bg-transparent w-[100px] p-1"
          />
        </label>
        <label className="flex items-center border border-black px-4 py-2 rounded-full w-fit h-fit gap-1">
          Max ft²:
          <input
            type="number"
            step={100}
            name="maxSqFootage"
            value={filters.maxSqFootage}
            onChange={handleChange}
            placeholder="Max ft²"
            className="bg-transparent w-[100px] p-1"
          />
        </label>
        <label className="flex items-center border border-black px-4 py-2 rounded-full w-fit h-fit gap-1">
          Bedrooms:
          <input
            type="number"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            placeholder="Bedrooms"
            className="bg-transparent flex w-[100px] p-1"
          />
        </label>
        <label className="flex items-center border border-black px-4 py-2 rounded-full w-fit h-fit gap-1">
          Bathrooms:
          <input
            type="number"
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleChange}
            placeholder="Bathrooms"
            className="bg-transparent w-[100px] p-1"
          />
        </label>
        <div className="grid grid-cols-2 gap-5">
          <button
            type="submit"
            className="flex items-center bg-primaryBlue text-primaryLight hover:brightness-110 transition duration-200 px-6 py-2 rounded-full font-medium text-base"
          >
            Apply Filters
          </button>
          <button
            type="button"
            className="flex items-center bg-secondaryBlue text-primaryLight hover:brightness-110 transition duration-200 px-6 py-2 rounded-full font-medium text-base"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </form>

      <div className="grid lg:grid-cols-4 gap-5 border-b-secondaryBlue px-5 pb-10">
        {filteredProperties.map((property) => (
          <div key={property.id} className="property border p-5">
            <h3>{property.name}</h3>
            <p>Price: ${property.price.toLocaleString()}</p>
            <p>Sq Footage: {property.sqFootage.toLocaleString()} ft²</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Available: {property.available ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
