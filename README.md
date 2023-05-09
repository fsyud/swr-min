<p align="center"><img height="180" src="https://user-images.githubusercontent.com/26371465/236753268-60e12bd4-de92-4aae-97db-076371b9098f.png"></p>

<p align="center">
  <a href="https://www.npmjs.com/package/swr-min"><img src="https://img.shields.io/badge/npm-v8.11.0-green"> </a>
  <a href="https://www.npmjs.com/package/swr-min"><img src="https://img.shields.io/badge/react-v18.2.0-green"></a>
  <a href="https://www.npmjs.com/package/swr-min"><img src="https://img.shields.io/badge/LICENSE-MIT-blue"></a>
</p>

## Introduction

implement useSWR from 0

## Quick Start

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

## Dependency Request

```
// A and B have two parallel requests, and B depends on A's request
const Home = () => {
  const { data: a } = useFetch('/api/a')
  const { data: b } = useFetch(() => `/api/b?id=${a.id}`)
  return ()
}
```

So how to deal with this kind of demand in the mode of useFetch, when the /api/a interface does not return the result normally, the value of a is undefined, calling a.id in the /api/b interface will directly throw an exception, causing the page Rendering failed.

Does this mean that we can assume that when the interface is called, the url parameter throws an exception, which means that its dependencies are not ready yet, suspend the request for this data; wait until the dependencies are ready, and then initiate a new one for the ready data A round of requests to solve the problem of dependent requests.

## License

The MIT License.
