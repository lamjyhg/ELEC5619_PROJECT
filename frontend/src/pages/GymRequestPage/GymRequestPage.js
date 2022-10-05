import React from 'react';
import { Layout } from 'antd';
import {useParams} from "react-router-dom";
import SingleGymView from "../../components/AdminTable/SingleGymView/SingleGymView";

function GymRequestPage(){
  const { id } = useParams();
  return (
      <Layout>
        <p>gym request page for id: {id}</p>
        <SingleGymView GID={id}/>
      </Layout>
  );
};
export default GymRequestPage;
