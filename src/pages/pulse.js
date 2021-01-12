import React from 'react'
import useApp from '../hooks/useApp'
import AppWrapper from '../components/app/wrapper'

const Page = (props) => {
  const app = useApp(false)

  return <AppWrapper app={app} title={app.translate('app.search')}></AppWrapper>
}

export default Page
