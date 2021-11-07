import { useEffect, useState } from 'react'
import Head from 'next/head'
import {
  Container,
  MainWrap,
  TableWrap,
  Table,
  TableBodyTR,
  TableHeadTR,
  TableBodyTH,
  TableHeadTH
} from './styled'
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
  const [selectedAssetRow, setselectedAssetRow] = useState('')
  const [selectedAssetColumn, setSelectedAssetColumn] = useState('')

  let tableHead = fetchedData
    .map((asset, index) => (
      <TableHeadTH key={index+1} style={{ backgroundColor: `${asset.s === selectedAssetColumn ? 'cyan' : ''}` }}>{asset.s}</TableHeadTH>
    ))

  tableHead = [ <th key={0}></th>, ...tableHead ]

  const tableCellSelect = (assetRow, assetColumn) => {
    setselectedAssetRow(assetRow)
    setSelectedAssetColumn(assetColumn)
  }

  const tableBody = fetchedData
    .map((asset, index) => (
      <TableBodyTR key={index}>
        <TableBodyTH style={{ backgroundColor: `${asset.s === selectedAssetRow ? 'cyan' : ''}` }}>{asset.s}</TableBodyTH>

        { fetchedData
          .map((assetSecondary, indexSecondary) => (
            <TableCell
              isSelected={selectedAssetRow === asset.s && selectedAssetColumn === assetSecondary.s}
              isSame={asset.s === assetSecondary.s}
              percents={countPercentage(asset.ch, assetSecondary.ch)}
              onClick={() => tableCellSelect(asset.s, assetSecondary.s)}
              key={indexSecondary}
            />
          ))
        }
      </TableBodyTR>
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
        <title>Coins table</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <MainWrap>
        <Select onChange={timeframeChange}/>

        <TableWrap>
          <Table>
            <thead>
              <TableHeadTR>
                {tableHead}
              </TableHeadTR>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </Table>
        </TableWrap>
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
