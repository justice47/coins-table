import { useEffect, useState } from 'react'
import Head from 'next/head'
import Main from '@components/main'

export default function Home({data}) {
  return (
    <Main assetsData={data}/>
  )
}

export async function getServerSideProps() {
  try {
    const response = await fetch('https://coin360.com/api/coins?currency=USD&updates_from=1629894793&period=24h&no_charts=true')
    const data = await response.json()

    return {
      props: {
        data
      }
    };
  } catch (e) {
    console.log(e)
  }
}
