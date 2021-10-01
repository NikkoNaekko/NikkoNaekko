import React, { useEffect } from "react";
import "./DetailPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as itemsAction } from "../../redux/moduels/items";
import { Carousel } from "antd";
import TopBar from "../../shared/menu/TopBar";
import ItemInformation from "./Sections/ItemInformation";
import ItemDescription from "./Sections/ItemDescription";
import PopularProductBanner from "./Component/PopularProductBanner";

const DetailPage = (props) => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.items.selectedItems);
  window.scrollTo({ top: 0, left: 0 });

  useEffect(() => {
    dispatch(itemsAction.loadOneClothesDataOnDB(props.match.params.id));
  }, []);

<<<<<<< HEAD
    useEffect(() => {
        dispatch(itemsAction.loadOneClothesDataOnDB(props.match.params.id))
    }, [])
    
    return (
        <div id="detailPage">
          <TopBar title="니꼬내꼬" history={props.history} rightMenu />
          <div className="fixedArea Section1">
            <div style={{ position: "relative" }}>
              {item.purchased > 99 ? <PopularProductBanner /> : null}
              {item.imgSrc && (
                <Carousel autoplay style={{ marginTop: "81px" }}>
                  {item.imgSrc.map((img, index) => {
                    return <img key={index} src={img} className="carouselImg" />;
                  })}
                </Carousel>
              )}
            </div>
          </div>
          <div className="Section2">
            <ItemInformation item={item} />
            <ItemDescription className="Section2" />
          </div>
=======
  return (
    <div id="detailPage">
      <TopBar title="니꼬내꼬" history={props.history} rightMenu />
      <div className="fixedArea Section1">
        <div style={{ position: "relative" }}>
          {item.purchesd ? <PopularProductBanner /> : null}
          {item.imgSrc && (
            <Carousel autoplay style={{ marginTop: "81px" }}>
              {item.imgSrc.map((img, index) => {
                return <img key={index} src={img} className="carouselImg" />;
              })}
            </Carousel>
          )}
>>>>>>> Front
        </div>
      </div>
      <div className="Section2">
        <ItemInformation item={item} />
        <ItemDescription className="Section2" />
      </div>
    </div>
  );
};

export default DetailPage;
