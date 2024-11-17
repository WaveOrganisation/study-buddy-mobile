export class ServerNotHealthyError extends Error {
  constructor(message: string = "Server is not healthy") {
    super(`Error: ${message}`);
    this.name = "ServerNotHealthyError";
  }
}
