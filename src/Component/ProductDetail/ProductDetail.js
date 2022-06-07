import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { productDetail } from '../../api/auth';
import Layout from '../Layout/Layout';
import './ProductDetail.css'

const ProductDetail = () => {
    const { id } = useParams()
    const [details, setDetails] = useState([]);
    useEffect(() => {
        productDetail(id).then((data) => {
            console.log(data);
            setDetails(data);
        })

    }, []);

  
    return (
        <>
            <Layout
                title="E-commerce"
            >
                <section className='productSection'>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <div className='productImg'>
                                    <img src={details.image} />
                                </div>
                            </Col>
                            <Col md={6} className='productDetails'>
                                <div>
                                <h2><span>Categhory:</span> {details.category}</h2>
                                    <h1><span>Product name:</span> {details.name}</h1>
                                    <h2><span>Price:</span> {details.price}</h2>
                                    <h3><span>Description:</span> {details.description}</h3>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>

        </>
    )
}

export default ProductDetail