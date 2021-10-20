import {
  Injectable
} from '@angular/core';

export class SamlOpt {
    encrypted: boolean;

  constructor(encrypted = true)
  {
      this.encrypted = encrypted;
  }
}
