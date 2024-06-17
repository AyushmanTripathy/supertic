import { Peer } from "peerjs";

const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const idLength = 5;

function generateId() {
  let id = "";
  for (let i = 0; i < idLength; i++) {
    id += alphabets[Math.floor(Math.random() * (alphabets.length - 1))];
  }
  return id;
}

export function openPeer() {
  // will be exposed to frontend anyways
  // get turn servers from open relay
  const promise = new Promise(async (res, rej) => {
    console.log("Loading turn servers ...")
    const response = await fetch(
      "https://supertic.metered.live/api/v1/turn/credentials?apiKey=3c5554e627ce07bfed224001202b39c2e388"
    );
    if (!response.ok) rej("Fetch to OpenRelay falied");
    const iceServers = await response.json();
    console.log("Got servers ...", iceServers);

    const peerId = generateId();
    const peer = new Peer(peerId, {
      config: { iceServers },
    });

    peer.on("open", (id) => {
      console.log("Peer opened with id " + id);
      res([peer, id]);
    });
  });

  return wrapPromise(promise);
}

function wrapPromise(promise) {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const handler = {
    pending: () => {
      throw suspender;
    },
    error: () => {
      throw response;
    },
    default: () => response,
  };

  const read = () => {
    const result = handler[status] ? handler[status]() : handler.default();
    return result;
  };

  return { read };
}
