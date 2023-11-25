import AsyncStorage from "@react-native-async-storage/async-storage";

const useLocalStorage = () => {
  const getKeyFromLS = async (key, destrigify = false) => {
    const value = await AsyncStorage.getItem(key);
    if (value === null) return null;
    return destrigify ? JSON.parse(value) : value;
  };

  const storeKeyInLS = async (key, value) => {
    const valueToStore = typeof value === "string" ? value : JSON.stringify(value);
    try {
      await AsyncStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    get: getKeyFromLS,
    set: storeKeyInLS,
  };
};

export default useLocalStorage;
