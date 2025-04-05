import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

function Connection() {
  const connection = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const response = await axios.get(baseUrl + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(response.data.data));
    } catch (error) {
      console.error("Error fetching connection:",error);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connection) return;

  if (connection.length === 0) {
    return <h1 className="text-center">Connection not Found</h1>;
  }

  return (
    <div>
      <h1 className="text-center text-3xl my-4">Connections</h1>

      <div className=" flex justify-center flex-wrap gap-4 my-4">
        {connection &&
          connection.map((connection) => (
            <div key={connection._id} className="card w-64 bg-base-300 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={connection.photoUrl}
                  alt={`${connection.firstName} ${connection.lastName}`}
                  className="rounded-full w-24 h-24 border border-gray-300"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {connection.firstName} {connection.lastName}
                </h2>
                <p className="text-gray-500">{connection.about}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Connection;
