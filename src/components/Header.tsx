export default function Header() {
  return (
    <header className="bg-sgsits text-white p-4 shrink-0 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-sgsits font-bold text-xl">S</div>
          <div>
            <h1 className="text-xl font-bold leading-tight m-0">SGSITS Student Registration System</h1>
            <p className="text-xs opacity-90 m-0 mt-0.5">Shri Govindram Seksaria Institute of Technology & Science, Indore</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-xs block opacity-80">Academic Year</span>
          <span className="font-bold">2025 - 2026</span>
        </div>
      </div>
    </header>
  );
}
