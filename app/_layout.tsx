import "react-native-reanimated";
import StackNavigator from "@/navigation/StackNavigator";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";

import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import store from "@/redux/store";

const initializeDatabase = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username TEXT UNIQUE,
              password TEXT
          );
      `);
    console.log("Database initialized !");
  } catch (error) {
    console.log("Error while initializing the database : ", error);
  }
};

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="auth.db" onInit={initializeDatabase}>
      <Provider store={store}>
        <PaperProvider>
          <StackNavigator />
        </PaperProvider>
      </Provider>
    </SQLiteProvider>
  );
}
