import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { addItem, productDetail, productInfo } from '../../api/auth';
import './ProductCard.css'

const ProductCard = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        productInfo().then((data) => {
            setProducts(data);
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
            return a == b ? 0 : a > b ? 1 : -1;
        });
        setProducts([...nameSort]);
    }



    // prodcut search
    const [searchTerm, setSearchTerm] = useState('');

    // product details

    const singleProduct = (id) => {
        // console.log(id);
        return navigate(`products/${id}`)
    }

    const [categoryOption, setCategoryOption] = useState([]);
    let chars = new Set([]);
    useEffect(() => {

        for (let i = 0; i < products.length; i++) {
            chars.add(products[i].category)
        }
        //console.log('data set', chars);
        const array = Array.from(chars);
        setCategoryOption([...array])

    }, [products]);

    useEffect(() => {

        console.log(categoryOption);

    }, [categoryOption]);

const [categoryFilter,setCategoryFilter]=useState()

// console.log(categoryFilter);

    const filterdata=(value)=>{
        console.log(value);
        setCategoryFilter(value);
        let datavalue=products.filter(data => data.category === value);
        setProducts(datavalue);
    }

// console.log(categoryFilter);

// add to cart
const addToCart = (data) => {
       console.log(data);

    addItem(data, () => {
        return navigate('/')
    });
  };

    return (
        <>
            <section className="header-main border-bottom bg-white">
                <div className="container-fluid">

                    <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
                        <div className="col-md-3">
                        {categoryOption && categoryOption.length ? categoryOption.map(data=>
                            <button className='btn btn-info' onClick={()=>filterdata(data)}>{data}</button>
                            ):''}
                          {/*
                          <select className="form-select" defaultValue={'DEFAULT'} onChange={(e) =>filterdata(e)}>
                                <option value="DEFAULT">Choose by category</option>
                                {categoryOption && categoryOption.length ? categoryOption.map(data=>
                                    <option value={data}>{data}</option>
                                    ):''}
                            </select>
                        */}
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex form-inputs">
                                <input className="form-control" type="text" placeholder="Search any product..." onChange={e => setSearchTerm(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="d-flex d-none d-md-flex flex-row align-items-center">
                                <button className='btn btn-info ml-3' onClick={() => sortByPrice()}>Sort by price</button>
                                <button className='btn btn-danger mr-2' onClick={() => sortByName()}>Sort by name</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <Row className="searchProduct">

                {products.filter((data) => {
                    if (searchTerm == "") {
                        return data
                    }
                    else if (data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return data;
                    }
                }).map((data, key) => {
                    return <>
                        <Col md={4} key={data.id}>
                            <div className="card mt-3">
                                <a href="#">
                                    <img src={data.image} className="card-img-top" alt="product.title" />
                                </a>
                                <div className="label-top shadow-sm">
                                    <p className="">{data.category}</p>
                                </div>
                                <div className="card-body">
                                    <div className="clearfix mb-3">
                                        <span className="float-start badge rounded-pill bg-success">{data.price}</span>
                                    </div>
                                    <button onClick={() => singleProduct(data.id)} className='btn'>{data.name}</button>
                                    <p className="description">{data.description}</p>
                                    <div className="d-grid gap-2 my-4">
                                        <button  onClick={()=>addToCart(data)} className="btn btn-warning bold-btn">add to cart</button>
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