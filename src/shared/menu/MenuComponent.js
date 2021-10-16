import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userAction } from "../../redux/moduels/user";

const MenuComponent = ({ history }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isLogin = useSelector(state => state.user.isLogin);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MenuIcon fontSize='large' />
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isLogin ? (
          <>
            <MenuItem onClick={() => history.push("/cart")}>장바구니</MenuItem>
            <MenuItem onClick={() => history.push("/order")}>구매내역</MenuItem>
            <MenuItem onClick={() => history.push("/main")}>메인화면</MenuItem>
            <MenuItem onClick={() => dispatch(userAction.signOut())}>
              로그아웃
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => history.push("/join")}>회원가입</MenuItem>
            <MenuItem onClick={() => history.push("/login")}>로그인</MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
};

export default MenuComponent;
