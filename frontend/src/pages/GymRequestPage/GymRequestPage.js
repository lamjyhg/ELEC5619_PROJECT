import React from 'react';
import {useParams} from "react-router-dom";

function GymRequestPage(){
  const { id } = useParams();
  return (
      <>gym request page for id: {id}</>
  );
};
export default GymRequestPage;
