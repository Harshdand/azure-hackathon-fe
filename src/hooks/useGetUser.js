export const useGetUser = () => {
  return { user: JSON.parse(localStorage.getItem('user')) };
};
