import React, { useState, useEffect } from "react";
import "./DetailPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as itemsAction } from "../../redux/moduels/items";
import { Carousel } from "antd";
import TopBar from "../../shared/menu/TopBar";
import ItemInformation from "./Sections/ItemInformation";
import ItemDescription from "./Sections/ItemDescription";
import PopularProductBanner from "./Component/PopularProductBanner";
import Spinner from "./Component/Spinner";
import axios from "axios";

const DetailPage = props => {
  const dispatch = useDispatch();
  const item = useSelector(state => state.items.selectedItems);
  const [isLoading, setIsLoading] = useState(true);
  window.scrollTo({ top: 0, left: 0 });

  useEffect(() => {
    axios
      .get(
        `http://ec2-3-13-167-112.us-east-2.compute.amazonaws.com/product/${props.match.params.id}`
      )
      .then(res => {
        console.log(res);
        dispatch(itemsAction.loadOneData(res.data.data));
        setIsLoading(false);
      })
      .catch(error => {
        console.log("데이터를 받아오지 못했습니다!", error);
      });
  }, []);

  return (
    <div id='detailPage'>
      <TopBar title='니꼬내꼬' history={props.history} rightMenu />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className='fixedArea Section1'>
            <div style={{ position: "relative" }}>
              {item.productSold > 99 ? <PopularProductBanner /> : null}
              {item.productImage && (
                <Carousel autoplay style={{ marginTop: "81px" }}>
                  {item.productImage.map((img, index) => {
                    return (
                      <img key={index} src={img} className='carouselImg' />
                    );
                  })}
                </Carousel>
              )}
            </div>
          </div>
          <div className='Section2'>
            <ItemInformation item={item} />
            <ItemDescription className='Section2' />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
