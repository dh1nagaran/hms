const hostels = [
  {
    id: 1,
    name: "Boys Hostel",
    gender: "Male",
    rooms: [
      // ==================== YEAR 1 ====================

      {
        roomNumber: "B101",
        capacity: 4,
        year: 1,
        students: [1, 51, 101, 151],
      },
      {
        roomNumber: "B102",
        capacity: 4,
        year: 1,
        students: [9, 59, 109, 159],
      },
      {
        roomNumber: "B103",
        capacity: 4,
        year: 1,
        students: [29, 79, 129, 201],
      },
      {
        roomNumber: "B104",
        capacity: 4,
        year: 1,
        students: [41, 91, 141, 209],
      },
      {
        roomNumber: "B105",
        capacity: 4,
        year: 1,
        students: [49, 99, 179, 229],
      },
      {
        roomNumber: "B106",
        capacity: 4,
        year: 1,
        students: [149, 191, 241],
      },
      {
        roomNumber: "B107",
        capacity: 4,
        year: 1,
        students: [199, 249],
      },

      // UNALLOCATED YEAR 1 ROOMS
      {
        roomNumber: "B108",
        capacity: 4,
        year: 1,
        students: [],
      },
      {
        roomNumber: "B109",
        capacity: 4,
        year: 1,
        students: [],
      },

      // ==================== YEAR 2 ====================

      {
        roomNumber: "B201",
        capacity: 4,
        year: 2,
        students: [3, 11, 13, 19],
      },
      {
        roomNumber: "B202",
        capacity: 4,
        year: 2,
        students: [21, 23, 31, 33],
      },
      {
        roomNumber: "B203",
        capacity: 4,
        year: 2,
        students: [39, 43, 53, 61],
      },
      {
        roomNumber: "B204",
        capacity: 4,
        year: 2,
        students: [63, 69, 71, 73],
      },
      {
        roomNumber: "B205",
        capacity: 4,
        year: 2,
        students: [81, 83, 89, 93],
      },

      // UNALLOCATED YEAR 2 ROOMS
      {
        roomNumber: "B206",
        capacity: 4,
        year: 2,
        students: [],
      },
      {
        roomNumber: "B207",
        capacity: 4,
        year: 2,
        students: [],
      },

      // ==================== YEAR 3 ====================

      {
        roomNumber: "B208",
        capacity: 4,
        year: 3,
        students: [103, 111, 113, 119],
      },
      {
        roomNumber: "B209",
        capacity: 4,
        year: 3,
        students: [121, 123, 131, 133],
      },
      {
        roomNumber: "B210",
        capacity: 4,
        year: 3,
        students: [139, 143, 153, 161],
      },
      {
        roomNumber: "B211",
        capacity: 4,
        year: 3,
        students: [163, 169, 171, 173],
      },

      // UNALLOCATED YEAR 3 ROOMS
      {
        roomNumber: "B212",
        capacity: 4,
        year: 3,
        students: [],
      },
      {
        roomNumber: "B213",
        capacity: 4,
        year: 3,
        students: [],
      },

      // ==================== YEAR 4 ====================

      {
        roomNumber: "B214",
        capacity: 4,
        year: 4,
        students: [181, 183, 189, 193],
      },
      {
        roomNumber: "B215",
        capacity: 4,
        year: 4,
        students: [203, 211, 213, 219],
      },
      {
        roomNumber: "B216",
        capacity: 4,
        year: 4,
        students: [221, 223, 231, 233],
      },
      {
        roomNumber: "B217",
        capacity: 4,
        year: 4,
        students: [239, 243],
      },

      // UNALLOCATED YEAR 4 ROOMS
      {
        roomNumber: "B218",
        capacity: 4,
        year: 4,
        students: [],
      },
      {
        roomNumber: "B219",
        capacity: 4,
        year: 4,
        students: [],
      },
    ],
  },

  // =========================================================
  // GIRLS HOSTEL
  // =========================================================

  {
    id: 2,
    name: "Girls Hostel",
    gender: "Female",
    rooms: [
      // ==================== YEAR 1 ====================

      {
        roomNumber: "G101",
        capacity: 4,
        year: 1,
        students: [6, 56, 106, 156],
      },
      {
        roomNumber: "G102",
        capacity: 4,
        year: 1,
        students: [14, 64, 114, 206],
      },
      {
        roomNumber: "G103",
        capacity: 4,
        year: 1,
        students: [26, 76, 126, 164],
      },
      {
        roomNumber: "G104",
        capacity: 4,
        year: 1,
        students: [34, 84, 134, 214],
      },
      {
        roomNumber: "G105",
        capacity: 4,
        year: 1,
        students: [38, 88, 138, 176],
      },
      {
        roomNumber: "G106",
        capacity: 4,
        year: 1,
        students: [46, 96, 146, 226],
      },
      {
        roomNumber: "G107",
        capacity: 4,
        year: 1,
        students: [184, 234],
      },
      {
        roomNumber: "G108",
        capacity: 4,
        year: 1,
        students: [188, 238],
      },
      {
        roomNumber: "G109",
        capacity: 4,
        year: 1,
        students: [196, 246],
      },

      // UNALLOCATED YEAR 1 ROOMS
      {
        roomNumber: "G110",
        capacity: 4,
        year: 1,
        students: [],
      },
      {
        roomNumber: "G111",
        capacity: 4,
        year: 1,
        students: [],
      },

      // ==================== YEAR 2 ====================

      {
        roomNumber: "G201",
        capacity: 4,
        year: 2,
        students: [4, 8, 16, 18],
      },
      {
        roomNumber: "G202",
        capacity: 4,
        year: 2,
        students: [24, 28, 36, 44],
      },
      {
        roomNumber: "G203",
        capacity: 4,
        year: 2,
        students: [48, 54, 58, 66],
      },
      {
        roomNumber: "G204",
        capacity: 4,
        year: 2,
        students: [68, 74, 78, 86],
      },

      // UNALLOCATED YEAR 2 ROOMS
      {
        roomNumber: "G205",
        capacity: 4,
        year: 2,
        students: [],
      },
      {
        roomNumber: "G206",
        capacity: 4,
        year: 2,
        students: [],
      },

      // ==================== YEAR 3 ====================

      {
        roomNumber: "G207",
        capacity: 4,
        year: 3,
        students: [94, 98, 104, 108],
      },
      {
        roomNumber: "G208",
        capacity: 4,
        year: 3,
        students: [116, 118, 124, 128],
      },
      {
        roomNumber: "G209",
        capacity: 4,
        year: 3,
        students: [136, 144, 148, 154],
      },
      {
        roomNumber: "G210",
        capacity: 4,
        year: 3,
        students: [158, 166, 168, 174],
      },

      // UNALLOCATED YEAR 3 ROOMS
      {
        roomNumber: "G211",
        capacity: 4,
        year: 3,
        students: [],
      },
      {
        roomNumber: "G212",
        capacity: 4,
        year: 3,
        students: [],
      },

      // ==================== YEAR 4 ====================

      {
        roomNumber: "G213",
        capacity: 4,
        year: 4,
        students: [178, 186, 194, 198],
      },
      {
        roomNumber: "G214",
        capacity: 4,
        year: 4,
        students: [204, 208, 216, 218],
      },
      {
        roomNumber: "G215",
        capacity: 4,
        year: 4,
        students: [224, 228, 236, 244],
      },
      {
        roomNumber: "G216",
        capacity: 4,
        year: 4,
        students: [248],
      },
      {
        roomNumber: "G217",
        capacity: 4,
        year: 4,
        students: [],
      },
      {
        roomNumber: "G218",
        capacity: 4,
        year: 4,
        students: [],
      },
    ],
  },
];

export default hostels;
