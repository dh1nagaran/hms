import { IconEye, IconUserMinus, IconUsersPlus, IconX } from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

const hostelOptions = [
    { value: 1, label: "Boys Hostel" },
    { value: 2, label: "Girls Hostel" },
];

const selectYear = [
    { value: 1, label: "I Year" },
    { value: 2, label: "II Year" },
    { value: 3, label: "III Year" },
    { value: 4, label: "IV Year" },
];

function find_dpet(dept) {
    switch (dept) {
        case "IT":
            return "red";
        case "ECE":
            return "grey";
        case "MECH":
            return "orange";
        case "CSE":
            return "green";
        case "CIVIL":
            return "blue";
        default:
            return "black";
    }
}

const Hostel = ({ studentsList, setStudentsList, hostel, setHostel }) => {
    const [selected, setSelected] = useState(null); // hostel id
    const [hyear, setHyear] = useState(""); // year filter
    const [show, setShow] = useState(""); // "", "view", "add", "delete"
    const [activeRoom, setActiveRoom] = useState(null); // roomNumber
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [removeStudents, setRemoveStudents] = useState([]);

    // always work with a flat array of hostels
    const hostelList = useMemo(
        () => (Array.isArray(hostel) ? hostel.flat() : []),
        [hostel]
    );

    // ---------- derived data (always in sync with props) ----------
    const selectedHostel = useMemo(
        () => hostelList.find((h) => h.id === selected) || null,
        [hostelList, selected]
    );

    const visibleRooms = useMemo(() => {
        if (!selectedHostel) return [];
        return selectedHostel.rooms.filter(
            (room) => !hyear || Number(room.year) === Number(hyear)
        );
    }, [selectedHostel, hyear]);

    const stuData = useMemo(
        () => selectedHostel?.rooms.find((r) => r.roomNumber === activeRoom) || {},
        [selectedHostel, activeRoom]
    );

    const unallocate = useMemo(
        () => studentsList.filter((st) => Number(st.hostelAllocation) === 0),
        [studentsList]
    );

    const currentRoomStudentList = (stuData.students || [])
        .map((id) => studentsList.find((st) => st.id === id))
        .filter(Boolean);

    const roomDepartments = currentRoomStudentList
        .map((s) => s.department)
        .filter(Boolean);

    const capacity = Number(stuData.capacity || 4);
    const availableBeds = Math.max(0, capacity - (stuData.students?.length || 0));

    const availableStudents = unallocate.filter((student) => {
        const genderMatch = student.gender === selectedHostel?.gender;
        const yearMatch = Number(student.year) === Number(stuData.year);
        const alreadySelected = selectedStudents.some((i) => i.value === student.id);

        let departmentAllowed = true;
        if (Number(stuData.year) === 1) {
            departmentAllowed = !roomDepartments.includes(student.department);
        }

        return genderMatch && yearMatch && !alreadySelected && departmentAllowed;
    });

    // close the popup if the room disappears
    useEffect(() => {
        if (show && !stuData.roomNumber) {
            setShow("");
        }
    }, [show, stuData.roomNumber]);

    // ---------- helpers ----------
    function closeModal() {
        setShow("");
        setActiveRoom(null);
        setSelectedStudents([]);
        setRemoveStudents([]);
    }

    function HostelChange(e) {
        setSelected(e ? e.value : null);
        setHyear("");
        closeModal();
    }

    function handleChange(action, room) {
        setShow(action);
        setActiveRoom(room.roomNumber);
        setSelectedStudents([]);
        setRemoveStudents([]);
    }

    // returns an error message or null
    function validateSelection(studentIds) {
        if (studentIds.length > availableBeds) {
            return `Only ${availableBeds} bed${availableBeds === 1 ? "" : "s"} available`;
        }

        const toAdd = studentIds
            .map((id) => studentsList.find((s) => s.id === id))
            .filter(Boolean);

        if (toAdd.length !== studentIds.length) {
            return "Some students were not found";
        }

        if (toAdd.some((s) => s.gender !== selectedHostel.gender)) {
            return "Student gender does not match this hostel";
        }

        if (toAdd.some((s) => Number(s.year) !== Number(stuData.year))) {
            return `Only year ${stuData.year} students can be added to this room`;
        }

        if (Number(stuData.year) === 1) {
            const departments = toAdd.map((s) => s.department);

            if (new Set(departments).size !== departments.length) {
                return "1st year room cannot contain students from the same department";
            }

            if (departments.some((d) => roomDepartments.includes(d))) {
                return "This department is already present in this 1st year room";
            }
        }

        return null;
    }

    function saveStudents() {
        if (selectedStudents.length === 0) {
            alert("Please select students");
            return;
        }

        if (!stuData.roomNumber || !selectedHostel) return;

        const studentIds = selectedStudents.map((s) => s.value);

        const error = validateSelection(studentIds);
        if (error) {
            alert(error);
            return;
        }

        setHostel((prev) =>
            prev.flat().map((h) =>
                h.id !== selected
                    ? h
                    : {
                        ...h,
                        rooms: h.rooms.map((room) =>
                            room.roomNumber !== stuData.roomNumber
                                ? room
                                : {
                                    ...room,
                                    students: [...(room.students || []), ...studentIds],
                                }
                        ),
                    }
            )
        );

        setStudentsList((prev) =>
            prev.map((s) =>
                studentIds.includes(s.id) ? { ...s, hostelAllocation: 1 } : s
            )
        );

        closeModal();
    }

    function removeSelectedStudents() {
        if (removeStudents.length === 0) {
            alert("Please select students to remove");
            return;
        }

        const removeIds = removeStudents.map((s) => s.value);

        setHostel((prev) =>
            prev.flat().map((h) =>
                h.id !== selected
                    ? h
                    : {
                        ...h,
                        rooms: h.rooms.map((room) =>
                            room.roomNumber !== stuData.roomNumber
                                ? room
                                : {
                                    ...room,
                                    students: (room.students || []).filter(
                                        (id) => !removeIds.includes(id)
                                    ),
                                }
                        ),
                    }
            )
        );

        setStudentsList((prev) =>
            prev.map((s) =>
                removeIds.includes(s.id) ? { ...s, hostelAllocation: 0 } : s
            )
        );

        closeModal();
    }

    // ---------- UI ----------
    return (
        <div className="min-h-screen bg-gray-50 relative z-0 p-4 sm:p-6">
            {/* Filters: stacked on phones, side by side from sm */}
            <div className="mx-auto max-w-7xl flex flex-col sm:flex-row gap-4 rounded-lg border bg-white p-4 sm:p-6">
                <div className="w-full sm:w-1/3 lg:w-1/4">
                    <label htmlFor="hostel" className="text-black">
                        <span className="text-sm font-semibold">Select Hostel</span>
                    </label>
                    <Select
                        inputId="hostel"
                        options={hostelOptions}
                        placeholder="Please select"
                        isSearchable
                        isClearable
                        className="mt-2"
                        onChange={HostelChange}
                    />
                </div>

                <div className="w-full sm:w-1/3 lg:w-1/4">
                    <label htmlFor="year" className="text-sm font-semibold">
                        Select Year
                    </label>
                    <Select
                        inputId="year"
                        options={selectYear}
                        placeholder="Please select"
                        isSearchable
                        isClearable
                        className="mt-2"
                        value={selectYear.find((y) => y.value === hyear) || null}
                        onChange={(e) => setHyear(e ? e.value : "")}
                    />
                </div>
            </div>

            <br />

            {/* Room cards: 1 / 2 / 3 / 4 columns by screen size */}
            {selectedHostel && (
                <div className="mx-auto max-w-7xl max-h-[80vh] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 rounded-lg border border-zinc-700 bg-white p-4 sm:p-5 shadow">
                    {visibleRooms.map((room) => (
                        <article
                            key={room.roomNumber}
                            className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg"
                        >
                            <h3 className="text-primary font-semibold">{room.roomNumber}</h3>
                            <label className="text-emerald-900 text-sm">{room.year} year</label>

                            <div className="grid grid-cols-2 gap-1 mt-4 mb-4 min-h-[3rem]">
                                {room.students.map((studentId) => {
                                    const found = studentsList.find((s) => s.id === studentId);
                                    return (
                                        <p
                                            key={studentId}
                                            className="text-sm truncate"
                                            style={{ color: found ? find_dpet(found.department) : "black" }}
                                        >
                                            {found ? found.name : "Unknown"}
                                        </p>
                                    );
                                })}
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={() => handleChange("view", room)}
                                    className="cursor-pointer p-1"
                                >
                                    <IconEye stroke={1} size={22} className="text-primary" />
                                </button>

                                <button
                                    type="button"
                                    disabled={room.students.length >= room.capacity}
                                    onClick={() => handleChange("add", room)}
                                    className="cursor-pointer p-1 disabled:opacity-40"
                                >
                                    <IconUsersPlus stroke={1} size={22} className="text-green-600" />
                                </button>

                                <button
                                    type="button"
                                    disabled={room.students.length === 0}
                                    onClick={() => handleChange("delete", room)}
                                    className="cursor-pointer p-1 disabled:opacity-40"
                                >
                                    <IconUserMinus stroke={1} size={22} className="text-red-600" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* Popup */}
            {show && stuData.roomNumber && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50 p-3 sm:p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white py-4 px-4 sm:px-5 shadow-xl rounded-lg">
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="cursor-pointer text-gray-500 hover:text-gray-800"
                            >
                                <IconX stroke={2} />
                            </button>
                        </div>

                        <div className="flex flex-col items-center w-full">
                            <h3 className="text-primary font-semibold text-lg">
                                {stuData.roomNumber}
                            </h3>

                            <div className="w-full mt-4 rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {currentRoomStudentList.map((student) => (
                                        <div
                                            key={student.id}
                                            className="rounded-md px-3 py-3 border border-gray-200 shadow-sm"
                                            style={{ backgroundColor: find_dpet(student.department) }}
                                        >
                                            <p className="text-sm font-semibold text-white">{student.name}</p>
                                            <p className="text-sm font-semibold text-white">
                                                Regno: {student.regno}
                                            </p>
                                            <p className="text-xs font-semibold text-white mt-1">
                                                {student.department}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full max-w-md flex justify-between items-center mt-4 px-2">
                                <p className="text-sm text-gray-700">
                                    Allocated:
                                    <span className="font-semibold ml-1">
                                        {stuData.students?.length || 0}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-700">
                                    Available:
                                    <span className="font-semibold ml-1">{availableBeds}</span>
                                </p>
                            </div>

                            {show === "add" && (
                                <div className="w-full max-w-md mt-4">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Room: {stuData.roomNumber} | Year: {stuData.year}
                                    </p>

                                    <Select
                                        inputId="add-student"
                                        options={availableStudents.map((s) => ({
                                            value: s.id,
                                            label: `${s.name} - ${s.regno} - ${s.department}`,
                                        }))}
                                        value={selectedStudents}
                                        onChange={(value) => {
                                            const newValue = value || [];
                                            const error = validateSelection(
                                                newValue.map((i) => i.value)
                                            );

                                            if (error) {
                                                alert(error);
                                                return;
                                            }
                                            setSelectedStudents(newValue);
                                        }}
                                        placeholder={`Select ${selectedHostel?.gender === "Male" ? "boys" : "girls"
                                            } (year ${stuData.year})`}
                                        isSearchable
                                        isMulti
                                        closeMenuOnSelect={false}
                                        className="w-full"
                                    />

                                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-5">
                                        <button
                                            type="button"
                                            onClick={saveStudents}
                                            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-medium"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-medium"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}

                            {show === "delete" && (
                                <div className="w-full max-w-md mt-4">
                                    <p className="text-sm text-gray-600 mb-2">
                                        Remove students from {stuData.roomNumber}
                                    </p>

                                    <Select
                                        inputId="remove-student"
                                        options={currentRoomStudentList.map((s) => ({
                                            value: s.id,
                                            label: `${s.name} - ${s.regno} - ${s.department}`,
                                        }))}
                                        value={removeStudents}
                                        onChange={(value) => setRemoveStudents(value || [])}
                                        placeholder="Select students to remove"
                                        isSearchable
                                        isMulti
                                        closeMenuOnSelect={false}
                                        className="w-full"
                                    />

                                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-5">
                                        <button
                                            type="button"
                                            onClick={removeSelectedStudents}
                                            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-medium"
                                        >
                                            Remove
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="bg-gray-500 hover:bg-gray-600 px-6 py-2 rounded text-white font-medium"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hostel;