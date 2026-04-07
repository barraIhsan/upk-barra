import { useState } from "react";
import AddDialog from "./components/AddDialog";
import ListGrade from "./components/ListGrade";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  const [refresh, setRefresh] = useState(0);
  return (
    <ThemeProvider defaultTheme="dark">
      <main>
        <section className="container mx-auto pt-24">
          <h1 className="text-4xl font-bold text-center">Student Grade</h1>
          <AddDialog onAdd={() => setRefresh((r) => r + 1)} />
          <ListGrade refresh={refresh} setRefresh={setRefresh} />
        </section>
      </main>
    </ThemeProvider>
  );
}
