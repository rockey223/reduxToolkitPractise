// import "./App.css";

// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";
// import { useEffect } from "react";
// import Lenis from "lenis";

// gsap.registerPlugin(useGSAP, ScrollTrigger);
// const App = () => {
//   useEffect(() => {
//     const lenis = new Lenis();

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);
//   }, []);

//   useGSAP(() => {
//     gsap.fromTo(
//       ".content",
//       {
//         clipPath: "circle(0%)",
//       },
//       {
//         clipPath: "circle(70%)",
//         scrollTrigger: {
//           trigger: ".topSection",
//           start: "top -20%",
//           end: "bottom 80%",
//           // markers: true,
//           scrub: 1,
//         },
//       }
//     );

//     gsap.fromTo(
//       ".content",
//       {
//         scale: 2,
//       },
//       {
//         scale: 1,
//         scrollTrigger: {
//           trigger: ".topSection",
//           start: "top -20%",
//           end: "bottom bottom",
//           // markers: true,
//           scrub: 1,
//         },
//       }
//     );

//     let sections = gsap.to(".right", {
//       scrollTrigger: {
//         trigger: ".secondSection",
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 1,
//         pin: "right",
//         // markers: true,
//       },
//     });
//   });

//   return (
//     <>
//       <nav>Navbar Here</nav>
//       <section className="topSection">
//         <div className="main">
//           <div className="content"></div>
//           <div className="textContents">
//             <div className="heading">The New Arrivals</div>
//             <button>Click me</button>
//           </div>
//         </div>
//       </section>

//       <section className="secondSection">
//         <div className="left">
//           <p className="ptext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit at
//             odit natus repellat dicta vel qui officiis totam voluptate minus!
//           </p>
//           <p className="ptext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit at
//             odit natus repellat dicta vel qui officiis totam voluptate minus!
//           </p>
//           <p className="ptext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit at
//             odit natus repellat dicta vel qui officiis totam voluptate minus!
//           </p>
//           <p className="ptext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit at
//             odit natus repellat dicta vel qui officiis totam voluptate minus!
//           </p>
//           <p className="ptext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit at
//             odit natus repellat dicta vel qui officiis totam voluptate minus!
//           </p>
//           <p className="ptext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit at
//             odit natus repellat dicta vel qui officiis totam voluptate minus!
//           </p>
//           <p className="ptext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit at
//             odit natus repellat dicta vel qui officiis totam voluptate minus!
//           </p>
//           <p className="ptext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit at
//             odit natus repellat dicta vel qui officiis totam voluptate minus!
//           </p>
//           <p className="ptext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit at
//             odit natus repellat dicta vel qui officiis totam voluptate minus!
//           </p>
//           <p className="ptext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit at
//             odit natus repellat dicta vel qui officiis totam voluptate minus!
//           </p>
//           <p className="ptext">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit at
//             odit natus repellat dicta vel qui officiis totam voluptate minus!
//           </p>
//         </div>
//         <div className="right">
//           <div className="box"></div>
//         </div>
//       </section>

//       <div className="spacer"></div>
//     </>
//   );
// };

// export default App;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  update_filter,
  update_sorting
} from "./store/slices/ProductSlice";

const App = () => {
  const dispatch = useDispatch();
  const productStatus = useSelector((state) => state.products.status);
  const productError = useSelector((state) => state.products.error);
  const highestPrice = useSelector((state) => state.products.highestPrice);
  const filtered_products = useSelector(
    (state) => state.products.filteredProduct
  );
  const productCategory = useSelector((state) => state.products.category);
  const pricechange = useSelector(
    (state) => state.products.filterProducts.price
  );
  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts(),update_sorting('ascending'));
    }
  }, [productStatus, dispatch]);

  if (productStatus === "loading") {
    return (
      <>
        <h1>loading</h1>
      </>
    );
  } else if (productStatus === "failed") {
    return (
      <>
        <h1>{productError}</h1>
      </>
    );
  }

  return (
    <>
      {productCategory.map((category) => {
        return (
          <button
            key={category}
            name="category"
            onClick={(e) => dispatch(update_filter({name: e.target.name, value: e.target.value}))}
          >
            {category}
          </button>
        );
      })}
      <input
        type="range"
        name="price"
        id="range"
        min="0"
        max={highestPrice}
        value={pricechange}
        onInput={(e) => dispatch(update_filter({name: e.target.name, value: e.target.value}))}
      />
      <p>{pricechange}</p>
      <input
        type="text"
        name="search"
        onChange={(e) => dispatch(update_filter({name: e.target.name, value: e.target.value}))}
      />
      {/*
      <button onClick={clearFilter}>Clear filter</button>
      <p>{filteredProduct.length}</p> */}

      <div>
        <select name="sort" id="sort" onClick={(e)=>dispatch(update_sorting(e.target.value))}>
          <option value="ascending">Alphabetically A -Z</option>
          <option value="descending">Alphabetically Z - A</option>
          <option value="highest">price High to low </option>
          <option value="lowest">price Low to High </option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {filtered_products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default App;
