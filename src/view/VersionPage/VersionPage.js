import React from "react";
import { Timeline } from "antd";
import TopBar from "../../shared/menu/TopBar";
import "./VersionPage.scss";
const VersionPage = ({ history }) => {
  return (
    <div className='VersionBorder'>
      <TopBar title='니꼬내꼬' history={history} />
      <h1
        className='Section1'
        style={{ marginTop: "81px", fontWeight: "bold" }}
      >
        버전별 상세사항
      </h1>
      <hr />
      <Timeline className='Section2'>
        <Timeline.Item color='green'>
          <p style={{ fontWeight: "bold" }}>v 1.0 (2021-10-18)</p>
          <p>니꼬내꼬 서비스 시작 </p>
        </Timeline.Item>
        <Timeline.Item>
          <p style={{ fontWeight: "bold" }}>v 1.1 (2021-10-23)</p>
          <p>PC 환경에 접속 시 모바일 환경 권장 메세지가 표시됩니다.</p>
          <p>이제 상품 검색 시 'enter' 키로도 검색이 가능해졌습니다.</p>
          <p>좋아요 섹션이 수직이 아닌 수평으로 정렬됩니다.</p>
        </Timeline.Item>
        <Timeline.Item>
          <p style={{ fontWeight: "bold" }}>v 1.2 (2021-11-03)</p>
          <p>업데이트 기록 페이지를 추가했습니다</p>
          <p>회원가입, 로그인 유효성 체크가 강화되었습니다.</p>
        </Timeline.Item>
        <Timeline.Item color='gray'>
          <p>댓글 기능 출시 예정...</p>
          <p>별점 기능 출시 예정...</p>
          <p>반응형 웹뷰 출시 예정...</p>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default VersionPage;
