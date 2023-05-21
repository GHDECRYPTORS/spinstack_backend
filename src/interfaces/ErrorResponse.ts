import MessageResponse from './MessageResponse';

export default interface ErrorResponse extends MessageResponse {
  // stack?: string;
  status: number;
  errors?: string[];
}