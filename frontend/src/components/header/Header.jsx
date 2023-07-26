import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  InputBase,
  Button,
  List,
  ListItem,
  Badge,
  styled,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";

//components
import LoginDialog from "../login/LoginDialog";
import Profile from "./Profile";
import MenuIcon from "./MenuIcon";

const StyledHeader = styled(AppBar)`
  background: #2874f0;
  height: 55px;
`;
const Component = styled(Link)`
  margin-left: 12%;
  line-height: 0;
  text-decoration: none;
  color: inherit;
`;
const SubHeading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
`;
const PlusImage = styled("img")({
  width: 10,
  height: 10,
  marginLeft: 4,
});
const SearchContainer = styled(Box)`
  background: #fff;
  width: 38%;
  border-radius: 2px;
  margin-left: 10px;
  display: flex;
`;
const InputSearchBase = styled(InputBase)`
  padding-left: 20px;
  width: 100%;
  font-size: unset;
`;
const SearchIconWrapper = styled(Box)`
  color: blue;
  padding: 5px;
  display: flex;
`;
const Wrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "0 6% 0 2.5%",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const BecomeAndMoreText = styled(Typography)`
  margin-right: 40px;
  font-size: 16px;
  align-items: center;
`;

const CartContainer = styled(Link)(({ theme }) => ({
  display: "flex",
  textDecoration: "none",
  color: "inherit",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const LoginButton = styled(Button)`
  color: #2874f0;
  background: #fff;
  text-transform: none;
  padding: 5px 40px;
  border-radius: 2px;
  box-shadow: none;
  font-weight: 600;
  height: 32px;
`;
const ListWrapper = styled(List)`
  position: absolute;
  background: #ffffff;
  color: #000;
  margin-top: 36px;
`;

const Header = () => {
  const logoURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const subURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png";

  const [open, setOpen] = useState(false);

  const { account, setAccount } = useContext(DataContext);
  const { cartItems } = useSelector(state => state.cart);

  const openDialog = () => {
    setOpen(true);
  };

  const [text, setText] = useState("");
  const { products } = useSelector((state) => state.getProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const getText = (text) => {
    setText(text);
  };

  return (
    <StyledHeader>
      <Toolbar style={{ minHeight: 55 }}>
        <MenuIcon />
        <Component to="/">
          <img src={logoURL} alt="logo" style={{ width: 75 }} />
          <Box style={{ display: "flex" }}>
            <SubHeading>
              Explore&nbsp;
              <Box component="span" style={{ color: `#FFE500` }}>
                Plus
              </Box>
            </SubHeading>
            <PlusImage src={subURL} alt="sub-logo" />
          </Box>
        </Component>
        <SearchContainer>
          <InputSearchBase
            placeholder="Search for products, brands and more"
            onChange={(e) => getText(e.target.value)}
            value={text}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          {text && (
            <ListWrapper>
              {products
                .filter((product) =>
                  product.title.longTitle
                    .toLowerCase()
                    .includes(text.toLowerCase())
                )
                .map((product) => (
                  <ListItem>
                    <Link to={`/product/${product.id}`}
                    onClick={() => setText('')}
                    style={{ textDecoration: 'none', color: 'inherit' }}>{product.title.longTitle}</Link>
                  </ListItem>
                ))}
            </ListWrapper>
          )}
        </SearchContainer>
        <Wrapper>
          {account ? (
            <Profile account={account} setAccount={setAccount} />
          ) : (
            <LoginButton
              variant="contained"
              onClick={() => openDialog()}
              style={{ marginLeft: 15 }}
            >
              Login
            </LoginButton>
          )}

          <BecomeAndMoreText
            style={{ marginLeft: 40, marginTop: 3, width: 135 }}
          >
            Become a Seller
          </BecomeAndMoreText>
          <BecomeAndMoreText style={{ marginTop: 3 }}>More</BecomeAndMoreText>

          <CartContainer to="/cart">
            <Badge badgeContent={cartItems?.length} color="secondary">
                <ShoppingCartIcon />
            </Badge>
            <Typography style={{ marginLeft: 10 }}>Cart</Typography>
          </CartContainer>
          <LoginDialog open={open} setOpen={setOpen} />
        </Wrapper>
      </Toolbar>
    </StyledHeader>
  );
};
export default Header;
