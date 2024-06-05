"use client"

import Link from "next/link";
import { useEffect, useState } from "react"

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const getData = async () => {
    try {
      setLoading(true)
      const res = await fetch("http://localhost:3000/api/users");
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
      <h1 className="text-4xl text-center py-5">Users</h1>
      <ol className="list list-inside list-decimal">
        {loading && <p>Loading...</p>}
        {errorMsg && <p>{errorMsg}</p>}
        {data.map(user=>(
          <li key={user._id} > <Link href={`/${user._id}`}>Username: {user.username} Email: {user.email}</Link> </li>
        ))}
      </ol>
    </main>
  )
}

export default Home