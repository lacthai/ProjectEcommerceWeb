import React, { useRef } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import "./products.css"

 
const Products = React.memo(({products}) => {
    const ref = useRef(0)
 
    return (
         <div className="container">
                <h2>render:{ref.current ++}</h2>
        <div className="wrapper">
            {
                products.map(product=>
                  (<ProductItem key={product._id} product={product}  />)  
                )
            }
        </div>
     
        </div>
    );
})
 

export default Products;