import React, { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BiSearch } from "react-icons/bi";
import SearchFilter from "react-filter-search";
import ProductCard from "../components/ProductCard";
import { Box, Grid, Typography } from "@mui/material";

const Home = () => {
  const [theme] = useThemeHook();
  const [searchInput, setSearchInput] = useState("");
  const [productData, setProductData] = useState([]);

  const [checkBelleza, setCheckBelleza] = useState(false);
  const [checkHogar, setCheckHogar] = useState(false);

  const [listDataBelleza, setlistDataBelleza] = useState([]);
  const [listDataHogar, setlistDataHogar] = useState([]);

  async function getResponse() {
    const res = await fetch("https://backend-fast-buy-production.up.railway.app/api/v1/products").then(
      (res) => res.json()
    );

    console.log("res ", res);//test
    setProductData(await res);
  }

  useEffect(() => {
    getResponse();
  }, []);

  const handleChangeCheckBelleza = (e) => {
    var valorBelleza = e.target.checked;
    console.log(e.target.checked);
    setCheckBelleza(e.target.checked);
    if (valorBelleza == true) {
  
      var listBelleza = productData.filter((x) => x.category === "belleza");
    
      setlistDataBelleza(listBelleza);
    }
  };

  const handleChangeCheckHogar = (e) => {
    console.log(e.target.checked);
    var valorHogar = e.target.checked;
    setCheckHogar(e.target.checked);

    if (valorHogar == true) {
      console.log("list product ", productData);
      var listHogar = productData.filter((x) => x.category === "hogar");
      console.log("filter hogar", listHogar);
      setlistDataHogar(listHogar)
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirecction: "row" }}>
        <Box sx={{ width: "20%" }}>
          <div style={{ marginTop: "100px", marginLeft: "20px" }}>
            <Typography
              component="div"
              variant="h1"
              sx={{ fontSize: "14px", color: "black" }}
            >
              Filters
            </Typography>
            <Typography
              component="div"
              variant="h1"
              sx={{ fontSize: "14px", color: "black" }}
            >
              Category
            </Typography>
            <div style={{ marginLeft: "10px" }}>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                onChange={(e) => handleChangeCheckBelleza(e)}
              />
              <label>belleza</label>
              <br></br>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                onChange={(e) => handleChangeCheckHogar(e)}
              />
              <label>hogar</label>
            </div>
          </div>
        </Box>
        <Box sx={{ width: "80%" }}>
          <div style={{ marginTop: "80px" }}>
            <Typography
              component="div"
              variant="h1"
              sx={{ fontSize: "14px", color: "black" }}
            >
              Search products
            </Typography>
            <InputGroup className="mb-3">
              <InputGroup.Text
                className={
                  theme
                    ? "bg-black text-dark-primary"
                    : "bg-light text-light-primary"
                }
              >
                <BiSearch size="2rem" />
              </InputGroup.Text>
              <FormControl
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={
                  theme ? "bg-light-black text-light" : "bg-light text-black"
                }
              />
            </InputGroup>
          </div>
          {checkBelleza && checkHogar==false ? (
            <SearchFilter
              value={searchInput}
              data={listDataBelleza}
              renderResults={(results) => (
                <Grid
                  container
                  spacing={{ xs: 1, sm: 2, md: 6 }}
                  columns={{ xs: 12, sm: 12, md: 12 }}
                >
                  {results.map((item, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <ProductCard data={item} key={i} />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            />
          ) : (
            <></>
          )}

          {checkHogar && checkBelleza==false ? (
            <SearchFilter
              value={searchInput}
              data={listDataHogar}
              renderResults={(results) => (
                <Grid
                  container
                  spacing={{ xs: 1, sm: 2, md: 6 }}
                  columns={{ xs: 12, sm: 12, md: 12 }}
                >
                  {results.map((item, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <ProductCard data={item} key={i} />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            />
          ) : (
            <></>
          )}

          {(checkBelleza == false && checkHogar == false) || (checkBelleza == true && checkHogar == true ) ? (
            <SearchFilter
              value={searchInput}
              data={productData}
              renderResults={(results) => (
                <Grid
                  container
                  spacing={{ xs: 1, sm: 2, md: 6 }}
                  columns={{ xs: 12, sm: 12, md: 12 }}
                >
                  {results.map((item, i) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <ProductCard data={item} key={i} />
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            />
          ) : (
            <></>
          )}

          {/*<SearchFilter
            value={searchInput}
            data={productData}
            renderResults={(results) => (
              <Grid
                container
                spacing={{ xs: 1, sm: 2, md: 6 }}
                columns={{ xs: 12, sm: 12, md: 12 }}
              >
                {results.map((item, i) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                      <ProductCard data={item} key={i} />
                    </Grid>
                  );
                })}
              </Grid>
            )
          />*/}
        </Box>
      </Box>
    </>
  );
};

{
  /*
     <Container className="py-4">
            <Row className="justify-content-center">
                <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
                    <h1 className={theme? 'text-light my-5': 'text-black my-5'}>Search products</h1>
                    <InputGroup className="mb-3">
                        <InputGroup.Text className={theme? 'bg-black text-dark-primary': 'bg-light text-light-primary'}>
                            <BiSearch size="2rem" />
                        </InputGroup.Text>
                        <FormControl 
                            placeholder="Search"
                            value={searchInput}
                            onChange={(e)=> setSearchInput(e.target.value)}
                            className={theme? 'bg-light-black text-light': 'bg-light text-black'}
                        />
                    </InputGroup>
                </Col>
                <SearchFilter 
                    value={searchInput}
                    data={productData}
                    renderResults={results =>(
                        <Row className="justify-content-center">
                            {results.map((item, i)=>(
                                <ProductCard data={item} key={i} />
                            ))}
                        </Row>
                    )}
                />
                
            </Row>
        </Container>
*/
}
export default Home;
