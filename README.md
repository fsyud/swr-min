<p align="center"><img height="180" src="https://user-images.githubusercontent.com/26371465/236753268-60e12bd4-de92-4aae-97db-076371b9098f.png"></p>


<p align="center">
  <a href="https://www.npmjs.com/package/swr-min"><img src="https://img.shields.io/badge/npm-v8.11.0-green"> </a>
  <a href="https://www.npmjs.com/package/swr-min"><img src="https://img.shields.io/badge/react-v18.2.0-green"></a>
  <a href="https://www.npmjs.com/package/swr-min"><img src="https://img.shields.io/badge/LICENSE-MIT-blue"></a>
</p>

# 使用

implement useSWR from 0

```
import swr from 'swr-min'

const customFetch = async (...args) => {
  const res = await fetch(...args)
  return await res.json()
}


const Home = () => {
  // useFetch 的第二个参数可以使用自定义的 customFetch
  const [data, isLoading, isError] = swr('api/data', customFetch);
  return ()
}
```
