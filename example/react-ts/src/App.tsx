import { useState } from "react";
import { useAsyncAwr } from "swr-min";
import useSWR from "swr";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const App = () => {
  const [count, setCount] = useState<number>(0);

  const [data, isLoading, isError] = useAsyncAwr({
    url: "http://localhost:9090/test1",
    fetcher: axios,
  });

  const [data1, isLoading1, isError1] = useAsyncAwr({
    url: `http://localhost:9090/test${data ? data?.data.numberTest : ""}`,
    fetcher: axios,
  });

  console.log(data, isLoading, isError, "test1");

  console.log(data1, isLoading1, isError1, "test2");

  // const { data: a3 } = useSWR("http://localhost:9090/test1", axios);

  // const { data: a4 } = useSWR(
  //   `http://localhost:9090/test${a3 ? a3.data.numberTest : ""}`,
  //   axios
  // );
  // console.log(a3, a4, "test99");

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
