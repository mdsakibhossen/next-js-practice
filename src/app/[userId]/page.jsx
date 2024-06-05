"use client"

import { useEffect, useState } from "react";

const userDetails = ({params}) => {
    // console.log("params:", params);
    const {userId} = params
      const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const getData = async () => {
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3000/api/users/${userId}`);
      // console.log("res:", res);
      const result = await res.json();
      // console.log("typeof result:", typeof result);
      // console.log("result:", result);
      setData(result)
      setLoading(false)
      setErrorMsg("")
    } catch (error) {
      // console.log("Custom Error: ",error);
      setData([])
      setLoading(false)
      setErrorMsg(error.message)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <main className="px-5 bg-slate-800 text-slate-300 h-screen">
      <h1 className="text-4xl text-center py-5">User Details</h1>
      <ol className="list list-inside list-decimal">
        {loading && <p>Loading...</p>}
        {errorMsg && <p>{errorMsg}</p>}
        {!loading && !errorMsg && (
          <div>
            <p>Username: {data.username}</p>
            <p>Email: {data.email}</p>
          </div>
        )}
      </ol>
    </main>
  );
}

export default userDetails