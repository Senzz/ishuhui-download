export default (title) => (WrappedComponent) => {
  document.title = title;
  return (props) => (
    <WrappedComponent {...props} />
  )
}