import { ReactNode } from 'react';

function layout({children}: { children: ReactNode }) {
  return (
    <div className='relative flex w-full flex-col justify-center items-center mt-52'>
      {children}
    </div>
  )
}

export default layout;
