import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AddToCart = async (product, setMsg, setIsAdded, navigate) => {
    try {
        console.log("Product to Add:", product);
        const url = `${backendUrl}/cart/add`;
        console.log("API URL:", url);

        const res = await axios.post(url, {
            _id: product._id,
            price: product.price,
            quantity: product.quantity,
        }, { withCredentials: true });

        console.log("Response:", res);

        if (res.status === 200) {
            setMsg("Product added to cart");
            setIsAdded(true);
            setTimeout(() => {
                setMsg("Add To Cart");
                setIsAdded(false);
            }, 2000);
        }

        if (res.status === 404) {
            navigate("/login");
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};
