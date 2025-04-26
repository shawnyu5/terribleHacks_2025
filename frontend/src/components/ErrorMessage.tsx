export function ErrorMessage(props: { message: string }) {
  // const ErrorMessage: Component<{ message: string }> = (props) => {
  if (!props.message) return null;

  return (
    <div>
      <strong class="font-bold">Error: </strong>
      <span class="block sm:inline">{props.message}</span>
    </div>
  );
}

export default ErrorMessage;
