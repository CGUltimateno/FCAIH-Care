import React, { useEffect, useState } from 'react';
import { useProduct } from '../../utils/hooks/useProduct';
import { useCategory } from '../../utils/hooks/useCategory';
import { useStock } from '../../utils/hooks/useUtil';
import CategoryApi from '../../utils/api/CategoryApi';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


function Products() {
    const { products, fetchProducts, createProduct, updateExistingProduct, removeProduct } = useProduct();
    const { categorys, fetchCategorys, addCategory, updateCategory, deleteCategory } = useCategory(); }
    const [localProduct, setLocalProduct] = useState({});
    const [categorys, setCategorys] = useState([]);
  const getStock = useStock();
  const product = products.find((product) => product?.productID === localProduct?.productID);

    useEffect(() => {
        fetchProducts();
        const fetchData = async () => {
            const categorys = await CategoryApi.getProductCategorys();
            setCategorys(categorys);
        };
        fetchData();
    }, [products])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            const selectedCategory = categorys.find(cat => cat.id === value);
            setLocalProduct(prevState => ({ ...prevState, ProductCategoryID: selectedCategory.id }));
        } else {
            setLocalProduct(prevState => ({ ...prevState, [name]: value }));
        }
    };

  return (
    <div className="admin-product">
        <table className='product-table'>
            <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                <tr key={index}  onClick={() => setLocalProduct(product)}>         
                    <td>{product.productID}</td>
                    <td>{product.brand} {product.name}</td>
                    <td>{getStock(product.inStock)}</td>
                  </tr>
                ))}
            </tbody>
        </table>
        <div className='product-panel'>
              <h2>{localProduct?.brand} {localProduct?.name}</h2>
              {product && (
                <div className='product-panel-img'>
                  <img src={localProduct?.imageURL} alt="" />
                </div>
              )
              }
              <div className="product-panel-info">
                { product && ( <label className='label-small'>
                  ID
                  <input value={localProduct?.productID} readOnly/>
                </label>)}
                <label>
                  Name
                  <input id="productName" name="name" maxLength="100" value={localProduct?.name || ''} onChange={handleInputChange}/>
                </label>
              </div>
              <label htmlFor="">
                  Description
                  <textarea id="productDescription" name="description" maxLength="500" rows="4" value={localProduct?.description || ''} onChange={handleInputChange}></textarea>
              </label>
            <label>
                Image URL
                <input id="productImageURL" name="imageURL" maxLength="100" value={localProduct?.imageURL || ''} onChange={handleInputChange}/>
              </label>
              <label>
                  Category
                  <select name="category" value={localProduct?.category || ''} onChange={handleInputChange}>
                      {categorys.map((cat, index) => (
                          <option key={index} value={cat.id}>{cat.category}</option>
                      ))}
                  </select>
              </label>
            <div className='divider'>
                <button className='second-button' onClick={() => setLocalProduct(null) }>CLEAR</button>
                { product && (<button className='second-button' onClick={() => removeProduct(product?.productID)}>DELETE</button>)}
                  {product?.productID && (<button onClick={() => updateExistingProduct({ productId: product?.productID, product: localProduct })}>SAVE CHANGES</button>)}
                  {!product?.productID && (<button onClick={() => createProduct(localProduct)}>Add Product</button>)}            </div>
        </div> 
    </div>
  );
}

export default Products;
