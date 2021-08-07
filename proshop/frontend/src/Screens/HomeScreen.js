import React, { useEffect, useState } from 'react'
//import products from "../products"
import { Row, Col } from "react-bootstrap"
import axios from "axios"
import Product from "../Components/Product"
const HomeScreen = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get("/api/products")
            setProducts(data)
        }
        fetchProduct()
    }, [])

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xlg={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
