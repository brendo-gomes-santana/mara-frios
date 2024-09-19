export default function Data() {
  const ano = new Date().getFullYear();
  const mes = (new Date().getMonth() + 1)
  const dia = new Date().getDate()

  const data = String(`${ano}-${mes}-${dia}`);

  return data
}