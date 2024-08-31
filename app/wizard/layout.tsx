import { ReactNode } from 'react';

function layout({children}: { children: ReactNode }) {
  return (
    <div className='relative flex w-full flex-col justify-center items-center mt-32'>
      {children}
    </div>
  )
}

export default layout;
