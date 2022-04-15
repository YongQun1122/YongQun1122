import { useState, useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "";

export const useSocketClient = () => {
  const client = useRef<Socket>();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    client.current = io(socketUrl, {
      transports: ["websocket"]
    });

    client.current.on("connect", () => {
      if (client.current) setConnected(client.current.connected || false);
    });

    client.current.on("disconnect", () => {
      if (client.current) setConnected(client.current.connected || false);
    });

    return () => {
      if (client.current) client.current.disconnect();
    };
  }, []);

  return { client: client.current, connected };
};

export default useSocketClient;
