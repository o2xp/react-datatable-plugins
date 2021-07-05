const mockStore = {
  data: {
    rowsData: [
      {
        id: "5f96a92dee57be1eafd26821",
        index: 0,
        adult: true,
        age: 1,
        eyecolor: "brown",
        name: "Osborne Johns",
        iban: "osbornejohns@terrasys.com",
        birthdate: "1996-07-09T10:38:46 -00:00"
      },
      {
        id: "5f96a92d8550e90247230961",
        index: 1,
        adult: true,
        age: 60,
        eyecolor: "brown",
        name: "Hess Nixon",
        iban: "hessnixon@terrasys.com",
        birthdate: "1964-12-05T09:35:11 -00:00"
      },
      {
        id: "5f96a92dfe5aa509332917df",
        index: 2,
        adult: true,
        age: 36,
        eyecolor: "brown",
        name: "Bentley Carter",
        iban: "bentleycarter@terrasys.com",
        birthdate: "2019-04-04T04:59:29 -00:00"
      },
      {
        id: "5f96a92d905258369b3f3927",
        index: 3,
        adult: true,
        age: 37,
        eyecolor: "brown",
        name: "Estes Lamb",
        iban: "esteslamb@terrasys.com",
        birthdate: "2015-09-05T06:50:42 -00:00"
      }
    ],
    baseRowsData: [
      {
        id: "5f96a92dee57be1eafd26821",
        index: 0,
        adult: true,
        age: 1,
        eyecolor: "brown",
        name: "Osborne Johns",
        iban: "osbornejohns@terrasys.com",
        birthdate: "1996-07-09T10:38:46 -00:00"
      },
      {
        id: "5f96a92d8550e90247230961",
        index: 1,
        adult: true,
        age: 60,
        eyecolor: "brown",
        name: "Hess Nixon",
        iban: "hessnixon@terrasys.com",
        birthdate: "1964-12-05T09:35:11 -00:00"
      },
      {
        id: "5f96a92dfe5aa509332917df",
        index: 2,
        adult: true,
        age: 36,
        eyecolor: "brown",
        name: "Bentley Carter",
        iban: "bentleycarter@terrasys.com",
        birthdate: "2019-04-04T04:59:29 -00:00"
      },
      {
        id: "5f96a92d905258369b3f3927",
        index: 3,
        adult: true,
        age: 37,
        eyecolor: "brown",
        name: "Estes Lamb",
        iban: "esteslamb@terrasys.com",
        birthdate: "2015-09-05T06:50:42 -00:00"
      }
    ]
  },
  columns: {
    data: {
      columns: {
        id: { id: "id", label: "Id", colSize: 150 },
        index: {
          id: "index",
          label: "Index",
          colSize: 100
        },
        adult: {
          id: "adult",
          label: "Adult",
          colSize: 100
        },
        name: {
          id: "name",
          label: "Name",
          colSize: 150
        },
        age: {
          id: "age",
          label: "Age",
          colSize: 100
        },
        birthdate: {
          id: "birthdate",
          label: "Birthdate",
          colSize: 160
        },
        eyecolor: {
          id: "eyecolor",
          label: "Eye Color",
          colSize: 130
        },
        iban: {
          id: "iban",
          label: "Iban",
          colSize: 250
        }
      },
      columnsOrder: ["index", "id", "age", "name", "birthdate", "eyecolor", "iban"],
      itemsHeight: 36,
      borderedColumns: false,
      borderedRows: false
    },
    baseData: {
      columns: {
        id: { id: "id", label: "Id", colSize: 150 },
        index: {
          id: "index",
          label: "Index",
          colSize: 100
        },
        adult: {
          id: "adult",
          label: "Adult",
          colSize: 100
        },
        name: {
          id: "name",
          label: "Name",
          colSize: 150
        },
        age: {
          id: "age",
          label: "Age",
          colSize: 100
        },
        birthdate: {
          id: "birthdate",
          label: "Birthdate",
          colSize: 160
        },

        iban: {
          id: "iban",
          label: "Iban",
          colSize: 250
        }
      },
      columnsOrder: ["index", "id", "age", "name", "birthdate", "eyecolor", "iban"],
      itemsHeight: 36,
      borderedColumns: false,
      borderedRows: false
    }
  }
};

export default mockStore;
