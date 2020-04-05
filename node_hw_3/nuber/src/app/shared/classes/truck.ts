export class Truck {
  id: string;
  type: string;
  created_by: string;
  assigned_by: string;
  status: string;

  constructor(type, created_by) {
    this.type = type;
    this.created_by = created_by;
  }
}

export const TruckStatuses = [
  { abbr: 'IS', status: 'In service' },
  { abbr: 'OL', status: 'On load' },
];

class TruckType {
  name: string;
  dimensions: {
    width: number;
    length: number;
    height: number;
  };
  payload: number;

  constructor(name, dimensions, payload) {
    this.name = name;
    this.dimensions = dimensions;
    this.payload = payload;
  }
}

export const TruckTypes: TruckType[] = [
  new TruckType('Sprinter', { width: 300, length: 250, height: 170 }, 1700),
  new TruckType(
    'Small straight',
    { width: 500, length: 250, height: 170 },
    2500
  ),
  new TruckType(
    'Large straight',
    { width: 700, length: 350, height: 200 },
    4000
  ),
];
