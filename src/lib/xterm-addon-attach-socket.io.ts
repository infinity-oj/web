import { Terminal, IDisposable, ITerminalAddon } from "xterm";
import { Socket } from "socket.io-client";

interface IAttachOptions {
  bidirectional?: boolean;
}

export class SocketIOAddon implements ITerminalAddon {
  private _socket: Socket;
  private _bidirectional: boolean;
  private _disposables: IDisposable[] = [];

  constructor(socket: Socket, options?: IAttachOptions) {
    this._socket = socket;
    // always set binary type to arraybuffer, we do not handle blobs
    // this._socket.binaryType = "arraybuffer";
    this._bidirectional = !(options && options.bidirectional === false);
  }

  public activate(terminal: Terminal): void {
    this._disposables.push(
      addSocketListener(this._socket, "term-output", (data) => {
        // const data: ArrayBuffer | string = dat;
        terminal.write(typeof data === "string" ? data : new Uint8Array(data));
      }),
    );

    if (this._bidirectional) {
      this._disposables.push(terminal.onData((data) => this._sendData(data)));
      this._disposables.push(
        terminal.onBinary((data) => this._sendBinary(data)),
      );
    }

    this._disposables.push(
      addSocketListener(this._socket, "close", () => this.dispose()),
    );
    this._disposables.push(
      addSocketListener(this._socket, "error", () => this.dispose()),
    );
  }

  public dispose(): void {
    for (const d of this._disposables) {
      d.dispose();
    }
  }

  private _sendData(data: string): void {
    // TODO: do something better than just swallowing
    // the data if the socket is not in a working condition
    if (this._socket.disconnected) {
      return;
    }
    this._socket.emit("term-input", data);
  }

  private _sendBinary(data: string): void {
    if (this._socket.disconnected) {
      return;
    }
    const buffer = new Uint8Array(data.length);
    for (let i = 0; i < data.length; ++i) {
      buffer[i] = data.charCodeAt(i) & 255;
    }
    this._socket.emit("term-input", buffer);
  }
}

function addSocketListener(
  socket: Socket,
  type: string,
  handler: (this: Socket, data: string) => any,
): IDisposable {
  socket.on(type, handler);
  return {
    dispose: () => {
      if (!handler) {
        // Already disposed
        return;
      }
      socket.removeListener(type, handler);
    },
  };
}
