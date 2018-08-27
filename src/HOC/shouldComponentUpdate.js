
export default () => (WrappedComponent) => {
  return class ShouldComponentUpdate extends WrappedComponent {
    shouldComponentUpdate(nextProps, nextState) {
      const isProps = JSON.stringify(nextProps) == JSON.stringify(this.props)
      const isState = JSON.stringify(nextState) == JSON.stringify(this.state);
      return (!isProps || !isState);
    }
  }
}