export default (...mappedSizesToProps) => WrappedComponent => {
  const data = mappedSizesToProps[0]({
    width: 12346645
  })
  return (props) => (
    <WrappedComponent {...data} {...props} />
  )
}