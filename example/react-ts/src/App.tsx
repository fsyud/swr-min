import { useSwr } from "./../../../src/index";
// import useSWR from "swr";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const App = () => {
  const [data1, isLoading, isError] = useSwr({
    url: "http://localhost:9099/test1",
    fetcher: axios,
  });

  const [data2, isLoading1, isError1] = useSwr({
    url: () => `http://localhost:9099/test${data1.data.numberTest}`,
    fetcher: axios,
  });

  console.log(data1, isLoading, isError, "test1");

  console.log(data2, isLoading1, isError1, "test2");

  // const { data: data1 } = useSWR("http://localhost:9099/test1", axios);

  // const { data: data2 } = useSWR(
  //   () => `http://localhost:9099/test${data1.data.numberTest}`,
  //   axios
  // );

  // console.log(data1, "test1");

  // console.log(data2, "test2");

  return (
    <>
      111
      <div style={{ color: "white" }}>
        <div>{data1?.data?.userName}</div>
        <div>{data1?.data?.password}</div>
        <div>{data2?.data?.userName}</div>
        <div>{data2?.data?.password}</div>
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
      <a href="/one">页面1</a>
      <a href="/two" style={{ marginLeft: 30 }}>
        页面2
      </a>
    </>
  );
};

export default App;
