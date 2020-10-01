import React from 'react';

class ErrorBoundary extends React.Component {
   constructor(props: any) {
      super(props);
      this.state = {hasError: false};
   }

   static getDerivedStateFromError(error: any) {
      return {hasError: true};
   }

   componentDidCatch(error: any, errorInfo: any) {}

   render() {
      // @ts-ignore
      if (this.state.hasError) {
         return <h1>Something went wrong.</h1>;
      }

      return this.props!.children;
   }
}

export default ErrorBoundary;
