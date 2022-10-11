import {
  Col,
  Row,
  Spin,
  Card,
  Avatar,
  Table,
  Tooltip,
  Tag,
  Image,
  Button,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Icon, { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import './OwnerGymCardList.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { handleActionToGetOwnerGyms } from '../../state/gyms/gyms.action';
import temp_gym from '../../image/temp_gym_img.jpg';
import { baseURL } from '../../utils/request';
import { displayDate, getStringFromNumber } from '../../utils/dateHandlers';
import moment from 'moment';
const { Meta } = Card;

export default function OwnerGymCardList({ swicthToEditGym, gymsList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const columns = [
    { title: 'Gym Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'image',
      render: (imageUrl) => (
        <Image
          width={50}
          height={50}
          src={imageUrl ? baseURL + imageUrl : temp_gym}
        />
      ),
    },
    {
      title: 'Last Updated Time',
      dataIndex: 'lastUpdatedTime',
      key: 'astUpdatedTime',
      render: (lastUpdatedTime) => displayDate(lastUpdatedTime),
      sorter: (a, b) =>
        moment(a.lastUpdatedTime).unix() - moment(b.lastUpdatedTime).unix(),
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address) => (
        <Tooltip placement="left" title={address}>
          {address}
        </Tooltip>
      ),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Trading Hours',
      dataIndex: 'tradingHours',
      key: 'tradingHours',
      render: (tradingHours) => (
        <div className="tradingHours">
          {tradingHours ? getTradingHoursTag(tradingHours) : null}
        </div>
      ),
      ellipsis: {
        showTitle: false,
      },
    },

    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => (
        <Tooltip placement="left" title={description}>
          {description}
        </Tooltip>
      ),
      ellipsis: {
        showTitle: false,
      },
    },
    {
      title: 'Status',
      dataIndex: 'gymStatus',
      key: 'gymStatus',
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.gymStatus.includes(value),
      render: (status) => {
        var color = 'yellow';
        switch (status) {
          case 'public':
            color = 'green';
            break;
          default:
            color = 'red';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      filters: [
        {
          text: 'private',
          value: 'PRIVATE',
        },
        {
          text: 'public',
          value: 'PUBLIC',
        },
      ],
    },
    {
      title: 'Application Info',
      dataIndex: 'gymApplicationStatus',
      key: 'applicationInfo',
      filterMode: 'tree',
      filterSearch: true,
      render: (value, record) => {
        var color = 'yellow';
        switch (value) {
          case 'APPROVED':
            color = 'green';
            break;
          case 'DISAPPROVED':
            color = 'red';
            break;
          default:
            color = 'yellow';
        }
        return (
          <Tag color={color}>
            {record.gymApplicationType.toUpperCase()} {value.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) =>
        record.gymStatus === 'PRIVATE' ? (
          <Button
            type="text"
            shape="round"
            icon={<EditOutlined />}
            onClick={() => {
              swicthToEditGym(record);
            }}
          ></Button>
        ) : (
          <>
            <Button
              type="text"
              shape="round"
              icon={<EditOutlined />}
              onClick={() => {
                swicthToEditGym(record);
              }}
            ></Button>
            <Button
              type="text"
              shape="round"
              icon={<EllipsisOutlined />}
              onClick={() => {
                navigate('/gyms/' + record.id);
              }}
            ></Button>
          </>
        ),
    },
  ];

  const getTradingHoursTag = (tradingHours) => {
    const keys = Object.keys(tradingHours).sort();
    const tags = keys.map((hour, index) => (
      <Tag className="tradingHours_hour" key={index}>
        <Tooltip
          placement="left"
          title={`${tradingHours[hour].startTime} - ${tradingHours[hour].endTime}`}
        >
          {getStringFromNumber(hour)}
        </Tooltip>
      </Tag>
    ));
    return tags;
  };

  return (
    <div className="ownerGymsTable">
      <Table
        pagination={{ pageSize: 8 }}
        columns={columns}
        dataSource={gymsList}
        className="gymsTable-owner"
        rowKey="id"
      />
    </div>
  );
}
