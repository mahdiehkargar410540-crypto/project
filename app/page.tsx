"use client";
import { useEffect, useState } from "react";

export default function Page() {


    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [category, setCategory] = useState("All");

    const [selectedId, setSelectedId] = useState<any>(null);
    const [product, setProduct] = useState<any>(null);

    useEffect(function () {
        fetch("https://fakestoreapi.com/products")
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                setProducts(data);
                setLoading(false);
            })
            .catch(function () {
                setError("Error");
                setLoading(false);
            });
    }, []);

    useEffect(function () {
        if (selectedId) {
            fetch(`https://fakestoreapi.com/products/${selectedId}`)
                .then(function (res) {
                    return res.json();
                })
                .then(function (data) {
                    setProduct(data);
                });
        }
    }, [selectedId]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    const filteredProducts =
        category === "All"
            ? products
            : products.filter(function (item) {
                return item.category === category;
            });

    return (
        <div className="p-6">

            <h1 className="mb-7 text-3xl font-bold"> Products </h1>

            <select
                value={category}
                onChange={function (e) {
                    setCategory(e.target.value);
                }}
                className="mb-6 border p-3">
                <option value="All">All</option>
                <option value="electronics">electronics</option>
                <option value="jewelery">jewelery</option>
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
            </select>

            {!product && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                    {filteredProducts.map(function (item) {
                        return (
                            <div
                                key={item.id}
                                onClick={function () {
                                    setSelectedId(item.id);
                                }}
                                className="cursor-pointer border bg-white p-4"
                            >

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-48 w-full object-contain"
                                />

                                <h2 className="mt-3 font-bold">
                                    {item.title}
                                </h2>

                                <p>Price: ${item.price}</p>

                                <p>Category: {item.category}</p>

                                <p>Rating: {item.rating.rate}</p>

                            </div>
                        );
                    })}

                </div>
            )}

            {product && (
                <div className="mt-8 border bg-white p-6">

                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-64 w-full object-contain" />

                    <h2 className="mt-4 text-2xl font-bold">{product.title}</h2>

                    <p>Price: ${product.price}</p>

                    <p>Category: {product.category}</p>

                    <p>Rating: {product.rating.rate}</p>

                    <p className="mt-4"> {product.description}</p>

                    <button
                        onClick={function () {
                            setProduct(null);
                            setSelectedId(null);
                        }}
                        className="mt-5 bg-black px-4 py-2 text-white">
                        Back
                    </button>

                </div>
            )}

        </div>
    );
}