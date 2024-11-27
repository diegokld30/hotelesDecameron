import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastNotification: React.FC = () => {
  return (
    <div>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          duration: 2000,
        }}
      />
    </div>
  );
};

export default ToastNotification;
