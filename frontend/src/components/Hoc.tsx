import { ComponentType } from 'react'

function Hoc <P extends {}>(Component: ComponentType<P>): (props: P) => JSX.Element {
  const WrappedComponent = (props: P) => {
    return <Component {...props} />
  }
  return WrappedComponent
} 
export default Hoc