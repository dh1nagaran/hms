import React from 'react'
import Select from 'react-select'

const Department = () => {
    const hostelOptions = [
        { value: 1, label: "Boys Hostel" },
        { value: 2, label: "Girls Hostel" },
    ];
    const hostelYear = [
        { value: 1, label: "I Year" },
        { value: 2, label: "II Year" },
        { value: 3, label: "III Year" },
        { value: 4, label: "IV Year" },
    ]
    return (
        <div>
            <div className="min-h-screen bg-white-50 relative z-0 p-6">
                <div className="mx-auto max-w-7xl flex gap-4 rounded-lg border  bg-white p-6 ">
                    <div className="w-1/4">
                        <label
                            htmlFor="hostel"
                            className="text-black"
                        >
                            <span className="text-sm font-semibold">
                                Select Hostel
                            </span>
                        </label>
                        <Select
                            inputId="hostel"
                            options={hostelYear}
                            placeholder="Please select"
                            isSearchable
                            className="mt-2"
                        />
                    </div>
                    <div className="w-1/4">
                        <label
                            htmlFor="hostel"
                            className="text-black"
                        >
                            <span className="text-sm font-semibold">
                                Select Hostel
                            </span>
                        </label>
                        <Select
                            inputId="hostel"
                            options={hostelOptions}
                            placeholder="Please select"
                            isSearchable
                            className="mt-2"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Department