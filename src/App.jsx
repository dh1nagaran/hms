import React, { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Leftnav from "./components/Leftnav";
import Hostel from "./components/Hostel";
import Department from "./components/Department";
import Students from "./components/Students";
import students from "./Db/data";
import hostels from "./Db/Hostel";

const App = () => {
  const [page, setPage] = useState("hostel");
  const [menuOpen, setMenuOpen] = useState(false);

  const [studentsList, setStudentsList] = useState(students);
  const [hostel, setHostel] = useState(hostels); // not [hostels]

  const changePage = (p) => {
    setPage(p);
    setMenuOpen(false); // close the mobile menu after choosing a page
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b px-4 py-3">
        <span className="font-semibold">Hostel Management</span>
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Sidebar: always visible on desktop, toggled on mobile */}
      <div className={`${menuOpen ? "block" : "hidden"} md:block`}>
        <Leftnav setPage={changePage} activePage={page} />
      </div>

      <div className="flex-1 min-w-0">
        {page === "hostel" && (
          <Hostel
            studentsList={studentsList}
            setStudentsList={setStudentsList}
            hostel={hostel}
            setHostel={setHostel}
          />
        )}

        {page === "student" && (
          <Students
            studentsList={studentsList}
            setStudentsList={setStudentsList}
            hostel={hostel}
            setHostel={setHostel}
          />
        )}

        {page === "dept" && <Department />}
      </div>
    </div>
  );
};

export default App;