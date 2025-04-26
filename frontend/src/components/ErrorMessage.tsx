export function ErrorMessage(props: { message: string }) {
  if (!props.message) return null;

  return (
    <div>
      <strong class="font-bold">Error: </strong>
      <p>{props.message}</p>
    </div>
  );
}

export default ErrorMessage;
