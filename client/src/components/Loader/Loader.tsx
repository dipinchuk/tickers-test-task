import { JellyTriangle } from '@uiball/loaders';

export const Loader = () => (
  <div
    className="columns is-centered is-vcentered is-mobile"
    style={{ height: '100vh', overflowX: 'hidden' }}
  >
    <JellyTriangle size={100} speed={1.75} color="black" />
  </div>
);
