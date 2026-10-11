import React, { useMemo, useState } from "react";
import Select from "react-select";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import Swal from "sweetalert2";

const DEPT_PREFIX = { IT: 1, CSE: 2, CIVIL: 3, ECE: 4, MECH: 5 };

const emptyForm = {
    name: "",
    dept: "",
    year: "",
    gender: "",
    HostelAlloc: "",
};

const selectYear = [
    { value: 1, label: "I Year" },
    { value: 2, label: "II Year" },
    { value: 3, label: "III Year" },
    { value: 4, label: "IV Year" },
];

const hostelAllocation = [
    { value: 1, label: "Yes" },
    { value: 2, label: "No" },
];

const Students = ({ studentsList, setStudentsList, hostel, setHostel }) => {
    const [form, setForm] = useState(emptyForm);
    const [room, setRoom] = useState(null);
    const [errors, setErrors] = useState({});

    const hostelList = useMemo(
        () => (Array.isArray(hostel) ? hostel.flat() : []),
        [hostel]
    );

    const depts = useMemo(
        () =>
            [...new Set(studentsList.map((s) => s.department))].map((d) => ({
                value: d,
                label: d,
            })),
        [studentsList]
    );

   
    const regno = useMemo(() => {
        if (!form.dept || !form.year) return "";

        const same = studentsList.filter(
            (s) =>
                s.department === form.dept &&
                Number(s.year) === Number(form.year)
        );

        if (same.length > 0) {
            return Math.max(...same.map((s) => Number(s.regno))) + 1;
        }

        const prefix = DEPT_PREFIX[form.dept] ?? 9;
        return prefix * 1000 + Number(form.year) * 100 + 1;
    }, [form.dept, form.year, studentsList]);


    const roomOptions = useMemo(() => {
        if (!form.gender || !form.year) return [];

        const targetHostel = hostelList.find((h) => h.gender === form.gender);
        if (!targetHostel) return [];

        return targetHostel.rooms
            .filter((r) => Number(r.year) === Number(form.year))
            .filter((r) => r.students.length < r.capacity)
            .filter((r) => {

                if (Number(form.year) !== 1 || !form.dept) return true;
                return !r.students.some(
                    (id) =>
                        studentsList.find((s) => s.id === id)?.department ===
                        form.dept
                );
            })
            .map((r) => ({
                value: r.roomNumber,
                label: `${r.roomNumber} -> ${r.capacity - r.students.length} Beds Remaining`,
            }));
    }, [form.gender, form.year, form.dept, hostelList, studentsList]);

    const setField = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));


        if (["gender", "year", "dept", "HostelAlloc"].includes(name)) {
            setRoom(null);
        }
    };

    function submitForm(e) {
        e.preventDefault();

        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Enter the student name";
        if (!form.gender) newErrors.gender = "Select Gender";
        if (!form.dept) newErrors.dept = "Select Department";
        if (!form.year) newErrors.year = "Select Year";
        if (!form.HostelAlloc) newErrors.HostelAlloc = "Select Hostel Allocation";

        const wantsHostel = Number(form.HostelAlloc) === 1;
        if (wantsHostel && !room) newErrors.room = "Select a room";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // make sure the chosen room exists and still has space
        if (wantsHostel) {
            const targetHostel = hostelList.find((h) => h.gender === form.gender);
            const targetRoom = targetHostel?.rooms.find(
                (r) => r.roomNumber === room
            );

            if (!targetRoom || targetRoom.students.length >= targetRoom.capacity) {
                Swal.fire({
                    title: "Room not available",
                    text: "Please choose another room.",
                    icon: "error",
                });
                return;
            }
        }

        const newId = Math.max(0, ...studentsList.map((s) => Number(s.id))) + 1;

        const newStudent = {
            id: newId,
            regno: Number(regno),
            name: form.name.trim(),
            department: form.dept,
            year: Number(form.year),
            gender: form.gender,
            hostelAllocation: wantsHostel ? 1 : 0,
        };

        // 1) save the student
        setStudentsList((prev) => [...prev, newStudent]);

        // 2) save the same student ID in the room
        if (wantsHostel) {
            setHostel((prev) =>
                prev.flat().map((h) => ({
                    ...h,
                    rooms: h.rooms.map((r) =>
                        r.roomNumber === room
                            ? { ...r, students: [...r.students, newId] }
                            : r
                    ),
                }))
            );
        }

        setForm(emptyForm);
        setRoom(null);
        setErrors({});

        Swal.fire({
            title: "Success!",
            text: "Student added successfully!",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#16a34a",
        });
    }

    return (
        <div className="min-h-screen p-4 sm:p-6">
            <div className="mx-auto max-w-7xl rounded-lg border bg-white p-4 sm:p-6">
                <h4 className="text-lg font-semibold">Add Student</h4>

                <form onSubmit={submitForm}>
                    <div className="flex gap-3 mt-3">
                        <button
                            type="button"
                            className="p-2"
                            onClick={() => setField("gender", "Male")}
                        >
                            <IconGenderMale
                                className={form.gender === "Male" ? "text-blue-500" : "text-black"}
                                stroke={1}
                                size={24}
                            />
                        </button>

                        <button
                            type="button"
                            className="p-2"
                            onClick={() => setField("gender", "Female")}
                        >
                            <IconGenderFemale
                                className={form.gender === "Female" ? "text-rose-500" : "text-black"}
                                stroke={1}
                                size={24}
                            />
                        </button>
                    </div>
                    {errors.gender && <p className="text-red-600">{errors.gender}</p>}

                    {/* 1 column on phones, 2 on tablets, 3 on desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <div>
                            <label>Enter Name</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded"
                                name="name"
                                value={form.name}
                                onChange={(e) => setField("name", e.target.value)}
                            />
                            {errors.name && <p className="text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                            <label>Select Department</label>
                            <Select
                                inputId="dept"
                                options={depts}
                                placeholder="Please select"
                                isSearchable
                                value={depts.find((d) => d.value === form.dept) || null}
                                onChange={(e) => setField("dept", e ? e.value : "")}
                            />
                            {errors.dept && <p className="text-red-600">{errors.dept}</p>}
                        </div>

                        <div>
                            <label>Select Year</label>
                            <Select
                                inputId="year"
                                options={selectYear}
                                placeholder="Please select"
                                isSearchable
                                value={selectYear.find((y) => y.value === form.year) || null}
                                onChange={(e) => setField("year", e ? e.value : "")}
                            />
                            {errors.year && <p className="text-red-600">{errors.year}</p>}
                        </div>

                        <div>
                            <label>Hostel Allocation</label>
                            <Select
                                inputId="HostelAlloc"
                                options={hostelAllocation}
                                placeholder="Please select"
                                isSearchable
                                value={
                                    hostelAllocation.find((o) => o.value === form.HostelAlloc) || null
                                }
                                onChange={(e) => setField("HostelAlloc", e ? e.value : "")}
                            />
                            {errors.HostelAlloc && (
                                <p className="text-red-600">{errors.HostelAlloc}</p>
                            )}
                        </div>

                        <div>
                            <label>REG.NO</label>
                            <input
                                type="text"
                                className="w-full border p-2 rounded bg-gray-100"
                                disabled
                                value={regno}
                            />
                        </div>

                        {Number(form.HostelAlloc) === 1 && (
                            <div>
                                <label>Choose RoomNumber</label>
                                <Select
                                    inputId="allocate"
                                    options={roomOptions}
                                    value={roomOptions.find((r) => r.value === room) || null}
                                    placeholder={
                                        form.gender && form.year
                                            ? "Select Room"
                                            : "Select gender & year first"
                                    }
                                    isSearchable
                                    noOptionsMessage={() => "No rooms available"}
                                    onChange={(e) => {
                                        setRoom(e ? e.value : null);
                                        setErrors((p) => ({ ...p, room: "" }));
                                    }}
                                />
                                {errors.room && <p className="text-red-600">{errors.room}</p>}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end mt-5">
                        <button
                            type="submit"
                            className="w-full sm:w-auto text-white px-6 rounded py-2 bg-primary"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Students;