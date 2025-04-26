export default function DoUWantToLogin() {
  function onClick() {
    window.location.href =
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
  }
  return (
    <div>
      <h1>Are u sure u want to login?</h1>
      <button onClick={onClick}>Yes</button>
      <button onClick={onClick}>No</button>
    </div>
  );
}
