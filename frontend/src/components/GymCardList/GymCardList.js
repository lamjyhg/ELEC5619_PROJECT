import { Col, Row, Spin, Card, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import Icon from '@ant-design/icons';
import './GymCardList.scss';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../utils/request';
import Lottie from 'lottie-react';
import empty from './../../image/lotties/empty.json';
const { Meta } = Card;
const dumbBell = () => {
  return (
    <svg viewBox="0 0 640 512" width="32" height="32">
      <path d="M112 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32V224v64V416c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32h48V96zm416 0v32h48c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H528v32c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 96c0-17.7 14.3-32 32-32h16c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z" />
    </svg>
  );
};
export default function GymCardList() {
  const { gymsList, isSuccess, isLoading, isError } = useSelector(
    (state) => state.gyms.gymsPage
  );

  const getCardList = () => {
    if (!gymsList || gymsList.length === 0) {
      return (
        <div className="gymCardList_empty">
          <Lottie animationData={empty} />
        </div>
      );
    }
    return gymsList
      .reduce((rows, item, index) => {
        if ((index + 1) % 3 == 1) {
          return [...rows, [item]];
        } else {
          return [...rows.slice(0, -1), rows.slice(-1)[0].concat(item)];
        }
      }, [])
      .map((row) => {
        return (
          <Row style={{ marginBottom: 20 }}>
            {row.map((item, index) => (
              <Col span={8} key={index} align="center">
                <Card
                  onClick={() => {
                    navigate('/gyms/' + item.id);
                  }}
                  hoverable
                  className="card_body"
                  cover={
                    <img
                      height="300px"
                      alt="example"
                      src={
                        item.imageUrl
                          ? baseURL + item.imageUrl
                          : 'https://picsum.photos/id/300/300'
                      }
                    />
                  }
                >
                  <Meta
                    avatar={<Icon component={dumbBell} />}
                    style={{ textAlign: 'left' }}
                    title={item.name}
                    description={item.address}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        );
      });
  };

  const navigate = useNavigate();
  return (
    <div className="gymCardList">
      {isLoading ? (
        <Spin />
      ) : (
        //replace with gymList
        getCardList()
      )}
    </div>
  );
}
