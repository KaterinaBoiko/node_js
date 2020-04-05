export class Load {
  id: string;
  logs: [
    {
      message: string;
      time: Date;
    }
  ];
  created_by: string;
  assigned_by: string;
  status: string;
  state: string;
  dimensions: {
    width: number;
    length: number;
    height: number;
  };
  payload: number;

  constructor(created_by, dimensions, payload) {
    this.created_by = created_by;
    this.dimensions = dimensions;
    this.payload = payload;
  }
}

export const LoadStatuses = ['NEW', 'POSTED', 'ASSIGNED', 'SHIPPED'];

export const LoadStates = [
  'En route to pick up',
  'Arrived to pick up',
  'En route to delivery',
  'Arrived to delivery',
];
