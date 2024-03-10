import NavBar from "./NavBar";

export default function Header() {
  return (
    <div className="flex justify-between items-center bg-blue-400 py-2 px-48">
      <div>Left side</div>
      <div>
        <NavBar />
      </div>
    </div>
  );
}
