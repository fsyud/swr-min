import { useSwr } from "./../../../../src/index";
// import useSWR from "swr";
import axios from "axios";

const Two = () => {
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
    <div>
      <div>Two</div>
      <div style={{ color: "white" }}>
        <div>{data1?.data?.userName}</div>
        <div>{data1?.data?.password}</div>
        <div>{data2?.data?.userName}</div>
        <div>{data2?.data?.password}</div>
      </div>
    </div>
  );
};

export default Two;
