import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Layout from '../Layout/Layout'
import ProductCard from '../ProductCard/ProductCard'

const Home = () => {
  return (
    <>

      <Layout
      title="E-commerce"
      >
        <Container>
        <Row>
        <ProductCard/>
        </Row>
        </Container>
      </Layout>

    </>
  )
}

export default Home