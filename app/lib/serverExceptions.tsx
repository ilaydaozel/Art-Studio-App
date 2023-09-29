import { NextResponse } from 'next/server';

class ServerError extends Error {
  statusCode: string;
  constructor(message: string, statusCode: string) {
    super(message);
    this.statusCode = statusCode;
  }

  toResponse() {
    return NextResponse.json({ error: this.message, status: this.statusCode });
  }
}

export const NonUniqueEmailError = new ServerError(
  'Email address is already in use',
  '400'
);
