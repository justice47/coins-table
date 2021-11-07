import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Container, MainWrap } from './styled'
import { countPercentage } from '@utils/index'
import TableCell from '@components/tableCell'
import Select from '@components/select'

const filterAssets = (assetsData) => {
  return assetsData.data.filter(asset => asset.p !== 0).slice(0, 50);
}

export default function Main({assetsData}) {
  const [fetchedData, setFetchedData] = useState(filterAssets(assetsData))
  const [fetchInterval, setFetchInterval] = useState()
  const [timeFrame, setTimeFrame] = useState('24h')

  let tableHead = fetchedData
    .map((asset, index) => (
      <th key={index+1}>{asset.s}</th>
    ))

  tableHead = [ <th key={0}></th>, ...tableHead ]

  const tableBody = fetchedData
    .map((asset, index) => (
      <tr key={index}>
        <th>{asset.s}</th>

        { fetchedData
          .map((assetSecondary, indexSecondary) => (
            <TableCell isSame={asset.s === assetSecondary.s} percents={countPercentage(asset.ch, assetSecondary.ch)} key={indexSecondary} />
          ))
        }
      </tr>
    ))

  const timeframeChange = (e) => {
    setTimeFrame(e.target.value)
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`api/coins/${timeFrame}`)
      const data = await response.json()

      setFetchedData(filterAssets(data))
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();

    if (fetchInterval) {
      clearInterval(fetchInterval)
    }

    setFetchInterval(setInterval(async () => {
      fetchData();
    }, 10000));

    return () => clearInterval(fetchInterval)
  }, [timeFrame])

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <MainWrap>
        <Select onChange={timeframeChange}/>

        <table>
          <thead>
            <tr>
              {tableHead}
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </MainWrap>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        tbody tr {
          height: 30px;
        }

        tbody td {
          text-align: center;
        }

        table tbody th {
          position: sticky;
          left: 0;
          background: white;
          z-index: 1;
        }

        table thead th {
          padding: 3px;
          position: sticky;
          top: 0;
          z-index: 1;
          width: 25vw;
          background: white;
        }

        table thead th:first-child {
          position: sticky;
          left: 0;
          z-index: 2;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        select {
          // A reset of styles, including removing the default dropdown arrow
          appearance: none;
          // Additional resets for further consistency
          background-color: transparent;
          border: none;
          padding: 4px;
          margin: 0;
          width: 100%;
          font-family: inherit;
          font-size: inherit;
          cursor: inherit;
          line-height: inherit;
        }
      `}</style>
    </Container>
  )
}
