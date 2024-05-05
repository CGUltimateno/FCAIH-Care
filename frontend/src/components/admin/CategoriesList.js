import CategoryApi from '../../utils/api/CategoryApi';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../../store/actions/productActions';
import productApi from '../../utils/api/productApi';
function Users() {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const handleDelete = async (categoryId) => {
        try {
            // Fetch the products associated with the category
            const products = await productApi.getProductsByCategory(categoryId);

            // Delete each product
            products.forEach(product => {
                dispatch(removeProduct(product.productID));
            });

            // Delete the category
            await CategoryApi.deleteProductCategory(categoryId);

            // Remove the category from the local state
            setData(data.filter(category => category.productCategoryID !== categoryId));
        } catch (error) {
            console.error('Failed to delete category:', error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const categories = await CategoryApi.getCategorys();
            setData(categories);
        };
        fetchData();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>CategoryID</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {data.map((category, index) => (
                    <tr key={index}>
                        <td>{category.productCategoryID}</td>
                        <td>{category.category}</td>
                        <td>
                            <button onClick={() => handleDelete(category.productCategoryID)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Users;
