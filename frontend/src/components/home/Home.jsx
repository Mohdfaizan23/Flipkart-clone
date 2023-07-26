import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";
import AdsSlide from './AdsSlide';
import MidBannerSection from "./MidBannerSection";

import { styled, Box } from '@mui/material';
import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Component = styled(Box)`
padding: 10px;
background: #F2F2F2;
`;

const Home = () => {

  const { products } = useSelector(state => state.getProducts);
  console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts())
  },[dispatch])

  return (
    <>
      <NavBar />

      <Component>
        <Banner />
        <AdsSlide products={products}  title="Deal of the day" timer={true}/>
        <MidBannerSection />
        <Slide products={products} title="Discount for you" timer={false}/>
        <Slide products={products} title="Suggesting Items" timer={false}/>
        <Slide products={products} title="Top Selection" timer={false}/>
        <Slide products={products} title="Recommended Items" timer={false}/>
        <Slide products={products} title="Trending Offers" timer={false}/>
        <Slide products={products} title="Season's top picks" timer={false}/>
        <Slide products={products} title="Top Deals on Accessories" timer={false}/>
      </Component>
    </>
  );
};
export default Home;
