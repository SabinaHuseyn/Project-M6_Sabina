import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from 'lodash';
import InputSearchHome from "./InputSearchHome.jsx";
import FilterList from "./FilterList.jsx";
import SearchPrice from "./SearchPrice.jsx";
import AdminNav from "./AdminNav.jsx";

import styled from "styled-components";

const AdvancedFilter = () => {
  const [country, setCountry] = useState(undefined);
  const [metal, setMetal] = useState(undefined);
  const [quality, setQuality] = useState(undefined);
  const [price, setPrice] = useState({ fromPrice: undefined, toPrice: undefined });
  const [year, setYear] = useState({ fromYear: undefined, toYear: undefined });
  const [arr, setArr] = useState({ countryArr: [], metalArr: [], qualityArr: [] })
  useEffect(() => {
    const search = _.memoize(async () => {
      const result = await axios.get("http://localhost:3000/filter");
      setArr({
        countryArr: result.data[0].map(elem => { return elem.country }),
        metalArr: result.data[1].map(elem => { return elem.composition }),
        qualityArr: result.data[2].map(elem => { return elem.quality })
      })
    });
    search();
  }, []);
  const fromPriceHandler = (e) => {
    let priceFrom = Number(e.target.value);
    let priceTo = Number(price.toPrice);
    if (priceFrom > priceTo) {
      priceTo = priceFrom;
    }
    setPrice({ fromPrice: priceFrom, toPrice: priceTo });
  }
  const toPriceHandler = (e) => {
    let priceFrom = Number(price.fromPrice);
    let priceTo = Number(e.target.value);
    if (priceTo == "") {
      priceFrom == 1;
    } else if (priceTo < priceFrom) {
      priceFrom == priceTo;
    }
    setPrice({ fromPrice: priceFrom, toPrice: priceTo })
  }
  const fromYearHandler = (e) => {
    let yearTo = Number(year.toYear);
    let yearFrom = Number(e.target.value);
    if (yearFrom > yearTo) {
      yearTo = yearFrom;
    }
    setYear({ fromYear: yearFrom, toYear: yearTo })
  }
  const toYearHandler = (e) => {
    let yearFrom = Number(year.fromYear);
    let yearTo = Number(e.target.value);
    if (yearTo == "") {
      yearFrom == 1;
    }
    else if (yearTo < yearFrom) {
      yearFrom == yearTo;
    }
    setYear({ fromYear: yearFrom, toYear: yearTo })
  }
  console.log(country, quality)
  let countryList = arr.countryArr.map(elem => <option key={elem} value={elem} value={elem}>{elem}</option>);
  let metalList = arr.metalArr.map(elem => <option key={elem} value={elem} value={elem}>{elem}</option>);
  let qualityList = arr.qualityArr.map(elem => <option key={elem} value={elem} value={elem}>{elem}</option>);
  return (
    <div>
      <AdminNav title="Homepage" />
      <InputSearchHome country={country} quality={quality} metal={metal} fromPrice={price.fromPrice} toPrice={price.toPrice} fromYear={year.fromYear} toYear={year.toYear} />
      <div style={{ display: "flex" }}>
        <Div>
          <FilterList onChange={(e) => setCountry(e.target.value)} id="country" value={country} list={countryList} title="Issuing Country" />
          <FilterList onChange={(e) => setMetal(e.target.value)} id="metal" value={metal} list={metalList} title="Metal" />
          <FilterList onChange={(e) => setQuality(e.target.value)} id="quality" value={quality} list={qualityList} title="Quality of the Coin" />
        </Div>
        <Div>
          <SearchPrice fromFunc={fromPriceHandler} toFunc={toPriceHandler} title="Price" from={price.fromPrice} to={price.toPrice} />
          <SearchPrice fromFunc={fromYearHandler} toFunc={toYearHandler} title="Year of issue" from={year.fromYear} to={year.toYear} />
        </Div>
      </div>
    </div>
  );
};
const Div = styled.div`
  margin-left: 52px;
  margin-top: 27px;
`;

export default AdvancedFilter;
