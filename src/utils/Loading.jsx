export default function Loading({isloading}) {
  return (
    isloading && 
    <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
  );
}