import { useNavigation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MakeupProductsTable from "./MakeupProductsTable";

function StoreFront() {

    const navigate = useNavigate();
    const [makeupProducts, setMakeupProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const checkImageExists = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    };

    const isProductValid = (makeupProduct) => {
        return makeupProduct.brand && makeupProduct.name && makeupProduct.price && makeupProduct.product_type;
    };

    useEffect(() => {
        const fetchMakeupProducts = async () => {
            try {
                const response = await fetch("https://makeup-api.herokuapp.com/api/v1/products.json");
                const data = await response.json();
                const filteredMakeupProducts = await Promise.all(data.map(async (makeupProduct) => {
                    const imgExists = await checkImageExists(makeupProduct.image_link);

                    if (imgExists && isProductValid(makeupProduct)) {
                        return {
                            brand: makeupProduct.brand,
                            name: makeupProduct.name,
                            price: makeupProduct.price,
                            image_link: makeupProduct.image_link,
                            product_type: makeupProduct.product_type,
                            tag_list: makeupProduct.tag_list
                        };
                    }
                    return null;
                }));

                const validMakeupProducts = filteredMakeupProducts.filter(product => product !== null);

                setMakeupProducts(validMakeupProducts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching countries:", error);
                setLoading(false);
            }
        };
        fetchMakeupProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;

    return (
        <div>
            <button onClick={() => navigate('/new')}>Go To Shopping Cart</button>
            <br/>
            <br/>
            <MakeupProductsTable items={makeupProducts} />
        </div>
    );
}
export default StoreFront;