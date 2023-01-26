/**
 * Este arquivo contém várias expressões regulares utilizadas para validação de diversos campos
 * como nome, e-mail, senha e outros. 
 * Cada expressão regular está comentada com o objetivo de cada uma.
 * É importante testar cada uma dessas expressões regulares antes de utilizá-las na sua aplicação.
 */


// -- Password
// password deve ter entre 4 e 8 dígitos e incluir pelo menos um dígito numérico
export const passwordRegex = /^(?=.*\d).{4,8}$/;

// -- Email
// email deve ter formato de email
export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;