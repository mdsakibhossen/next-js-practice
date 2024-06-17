"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Pagination = ({ totalUsers, currentPage, limit }) => {
  const [page, setPage] = useState(parseInt(currentPage));
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const router = useRouter();
  const totalPages = Math.ceil(totalUsers / limit);

  useEffect(() => {
    router.replace(`/?page=${page}&limit=${limit}`);
  }, [page, limit]);

//   useEffect(() => {
//     page > 1 ? setDisablePrev(false) : setDisablePrev(true);
//     (page - 1) * parseInt(limit) + parseInt(limit) < parseInt(totalUsers)
//       ? setDisableNext(false)
//       : setDisableNext(true);
//   }, [page, limit, totalUsers]);

  useEffect(() => {
    setDisablePrev(page <= 1);
    setDisableNext(page >= totalPages);
  }, [page, totalPages]);

  const handlePage = ({ type, value }) => {
    switch (type) {
      case "PREV":
        if (page > 1) {
          setPage((prev) => prev + value);
        }

        break;
      case "NEXT":
        if (
          (page - 1) * parseInt(limit) + parseInt(limit) <
          parseInt(totalUsers)
        ) {
          setPage((prev) => prev + value);
        }
        break;

      default:
        break;
    }
  };

      const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 3) {
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          if (page <= 3) {
            pages.push(1, 2, 3, "...", totalPages);
          } else if (page >= totalPages - 2) {
            pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
          } else {
            pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
          }
        }
        return pages;
      };


  return (
    // flex-col will be added when numbers will be uncommented
    <div className="flex  items-center md:flex-row justify-between gap-1 mt-3 p-2 rounded-3xl bg-slate-700 ">
      <button
        onClick={() => handlePage({ type: "PREV", value: -1 })}
        className={`bg-green-400 rounded-3xl px-5 py-1 transition-all hover:bg-green-500 active:bg-green-700 ${
          disablePrev &&
          "cursor-not-allowed bg-slate-400 hover:bg-slate-400 active:bg-slate-400"
        }`}
        disabled={disablePrev}
      >
        Prev
      </button>
      {/* <div className="numbers flex gap-3">
        
        <button onClick={()=> setPage(1)} className={`w-6 h-6 rounded-full flex justify-center items-center bg-white/20 ${page === 1 && "bg-green-400/100"}`}>1</button>
        <button onClick={()=> setPage(2)} className={`w-6 h-6 rounded-full flex justify-center items-center bg-white/20 ${page === 2 && "bg-green-400/100"}`}>2</button>
        <button onClick={()=> setPage(3)} className={`w-6 h-6 rounded-full flex justify-center items-center bg-white/20 ${page === 3 && "bg-green-400/100"}`}>3</button>
      </div> */}
      <div className="numbers flex gap-3">
        {getPageNumbers().map((num, index) => (
          <button
            key={index}
            onClick={() => typeof num === "number" && setPage(num)}
            className={`w-6 h-6 rounded-full flex justify-center items-center  ${
              num === page ? "bg-green-400/100" : "bg-white/20"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePage({ type: "NEXT", value: 1 })}
        className={`bg-green-400 rounded-3xl px-5 py-1 transition-all hover:bg-green-500 active:bg-green-700 ${
          disableNext &&
          "cursor-not-allowed bg-slate-400 hover:bg-slate-400 active:bg-slate-400"
        }`}
        disabled={disableNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
