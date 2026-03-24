const AUTH_KEY = "brewhaus_admin_authed";

export function useAdminAuth() {
  const isAuthed = () => sessionStorage.getItem(AUTH_KEY) === "true";
  const login = () => sessionStorage.setItem(AUTH_KEY, "true");
  const logout = () => sessionStorage.removeItem(AUTH_KEY);
  return { isAuthed, login, logout };
}