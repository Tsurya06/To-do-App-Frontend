import { ReactNode } from 'react';

function Main({ children }: { children: ReactNode }) {
  return (
    <main>
      <div className="main-container">{children}</div>
    </main>
  );
}

export default Main;
