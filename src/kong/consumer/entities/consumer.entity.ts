export enum CredentialJWTAlgorithm {
  HS256 = "HS256",
  RS256 = "RS256"
}

export class Consumer {
  "id": string;
  "created_at": number;
  "username": string;
  "custom_id": string;
  "tags": string[];
  "credentialJWT": CredentialJWT[];
}

export class CredentialJWT {
  "rsa_public_key": string;
  "algorithm": "HS256";
  "tags": string[];
  "secret": string;
  "created_at": number;
  "key": string;
  "id": string;
}

export class ListCredentialJWT {
  data: CredentialJWT[];
  next: any;
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
