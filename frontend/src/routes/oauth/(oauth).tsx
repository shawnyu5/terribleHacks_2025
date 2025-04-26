import { useNavigate } from "@solidjs/router";

export default function Oauth() {
   const navigate = useNavigate();
   return (
      <div id="oauth-form">
         <p>Oauth page</p>
         <button
            onClick={() => {
               navigate("/skill-test");
            }}
         >
            To math problem
         </button>
      </div>
   );
}
