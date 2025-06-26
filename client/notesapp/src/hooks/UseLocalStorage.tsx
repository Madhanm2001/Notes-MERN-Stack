const useLocalStorage = () => {
  const setItem = (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (err) {
      console.error('Error setting localStorage:', err);
    }
  };

  const getItem = (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (err) {
      console.error('Error reading localStorage:', err);
      return null;
    }
  };

  const deleteItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return { setItem, getItem, deleteItem };
};

export default useLocalStorage;
