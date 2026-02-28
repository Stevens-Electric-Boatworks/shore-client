export type SocketMessage = { type: string; [k: string]: unknown };
export type Handler = (ws: WebSocket, msg: SocketMessage) => void;

export class Dispatcher {
  private handlers = new Map<string, Handler[]>();

  on(type: string, handler: Handler) {
    const arr = this.handlers.get(type) ?? [];
    arr.push(handler);
    this.handlers.set(type, arr);
    return () => this.off(type, handler);
  }

  off(type: string, handler: Handler) {
    const arr = this.handlers.get(type);
    if (!arr) return;
    this.handlers.set(
      type,
      arr.filter((h) => h !== handler),
    );
  }

  releaseAllHandlers() {
    this.handlers = new Map<string, Handler[]>();
  }

  dispatch(ws: WebSocket, parsed: SocketMessage) {
    const arr = this.handlers.get(parsed.type) ?? [];
    for (const h of arr) {
      try {
        h(ws, parsed);
      } catch (err) {
        console.error("Message handler error:", err);
      }
    }
  }
}
