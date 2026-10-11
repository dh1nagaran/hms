import React from "react";
import {
    IconBuildingSkyscraper,
    IconLetterD,
    IconLetterH,
    IconLetterS,
    IconSchool,
    IconUser
} from "@tabler/icons-react";


const Leftnav = ({ setPage, activePage }) => {
    return (
        <div className="flex h-screen w-16 flex-col justify-between border-e relative z-10 border-gray-100 bg-white1decoration-0">

            <div>

                <div className="inline-flex size-16 items-center justify-center">
                    <span
                        className="grid size-12 place-content-center rounded-lg bg-gray-100 text-sm text-gray-500"
                    >
                        HSM
                    </span>
                </div>

                <ul className="space-y-1 border-t border-gray-100 px-2 pt-4">


                    <li>
                        <span
                            className={`group relative grid place-content-center rounded-lg px-4 py-2 text-gray-900 cursor-pointer ${activePage === "hostel"
                                ? "bg-gray-100"
                                : "hover:bg-gray-100"
                                }`}
                            aria-label="General"
                            onClick={() => {
                                setPage("hostel");
                            }}
                        >
                            <IconLetterH
                                stroke={1}
                                fontSize={20}
                                color="black"
                            />

                            <span
                                className="invisible absolute inset-s-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-200 px-2 py-1.5 text-xs font-medium text-gray-700 group-hover:visible"
                            >
                                Hostel
                            </span>
                        </span>
                    </li>


                    {/* STUDENTS */}
                    <li>
                        <span
                            className={`group relative grid place-content-center rounded-lg px-4 py-2 text-gray-700 cursor-pointer ${activePage === "student"
                                ? "bg-gray-100 text-gray-900"
                                : "hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            aria-label="Students"
                            onClick={() => {
                                setPage("student");
                            }}
                        >
                            <IconLetterS
                                stroke={1}
                                fontSize={20}
                                color="black"
                            />

                            <span
                                className="invisible absolute inset-s-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-200 px-2 py-1.5 text-xs font-medium text-gray-700 group-hover:visible"
                            >
                                Students
                            </span>
                        </span>
                    </li>


                    {/* DEPARTMENT */}
                    <li>
                        <span
                            className={`group relative grid place-content-center rounded-lg px-4 py-2 text-gray-700 cursor-pointer ${activePage === "dept"
                                ? "bg-gray-100 text-gray-900"
                                : "hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            aria-label="Department"
                            onClick={() => {
                                setPage("dept");
                            }}
                        >
                            <IconLetterD
                                stroke={1}
                                fontSize={20}
                                color="black"
                            />

                            <span
                                className="invisible absolute inset-s-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-200 px-2 py-1.5 text-xs font-medium text-gray-700 group-hover:visible"
                            >
                                Department
                            </span>
                        </span>
                    </li>


                    {/* ACCOUNT */}
                    <li>
                        <span
                            className={`group relative grid place-content-center rounded-lg px-4 py-2 text-gray-700 cursor-pointer ${activePage === "user"
                                ? "bg-gray-100 text-gray-900"
                                : "hover:bg-gray-100 hover:text-gray-900"
                                }`}
                            aria-label="user"
                            onClick={() => {
                                setPage("user");
                            }}
                        >
                            <IconUser
                                stroke={1}
                                fontSize={20}
                                color="black"
                            />

                            <span
                                className="invisible absolute inset-s-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-100 px-2 py-1.5 text-xs font-medium text-gray-700 group-hover:visible"
                            >
                                Account
                            </span>
                        </span>
                    </li>

                </ul>
            </div>

        </div>
    );
};

export default Leftnav;