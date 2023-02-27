import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CardMedia ,Button} from "@mui/material";
import React, { useEffect, useState } from "react";
import { urlProduct,baseUrl } from "../Strings/apis";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));




export default function CustomizedTables() {
  const [productData, setProductData] = useState([]);
const  navigate=useNavigate();
  async function getResponse() {
    const res = await fetch(
      urlProduct
    ).then((res) => res.json());

    console.log("res ", res); //test
    setProductData(await res);
  }

  useEffect(() => {
    getResponse();
  }, []);


  const deleteProduct = async (idProduct )=>{
    console.log("id product ",idProduct)
    try {
        const res= await axios.delete(`${urlProduct}/${idProduct}`)
        console.log(res.data)

        getResponse()
    } catch (error) {
        
    }
  }
  return (
    <div>
      <br />
      <br />
      <br />
      <div style={{display:'flex',justifyContent:'flex-end'}}>
        <Button style={{marginRight:'150px'}} onClick={()=>navigate("/addProduct")}>Add Product </Button>
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell align="right">Title</StyledTableCell>
                <StyledTableCell align="right">Imagen</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Actiones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {index+1}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.title}</StyledTableCell>
                  <StyledTableCell align="right">
                    <div style={{ width: "20px" }}>
                      <CardMedia
                        component="img"
                        /*height="140"*/

                        image={`${baseUrl}/${row.image}`  }
                        alt="image"
                      />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.category}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.price}</StyledTableCell>
                  <StyledTableCell>
                    <Button variant="outlined" onClick={()=>deleteProduct(row.id)} color="error">
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
