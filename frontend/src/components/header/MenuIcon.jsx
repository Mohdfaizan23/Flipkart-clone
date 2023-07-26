import { Menu } from "@mui/icons-material";
import {
  List,
  ListItem,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  styled,
} from "@mui/material";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));
const Wrapper = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const BecomeAndMoreText = styled(Typography)`
  margin-right: 40px;
  font-size: 16px;
  align-items: center;
`;

const CartContainer = styled(Box)(({ theme }) => ({
  display: "flex",
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

const MenuIcon = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuButton color="inherit" onClick={handleOpen}>
        <Menu />
      </MenuButton>
      <Drawer open={open} onClose={handleClose}>
        <Box style={{ width: 200 }} onClick={handleClose}>
          <List>
            <ListItem>
              <Wrapper>
                <LoginButton variant="contained">Login</LoginButton>

                <BecomeAndMoreText>Become a Seller</BecomeAndMoreText>
                <BecomeAndMoreText>More</BecomeAndMoreText>

                <CartContainer>
                  <ShoppingCartIcon />
                  <Typography>Cart</Typography>
                </CartContainer>
              </Wrapper>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
export default MenuIcon;
