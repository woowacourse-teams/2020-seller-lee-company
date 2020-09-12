class WebSocketClient {
  private readonly client: WebSocket;
  private readonly url: string;
  onReceiveMessage: any;

  constructor(url: string) {
    this.url = url;
    this.client = new WebSocket(this.url);
    this.client.onmessage = this.onMessage;
    this.client.onerror = (err) =>
      console.log("Error while connecting to the server: " + err);

    console.log("WebSocketClient initialized!");
  }

  send(message: any) {
    if (this.client && this.client.readyState === this.client.OPEN)
      this.client.send(JSON.stringify(message));
    else console.log("Could not send message: ", message);
  }

  onMessage = (message: { data: string }) => {
    const messagePayload = JSON.parse(message.data);
    console.log("Received message from the server: ", messagePayload);

    if (this.onReceiveMessage) this.onReceiveMessage(messagePayload);
  };

  close = () => {
    this.client.close();
  };
}

const client = new WebSocketClient("ws://localhost:8000/chat");

export default client;
