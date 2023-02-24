import React, { useState, useEffect } from "react";
import { Button, Container, Col, Row, Table } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BsCartCheck, BsCartX } from "react-icons/bs";

import Box from "@mui/material/Box";
//import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const urlDev = "http://localhost:4000/"; //imagenes
  const [theme] = useThemeHook();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  return (
    <Container className="">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h4
        className={`${theme ? "text-light" : "text-light-primary"} text-center`}
      >
        {isEmpty ? "Your Cart is Empty" : "The Cart"}
      </h4>
      <Row className="justify-content-center">
        <Table
          responsive="sm"
          striped
          bordered
          hover
          variant={theme ? "dark" : "light"}
          className="mb-5"
        >
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={{ width: "5%" }}>
                    <div
                      style={{
                        background: "white",
                        height: "8rem",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ padding: ".5rem" }}>
                        <img
                          src={`${urlDev}${item.image}`}
                          style={{ width: "4rem" }}
                          alt={item.title}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <h6
                      style={{
                        whiteSpace: "nowrap",
                        width: "14rem",
                        overflow: "hidden",
                        textOverFlow: "ellipsis",
                      }}
                    >
                      {item.title}
                    </h6>
                  </td>
                  <td>Rs. {item.price}</td>
                  <td>Quantity ({item.quantity})</td>
                  <td>
                    <Button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity - 1)
                      }
                      className="ms-2"
                    >
                      -
                    </Button>
                    <Button
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                      className="ms-2"
                    >
                      +
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeItem(item.id)}
                      className="ms-2"
                    >
                      Remove Item
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {!isEmpty && (
          <Row
            style={{ position: "fixed", bottom: 0 }}
            className={`${
              theme ? "bg-light-black text-light" : "bg-light text-balck"
            } justify-content-center w-100`}
          >
            <Col className="py-2">
              <h4>Total Price: Rs. {cartTotal}</h4>
            </Col>
            <Col className="p-0" md={4}>
              <Button
                variant="danger"
                className="m-2"
                onClick={() => emptyCart()}
              >
                <BsCartX size="1.7rem" />
                Clear Cart
              </Button>
              <Button
                variant="success"
                onClick={handleOpen}
                style={{ width: "150px" }}
                className="m-2"
              >
                <BsCartCheck size="1.7rem" />
                buy
              </Button>
            </Col>
          </Row>
        )}
      </Row>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              successfully
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Thanks for your purchase the product arrives in approximately 2 days
            </Typography>
          </Box>
        </Modal>
      </div>
    </Container>
  );
};

export default Cart;
