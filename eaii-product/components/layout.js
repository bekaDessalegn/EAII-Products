import { Quicksand } from "next/font/google";
import Header from "./header";

const quicksand = Quicksand({
    subsets: ['latin']
  })

export default function Layout({ children }) {

  return (
    <div className={`tracking-wide ${quicksand.className}`}>
      <Header />
      {children}
    </div>
  );
}