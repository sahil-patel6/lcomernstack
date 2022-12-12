import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ product }) => {
    const imageUrl = product
        ? `${API}/product/photo/${product._id}`
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/1GZX_Haemoglobin.png/220px-1GZX_Haemoglobin.png";
    return (
        <div className="rounded border border-success p-2">
            <img
                src={imageUrl}
                alt="photo"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
                className="mb-3 rounded"
            />
        </div>
    );
};

export default ImageHelper;
