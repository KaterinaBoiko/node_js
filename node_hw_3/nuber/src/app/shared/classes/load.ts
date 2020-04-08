export class Load {
  _id: string;
  title: string;
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

  constructor(title, created_by, dimensions, payload) {
    this.title = title;
    this.created_by = created_by;
    this.dimensions = dimensions;
    this.payload = payload;
    this.status = LoadStatuses[0];
    this.logs = [{ message: 'created', time: new Date() }];
  }
}

export const LoadStatuses = ['new', 'posted', 'assigned', 'shipped'];

export const LoadStates = [
  'En route to pick up',
  'Arrived to pick up',
  'En route to delivery',
  'Arrived to delivery',
];
