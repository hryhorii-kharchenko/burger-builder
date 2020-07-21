import React, { useEffect, useState } from 'react';
import AriaModal from 'react-aria-modal';

function withAxiosErrorHandler(WrapperComponent, axios) {
  return (props) => {
    const [error, setError] = useState(null);
    const clearError = () => setError(null);

    useEffect(() => {
      axios.interceptors.request.use((request) => {
        clearError();
        return request;
      });
      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          setError(error);
          return error;
        }
      );
    });

    const modal = error ? (
      <AriaModal
        titleText="Error"
        onExit={clearError}
        applicationNode={document.getElementById('application')}
        underlayStyle={{ paddingTop: '2em' }}
      >
        <strong>{error.message}</strong>
        <button>Cancel</button>
      </AriaModal>
    ) : null;

    return (
      <>
        <WrapperComponent {...props} />
        {modal}
      </>
    );
  };
}

export default withAxiosErrorHandler;
