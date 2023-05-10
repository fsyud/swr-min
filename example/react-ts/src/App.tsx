import { useSwr } from "./../../../src/index";
// import useSWR from "swr";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const App = () => {
  const [data, isLoading, isError] = useSwr({
    url: "http://localhost:9090/test1",
    fetcher: axios,
  });

  const [data1, isLoading1, isError1] = useSwr({
    url: () => `http://localhost:9090/test${data ? data?.data.numberTest : ""}`,
    fetcher: axios,
  });

  // console.log(data, isLoading, isError, "test1");

  // console.log(data1, isLoading1, isError1, "test2");

  return (
    <>
      111
      <div style={{ color: "white" }}>
        <div>{data?.data?.userName}</div>
        <div>{data?.data?.password}</div>
        <div>{data1?.data?.userName}</div>
        <div>{data1?.data?.password}</div>
      </div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
    </>
  );
};

export default App;
