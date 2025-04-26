import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

export default function Home() {
   const navigate = useNavigate();

   onMount(() => {
      navigate("/login");
   });

   return (
      <main>
         <Title>Hello World</Title>)
      </main>
   );
}
