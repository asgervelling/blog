import NavBar from "./NavBar";

export default function Header() {
  return (
    <div className="h-16 bg-stone-200 flex justify-between items-center py-2 px-48">
      <div>Left side</div>
      <div>
        <NavBar />
      </div>
    </div>
  );
}
