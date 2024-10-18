"use client"
import React, { useEffect, useRef, useState } from "react";
import ClientList from "./components/ClientList";
import NetworkFlow from "./components/NetworkFlow";

const Page = () => {
  const data = [
    ["router 1", "1", "2", "3"],
    ["router 2", "4", "5", "200", "2002", "2003"],
    // ["router 3", "6"],
    // ["router 4", "7", "8", "9" , "100" , "102" , "103"],
  ];

  const [width, setWidth] = useState<number>(0); // State to hold the width
  const networkFlowRef = useRef<HTMLDivElement>(null); // Create a ref for the div

  useEffect(() => {
    if (networkFlowRef.current) {
      setWidth(networkFlowRef.current.offsetWidth); // Get the width of the div
    }
  }, []);

  return (
    <main className="flex gap-10 ">
      <ClientList />
      <div className="flex-1 ring-1 h-[25rem] ring-gray-200 bg-white rounded-xl" ref={networkFlowRef}>
        <NetworkFlow data={data} width={width} /> {/* Pass the width */}
      </div>
    </main>
  );
};

export default Page;
