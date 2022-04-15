export const storeAccessToken = (value: string) => {
  if (typeof window === "undefined") return "";
  sessionStorage.setItem("access", value);
};

export const getAccessToken = (): string => {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("access") || "";
};

export const removeAccessToken = () => {
  localStorage.removeItem("access");
};

export const storeRefreshToken = (value: string) => {
  localStorage.setItem("refresh", value);
};

export const getRefreshToken = (): string => {
  return localStorage.getItem("refresh") || "";
};

export const removeRefreshToken = () => {
  localStorage.removeItem("refresh");
};
