import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { productInfo } from '../../api/product';
import { addItem } from '../../api/cart';
import './ProductCard.css'

const ProductCard = () => {

    const navigate = useNavigate();
      // prodcut search
      const [searchTerm, setSearchTerm] = useState('');
    // show all product
    const [products, setProducts] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [categoryOption, setCategoryOption] = useState([]);

    let chars = new Set([]);

    useEffect(() => {
        productInfo().then((data) => {
            setProducts(data);
            setAllProduct(data)
            for (let i = 0; i < data.length; i++) {
                chars.add(data[i].category)
            }
            const array = Array.from(chars);
            setCategoryOption([...array])

        })
    }, []);


    // sort by price
    const sortByPrice = () => {
        let sortedData = products.slice().sort((a, b) => a.price - b.price);
        setProducts(sortedData)
    }

    // sort by name
    const sortByName = () => {
        let nameSort = products;
        nameSort.sort(function (x, y) {
            let a = x.name.toUpperCase(),
                b = y.name.toUpperCase();
            return a === b ? 0 : a > b ? 1 : -1;
        });
        setProducts([...nameSort]);
    }



  

    // product details
    const singleProduct = (id) => {
        return navigate(`products/${id}`)
    }
// Category filter
   
    // useEffect(() => {
    //     for (let i = 0; i < products.length; i++) {
    //         chars.add(products[i].category)
    //     }
    //     const array = Array.from(chars);
    //     setCategoryOption([...array])

    // }, [products]);

    // const [categoryFilter, setCategoryFilter] = useState()
    const filterdata = (event) => {
        console.log(event.target.value);
        let datavalue = allProduct.filter(data => data.category === event.target.value);
        setProducts(datavalue);
    }


    // add to cart
    const addToCart = (data) => {
        addItem(data, () => {
            return navigate('/cart')
        });
    };

    return (
        <>
            <section className="header-main border-bottom bg-white">
                <Container>

                    <Row className="p-2 pt-3 pb-3 d-flex align-items-center">
                        <Col md={3}>
                            <select className="form-select" defaultValue={'DEFAULT'} onChange={filterdata}>
                                <option value="DEFAULT">Choose by category</option>
                                {categoryOption && categoryOption.length ? categoryOption.map(data =>
                                    <option>{data}</option>
                                ) : ''}
                            </select>
                        </Col>
                        <Col md={6}>
                            <div className="d-flex form-inputs">
                                <input className="form-control" type="text" placeholder="Search any product..." onChange={e => setSearchTerm(e.target.value)} />
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="d-flex sortBtn">
                                <button className='btn btn-info' onClick={() => sortByPrice()}>Sort by price</button>
                                <button className='btn btn-danger' onClick={() => sortByName()}>Sort by name</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>



            <Row className="searchProduct">

                {products.filter((data) => {
                    if (searchTerm === "") {
                        return data
                    }
                    else if (data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return data;
                    }
                }).map((data) => {
                    return <>
                        <Col md={4} key={data.id}>
                            <div className="card mt-3">
                                <img src={data.image} className="card-img-top" alt="product.title" />
                                <div className="label-top shadow-sm">
                                    <p className="">{data.category}</p>
                                </div>
                                <div className="card-body productBody">
                                    <div className="clearfix mb-3">
                                        <span className="float-start badge rounded-pill bg-success">{data.price}</span>
                                    </div>
                                    <button onClick={() => singleProduct(data.id)} className='btn name'>Name: {data.name}</button>
                                    <p className="about">{data.description}</p>
                                    <div className="d-grid gap-2 my-4">
                                        <button onClick={() => addToCart(data)} className="btn btn-warning bold-btn">add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </>
                })}
            </Row>


        </>
    )
}

export default ProductCard