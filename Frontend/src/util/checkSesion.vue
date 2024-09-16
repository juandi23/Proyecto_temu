<script>
// utils/auth.js
export function checkSession() {
  // Obtener el token de sesión del localStorage
  const token = localStorage.getItem('Session');

  console.log(token.token);
  
  // Verificar si el token está presente
  return !!token; // Devuelve true si el token existe, false si no
}

</script>