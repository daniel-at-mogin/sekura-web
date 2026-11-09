// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { Spinner } from "@/components/ui/spinner";
import { Suspense, type ComponentType, type FC } from "react";

// ===========================|| LOADABLE - LAZY LOADING ||=========================== //

const Loadable =
  <P extends object>(Component: ComponentType<P>): FC<P> =>
  (props: P) => (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Spinner />
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
