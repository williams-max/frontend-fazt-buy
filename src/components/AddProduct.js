import React, { useState, useEffect } from "react";
//import { Button, Card } from "react-bootstrap";
import {
  //  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";

import { useCart } from "react-use-cart";
import { BsCartPlus } from "react-icons/bs";
//import { Link } from "@reach/router";

import { Link,useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate=useNavigate()
  // let { image, price, title, id } = props.data;

  const { addItem } = useCart();

  const addToCart = () => {
    //addItem(props.data);
  };

  const [file, setFile] = useState(null);
  const [checkBelleza, setCheckBelleza] = useState(false);
  const [checkHogar, setCheckHogar] = useState(false);

  const urlDev = "http://localhost:4000";
  const selectedHandler = (e) => {
    console.log("dddd ", e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const sendHandler = async () => {
    if (!file) {
      alert("you must upload file");
      return;
    }

    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("name", "tony");

    // https://backend-fast-buy-production.up.railway.app/
    try {
      const res = await axios.post(
        `${urlDev}/api/v1/products/v2/addimg`,
        formdata,
        
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {}
    /*
    fetch(
    `${urlDev}/api/v1/products/v2/addimg`,
      {
        method: "POST",
        body: formdata,
      }
    )
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
      });*/

    document.getElementById("fileinput").value = null;

    setFile(null);
  };

  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(null);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if(!checkBelleza && !checkHogar){
      alert("seleccione una categoria")
      return;
    }

    var category=""
    if(checkBelleza && !checkHogar){
      category="belleza"
    }
    if(!checkBelleza && checkHogar){
      category="hogar"
    }
    
    const title = form.title.value;
    const price = form.price.value;

    if (title && price) {
     // setLoading(true);
      console.log("call api here");
      console.log(title, price);


      if (!file) {
        alert("you must upload file");
        return;
      }
  
      const formdata = new FormData();
      formdata.append("image", file);
      formdata.append("price",price);
      formdata.append("title",title);
      formdata.append("category",category);
      
      try {
        const res = await axios.post(
          `${urlDev}/api/v1/products/v2/addimg`,
          formdata,
          
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        navigate(-1)
      } catch (error) {
        console.log(error.response); // this is the main part. Use the response property from the error object

        return error.response;
      }
    
  
      document.getElementById("fileinput").value = null;
  
      setFile(null);

    }
  };

  const handleCheckBelleza = (e) => {
    console.log(e.target.checked);
    setCheckBelleza(e.target.checked);
    if (e.target.value) {
      setCheckHogar(false);
    }
  };
  const handleCheckHogar = (e) => {
    console.log(e.target.checked);
    setCheckHogar(e.target.checked);
    if (e.target.value) {
      setCheckBelleza(false);
    }
  };

  return (
    <>
      <br />
      <br />
      <br />

     {/* <div className="col-2">
        <Button
          onClick={sendHandler}
          type="Button"
          className="btn btn-primary col-12"
        >
          Upload
        </Button>
      </div>*/}

      <Row className="justify-content-center">
        <Col xs={11} sm={10} md={8} lg={4}>
          <h4>Add Prduct</h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Title"
                  required
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                type="text"
                placeholder="Price"
                required
              />
            </Form.Group>
            <div style={{ width: "100%" }}>
              <input
                id="fileinput"
                onChange={selectedHandler}
                className="form-control"
                type="file"
              />
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>

              <div>
                <input
                  type="checkbox"
                  checked={checkBelleza}
                  onChange={(e) => handleCheckBelleza(e)}
                />
                <Form.Label>belleza</Form.Label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={checkHogar}
                  onChange={(e) => handleCheckHogar(e)}
                />
                <Form.Label>hogar</Form.Label>
              </div>
            </Form.Group>
            <Button
              style={{ border: 0, backgroundColor: "red", width: "150px" }}
              onClick={()=> navigate(-1)}
            >
              Back
            </Button>
            &nbsp;
            <Button type="submit" disabled={loading} style={{ border: 0 }}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  &nbsp;Loading...
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddProduct;

{
  /*
   <Card
      style={{ width: "18rem", height: "auto" }}
      className={`${
        theme ? "bg-light-black text-light" : "bg-lihgt text-black"
      } text-center p-0 overflow-hidden shadow mx-auto mb-4`}
    >
      <Link to={`/product-details/${id}`}>
        <div
          style={{
            background: "white",
            height: "15rem",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "inherit",
          }}
        >
          <div style={{ width: "9rem" }}>
            <Card.Img variant="top" src={image} className="img-fluid" />
          </div>
        </div>
      </Link>
      <Card.Body>
        <Card.Title
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Card.Title>
        <Card.Title>
          Rs. <span className="h3">{price}</span>
        </Card.Title>
        <Button
          background={"#dd0285"}
          onClick={() => addToCart()}
          className={`${
            theme ? "bg-dark-primary text-black" : "bg-light-primary"
          } d-flex align-item-center m-auto border-0`}
        >
          <BsCartPlus size="1.8rem" />
          Add to cart fff
        </Button>
      </Card.Body>
    </Card>

*/
}
