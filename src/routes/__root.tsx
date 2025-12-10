import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from '../components/header'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Header />
      <div className="m-4 ml-64">
        <Outlet />
      </div>
    </>
  )
}

