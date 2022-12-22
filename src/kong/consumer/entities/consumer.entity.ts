export class Consumer {
  "id": string;
  "created_at": number;
  "username": string;
  "custom_id": string;
  "tags": string[];
}

export class ListConsumer {
  data: Consumer[];
  next: any;
}

export class GroupACL {
  "consumer": {
    "id": string
  };
  "group": string;
  "id": string;
  "created_at": number;
  "tags": string[];
}

export class ListGroupACL {
  data: GroupACL[];
  next: any;
}
