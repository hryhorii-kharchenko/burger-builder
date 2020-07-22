import React, { Component } from 'react';
import AriaModal from 'react-aria-modal';

function withAxiosErrorHandler(WrapperComponent, axios) {
  return class AxiosErrorHandler extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
      };

      this.clearError = this.clearError.bind(this);
    }

    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((request) => {
        this.clearError();
        return request;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          this.setState({ error });
          return error;
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    clearError() {
      this.setState({ error: null });
    }

    render() {
      const { error } = this.state;

      const modal = error ? (
        <AriaModal
          titleText="Error"
          onExit={this.clearError}
          applicationNode={document.getElementById('application')}
          underlayStyle={{ paddingTop: '2em' }}
        >
          <strong>{error.message}</strong>
          <button>Cancel</button>
        </AriaModal>
      ) : null;

      return (
        <>
          <WrapperComponent {...this.props} />
          {modal}
        </>
      );
    }
  };
}

export default withAxiosErrorHandler;
