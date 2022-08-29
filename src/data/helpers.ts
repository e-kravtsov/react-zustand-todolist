import Cookies from 'js-cookie'

type GenerateId = () => string;
export const generateId: GenerateId = () => (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
);


export const cookiesStorage = {
  getItem: (name: string) => Cookies.get(name)||'',
  setItem: (name: string, value: string) =>  {Cookies.set(name, value)},
  removeItem: (name: string) => Cookies.remove(name)
}