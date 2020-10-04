import React from 'react';
import LoadingComponent from './LoadingComponent';

export default function CustomLoadable(opts) {
  const LazyComponent = React.lazy(opts.loader);

  return (props) => (
     
    <React.Suspense fallback={<LoadingComponent />}>
       
      <LazyComponent {...props} />
    </React.Suspense>
  );
}