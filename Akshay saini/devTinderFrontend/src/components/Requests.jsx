import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests,removeRequest } from "../utils/requestSlice";


function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(baseUrl + "/user/requests/pending", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error("Error fetching request:", error);
    }
  };

  const reviewRequest = async(status,_id)=>{
    try{
      const res = await axios.post(baseUrl + "/request/review/" + status + "/" + _id,{},{withCredentials:true});
      dispatch(removeRequest(_id));
    }catch(error){
      console.error('ERROR: ',error)
    }
  }

  useEffect(()=>{
    fetchRequests();
  },[]);

  if (!requests) return;

  if (requests.length === 0) {
    return <h1 className="text-center">requests not Found</h1>;
  }
  return (
    <div>
      <h1 className="text-center text-3xl my-4">Connection Requests</h1>

      <div className=" flex justify-center flex-wrap gap-4 my-4">
        {requests &&
          requests.map((request) => {
            const {_id, firstName, lastName, photoUrl, about } =
              request.fromUserId;
            return (
              <div key={_id} className="card w-64 bg-base-300 shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="rounded-full w-24 h-24 border border-gray-300"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-gray-500">{about}</p>
                  <div className="space-x-2">
                  <button className="btn btn-primary" onClick={()=>reviewRequest("rejected",request._id)}>Ignore</button>
                  <button className="btn btn-secondary" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
 
}

export default Requests;
